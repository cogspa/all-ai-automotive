#!/usr/bin/env python3
"""
TSB Extraction Pipeline
=======================

Extracts structured knowledge base entries from MPA Technical Bulletin PDFs.

The PDFs are scanned (image-only, no text layer), so we rasterize each page
and send the images to Claude with vision. Claude returns structured JSON
matching the schema defined in tsb-knowledge-base.json.

USAGE
-----
    export ANTHROPIC_API_KEY="sk-ant-..."
    python extract_tsb.py --input ./pdfs --output ./data/tsb-knowledge-base.json

    # Optional: process only PDFs not already in the existing JSON
    python extract_tsb.py --input ./pdfs --output ./data/tsb-knowledge-base.json --skip-existing

    # Optional: limit to N PDFs for testing
    python extract_tsb.py --input ./pdfs --output ./data/tsb-knowledge-base.json --limit 5

REQUIREMENTS
------------
    pip install anthropic pdf2image pillow
    apt-get install poppler-utils      # provides pdftoppm for pdf2image

COST ESTIMATE
-------------
    ~$0.02-0.05 per bulletin via Claude API (claude-sonnet-4-5).
    35 bulletins ≈ $1-2 total. 500 bulletins ≈ $15-25.
"""

import argparse
import base64
import io
import json
import os
import sys
import time
from pathlib import Path
from typing import Any

from anthropic import Anthropic
from pdf2image import convert_from_path

# ---------------------------------------------------------------------------
# Schema definition — passed to Claude so it knows what shape to return.
# Keep this in sync with tsb-knowledge-base.json.
# ---------------------------------------------------------------------------

ENTRY_SCHEMA = {
    "type": "object",
    "required": ["id", "source_file", "type", "product_category", "title", "summary"],
    "properties": {
        "id":               {"type": "string",  "description": "Bulletin ID, e.g. 'TBS0054'"},
        "source_file":      {"type": "string",  "description": "Original PDF filename"},
        "revision_date":    {"type": ["string", "null"], "description": "ISO date YYYY-MM-DD"},
        "type":             {"type": "string", "enum": ["diagnostic", "installation_tip", "appearance_only", "warning"]},
        "product_category": {"type": "string", "enum": ["starter", "alternator", "other"]},
        "title":            {"type": "string", "description": "Short descriptive title in your own words"},
        "summary":          {"type": "string", "description": "1-3 sentence paraphrased summary. DO NOT copy the bulletin text verbatim."},
        "vehicles": {
            "type": ["object", "null"],
            "properties": {
                "make":   {"type": ["string", "null"]},
                "models": {"type": "array", "items": {"type": ["string", "object"]}},
                "years":  {"type": "array", "items": {"type": "integer"}},
                "applies_to": {"type": ["string", "null"]},
            }
        },
        "symptoms":          {"type": "array", "items": {"type": "string"}},
        "dtcs":              {"type": "array", "items": {"type": "string"}, "description": "OBD-II / mfr DTCs like P0338"},
        "cause":             {"type": ["string", "null"]},
        "fixes": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "priority":          {"type": "integer"},
                    "action":            {"type": "string"},
                    "part_number":       {"type": ["string", "null"]},
                    "manufacturer":      {"type": ["string", "null"]},
                    "estimated_cost_usd":{"type": ["string", "null"]},
                    "location":          {"type": ["string", "null"]},
                }
            }
        },
        "torque_specs": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "fastener": {"type": "string"},
                    "value":    {"type": "string"},
                    "value_nm": {"type": ["string", "null"]},
                }
            }
        },
        "tools_required":    {"type": "array", "items": {"type": "string"}},
        "warnings":          {"type": "array", "items": {"type": "string"}},
        "different_versions":{"type": "array", "items": {"type": "string"}, "description": "Supplier/version names like 'Hitachi', 'Bosch', 'Version I'"},
        "related_bulletins": {"type": "array", "items": {"type": "string"}},
        "tags":              {"type": "array", "items": {"type": "string"}, "description": "lowercase, hyphenated"},
        "confidence":        {"type": "string", "enum": ["high", "medium", "low"]},
        "notes":             {"type": ["string", "null"], "description": "Anything noteworthy that doesn't fit other fields"},
    }
}

EXTRACTION_PROMPT = """You are extracting structured data from a Motorcar Parts of America (MPA) Technical Bulletin.
The bulletin pages are provided as images.

Extract the bulletin into the provided JSON schema. CRITICAL RULES:

1. PARAPHRASE all narrative text in your own words. Do NOT copy bulletin sentences verbatim.
   Facts (part numbers, torque specs, vehicle years, DTCs, costs) are fine to record verbatim
   since facts are not copyrightable.

2. CLASSIFY the bulletin type accurately:
   - "diagnostic"        — has SYMPTOM / CAUSE / FIX structure
   - "installation_tip"  — installation procedure, torque, transfer of parts, etc.
   - "appearance_only"   — only shows that replacement part may look different from OE
   - "warning"           — primarily a caution/warning notice

3. Set confidence:
   - "high"   — all text legible, content fits cleanly into schema
   - "medium" — some ambiguity in the bulletin or partial info
   - "low"    — text hard to read, or content doesn't fit well

4. Tags should be lowercase, hyphenated. Always include product_category and any vehicle make.
   For diagnostic bulletins also tag the primary symptom (e.g. "no-crank").

5. If the bulletin appears identical to a known MPA bulletin (e.g. multiple Nissan
   inhibitor-relay bulletins), tag it "duplicate" and note the similarity.

Return ONLY the JSON object — no markdown fences, no preamble, no explanation."""


def pdf_to_images(pdf_path: Path, dpi: int = 110) -> list:
    """Rasterize all pages of a PDF to PIL images."""
    return convert_from_path(str(pdf_path), dpi=dpi)


def image_to_b64(img) -> str:
    """Encode a PIL image as base64 JPEG."""
    buf = io.BytesIO()
    img.convert("RGB").save(buf, format="JPEG", quality=85)
    return base64.standard_b64encode(buf.getvalue()).decode("ascii")


def extract_bulletin(client: Anthropic, pdf_path: Path, model: str) -> dict[str, Any]:
    """Send PDF pages to Claude and parse the structured JSON response."""
    images = pdf_to_images(pdf_path)

    # Build a multi-image content block
    content: list[dict[str, Any]] = []
    for img in images:
        content.append({
            "type": "image",
            "source": {
                "type": "base64",
                "media_type": "image/jpeg",
                "data": image_to_b64(img),
            },
        })

    content.append({
        "type": "text",
        "text": (
            f"PDF filename: {pdf_path.name}\n\n"
            f"JSON schema (return data matching this shape):\n"
            f"{json.dumps(ENTRY_SCHEMA, indent=2)}\n\n"
            f"{EXTRACTION_PROMPT}"
        ),
    })

    response = client.messages.create(
        model=model,
        max_tokens=4096,
        messages=[{"role": "user", "content": content}],
    )

    # Extract JSON from the response — Claude should return raw JSON,
    # but strip markdown fences defensively.
    raw = response.content[0].text.strip()
    if raw.startswith("```"):
        raw = raw.split("```", 2)[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip().rstrip("`").strip()

    try:
        entry = json.loads(raw)
    except json.JSONDecodeError as e:
        raise ValueError(f"Claude returned invalid JSON for {pdf_path.name}: {e}\nRaw: {raw[:500]}")

    # Force source_file to match the actual filename — never trust the LLM here
    entry["source_file"] = pdf_path.name
    if "id" not in entry or not entry["id"]:
        entry["id"] = pdf_path.stem

    return entry


def load_existing(output_path: Path) -> dict[str, Any]:
    """Load existing knowledge base or return a fresh skeleton."""
    if output_path.exists():
        with open(output_path) as f:
            return json.load(f)
    return {
        "schema_version": "1.0",
        "source": "MPA Technical Bulletins",
        "generated": time.strftime("%Y-%m-%d"),
        "entry_count": 0,
        "entries": [],
    }


def save_kb(kb: dict[str, Any], output_path: Path) -> None:
    kb["entry_count"] = len(kb["entries"])
    kb["generated"] = time.strftime("%Y-%m-%d")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(kb, f, indent=2)


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--input",  required=True, help="Folder of TSB PDFs")
    p.add_argument("--output", required=True, help="Path to output JSON file")
    p.add_argument("--model",  default="claude-sonnet-4-5", help="Claude model to use")
    p.add_argument("--limit",  type=int, default=None, help="Process only first N PDFs (for testing)")
    p.add_argument("--skip-existing", action="store_true", help="Skip PDFs already in the knowledge base")
    p.add_argument("--sleep",  type=float, default=0.0, help="Seconds to sleep between API calls (rate limiting)")
    args = p.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("ERROR: Set ANTHROPIC_API_KEY environment variable.", file=sys.stderr)
        return 1

    input_dir  = Path(args.input)
    output_path = Path(args.output)

    if not input_dir.is_dir():
        print(f"ERROR: Input directory not found: {input_dir}", file=sys.stderr)
        return 1

    pdfs = sorted(input_dir.glob("*.pdf"))
    if not pdfs:
        print(f"ERROR: No PDFs found in {input_dir}", file=sys.stderr)
        return 1

    kb = load_existing(output_path)
    existing_ids = {e["id"] for e in kb["entries"]}

    if args.skip_existing:
        pdfs = [p for p in pdfs if p.stem not in existing_ids]
        print(f"Skipping {len(existing_ids)} already-extracted bulletins.")

    if args.limit:
        pdfs = pdfs[:args.limit]

    print(f"Processing {len(pdfs)} PDF(s) using {args.model}...")
    client = Anthropic(api_key=api_key)

    success = 0
    failed: list[tuple[str, str]] = []

    for i, pdf in enumerate(pdfs, 1):
        print(f"[{i}/{len(pdfs)}] {pdf.name}...", end=" ", flush=True)
        try:
            entry = extract_bulletin(client, pdf, args.model)
            # Replace existing entry with same id, otherwise append
            kb["entries"] = [e for e in kb["entries"] if e["id"] != entry["id"]]
            kb["entries"].append(entry)
            # Save after every successful extraction so we don't lose work on crash
            save_kb(kb, output_path)
            print(f"✓ {entry['type']:<18} confidence={entry.get('confidence', '?')}")
            success += 1
        except Exception as e:
            print(f"✗ {e}")
            failed.append((pdf.name, str(e)))

        if args.sleep > 0:
            time.sleep(args.sleep)

    # Sort entries by id for stable output
    kb["entries"].sort(key=lambda e: e["id"])
    save_kb(kb, output_path)

    print(f"\nDone. {success}/{len(pdfs)} succeeded.")
    if failed:
        print(f"\nFailed:")
        for name, err in failed:
            print(f"  {name}: {err}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
