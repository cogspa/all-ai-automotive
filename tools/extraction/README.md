# TSB Extraction Pipeline

Turns scanned MPA Technical Bulletin PDFs into structured JSON for the All AI Automotive knowledge base.

## What's in this folder

```
extraction-pipeline/
├── data/
│   └── tsb-knowledge-base.json    # 35 bulletins already extracted, ready to use
├── scripts/
│   └── extract_tsb.py             # Production extraction script for new PDFs
└── README.md                      # This file
```

## Quick start (using existing data)

The 35 bulletins from your initial upload are already extracted in `data/tsb-knowledge-base.json`. Drop that file into your React app at `src/data/tsb-knowledge-base.json` and you can search it immediately. No script needed.

## Extracting new bulletins

When you get more PDFs:

```bash
# 1. Install dependencies (one-time)
pip install anthropic pdf2image pillow
# Linux: also install poppler-utils for pdf2image
sudo apt-get install poppler-utils
# macOS:
brew install poppler

# 2. Set your API key (one-time per shell)
export ANTHROPIC_API_KEY="sk-ant-..."

# 3. Run extraction
python scripts/extract_tsb.py \
    --input ./new-pdfs \
    --output ./data/tsb-knowledge-base.json \
    --skip-existing
```

The script will append new entries to the existing JSON, skipping any bulletin already in the file. It saves after every successful extraction so a crash doesn't lose work.

### Useful flags

| Flag | Purpose |
|---|---|
| `--limit 5` | Process only first 5 PDFs (for testing) |
| `--skip-existing` | Skip PDFs already in the knowledge base |
| `--model claude-sonnet-4-5` | Override default Claude model |
| `--sleep 0.5` | Pause between API calls (if you hit rate limits) |

## Cost expectations

Per bulletin, with current Claude Sonnet pricing: roughly **2–5 cents**. So:
- 35 bulletins ≈ $1
- 500 bulletins ≈ $15–25
- 5,000 bulletins ≈ $150–250

Most of the cost is image input (each PDF is 1–2 pages of base64 JPEG). If cost matters at scale, switch to `claude-haiku-4-5` for roughly 5× cheaper extraction with slightly lower fidelity.

## The schema

Every entry in the JSON has this shape (see `data/tsb-knowledge-base.json` for real examples):

```jsonc
{
  "id": "TBS0054",                    // Bulletin number (filename stem)
  "source_file": "TBS0054.pdf",
  "revision_date": "2009-11-06",
  "type": "diagnostic",               // diagnostic | installation_tip | appearance_only | warning
  "product_category": "starter",      // starter | alternator | other
  "title": "Short paraphrased title",
  "summary": "1-3 sentence paraphrased summary in our own words",
  "vehicles": {
    "make": "Nissan",
    "models": ["Altima", "..."],      // can be strings OR objects with year ranges
    "years": [2002, 2003, 2004],
    "applies_to": "free-text applicability note"
  },
  "symptoms": ["Starter just clicks", "..."],
  "dtcs": ["P0338"],                  // OBD-II / mfr DTCs
  "cause": "...",
  "fixes": [
    {
      "priority": 1,
      "action": "Replace inhibitor relay",
      "part_number": "25230-89981",
      "manufacturer": "Nissan",
      "estimated_cost_usd": "26-31",
      "location": "Right inner fender panel"
    }
  ],
  "torque_specs": [
    { "fastener": "Through bolt", "value": "66-76 in-lbs", "value_nm": "7.5-8.6 N·m" }
  ],
  "tools_required": ["wire stripper", "..."],
  "warnings": ["Disconnect negative battery cable first"],
  "different_versions": ["Hitachi", "Mitsubishi"],
  "related_bulletins": ["TBS0060", "TBS0077"],
  "tags": ["nissan", "starter", "no-crank", "inhibitor-relay"],
  "confidence": "high",               // high | medium | low
  "notes": "Anything that doesn't fit other fields"
}
```

## Wiring it into the search UI

Once `tsb-knowledge-base.json` lives at `src/data/`, the Knowledge Hub search button can:

1. **DTC match** — if the query matches `/^[PCBU]\d{4}$/`, filter `entries` where `dtcs` contains that code.
2. **Symptom search** — fuzzy-match the query against `symptoms`, `summary`, and `cause` fields. [Fuse.js](https://www.fusejs.io/) handles this well in the browser, no backend needed.
3. **Vehicle filter** — dropdown driven by unique values from `vehicles.make` / `vehicles.models`.
4. **Result card** — show `title`, `summary`, top fix's part number, and a link to the source PDF.

For the current 35-entry corpus, in-browser Fuse.js search returns instantly. When the corpus crosses ~1,000 entries, migrate to Supabase + pgvector for embedding-based semantic search (see the earlier scoping conversation).

## Quality notes from the initial 35

A few things worth knowing before you build the search UI:

**Five Nissan bulletins are duplicates.** TBS0054, 0060, 0077, 0089, 0114 all describe the same inhibitor-relay diagnostic. They're tagged `"duplicate"` and cross-linked via `related_bulletins`. Decide whether the search UI deduplicates by tag or shows them all.

**Most bulletins (18 of 35) are appearance-only** — they only confirm that the replacement part may look different. These have empty `symptoms`, `dtcs`, `cause`, and `fixes` arrays. They're still useful as part lookup data ("this is what your replacement starter should look like") but they should rank below diagnostic bulletins in search results.

**Only one bulletin contains a DTC** (TBS0112, P0338). Real-world TSB corpora have far more DTC coverage; that comes when you ingest TSBs from larger sources, OEM portals, or NHTSA complaints.

**Vehicle data is sparse.** MPA bulletins describe parts more than vehicles. The vehicle data in TBS0125 (the Nissan IPDM table) is the exception. As the corpus grows beyond MPA bulletins, vehicle coverage will improve dramatically.

## Editing entries by hand

The JSON is human-editable — open it in any editor, fix typos, refine summaries, add missing vehicle data. The script's `--skip-existing` flag ensures your edits survive future extraction runs, since it won't re-process bulletins already in the file.

When you want the script to **re-extract** a bulletin (e.g. after improving the prompt), delete that entry's object from the JSON and re-run with `--skip-existing`.

## Adapting to non-MPA sources

The schema is deliberately source-agnostic. To add a different TSB source (Ford OASIS, GM Service Information, NHTSA recall letters):

1. Copy `extract_tsb.py` to e.g. `extract_ford.py`.
2. Update the `EXTRACTION_PROMPT` to describe the new format.
3. Set `"source"` in the JSON to identify origin.
4. Run against the new PDF folder.

Same schema, same JSON file (or a sibling JSON), same search UI on top.

## Schema versioning

The JSON has `"schema_version": "1.0"` at the root. If you change the schema (add fields, rename fields), bump the version and write a one-time migration script. The search UI should check the schema version and refuse to run against an unknown one.

## Troubleshooting

**`pdf2image` errors about poppler** → install `poppler-utils` (Linux) or `poppler` via Homebrew (macOS). On Windows, download poppler binaries and add them to PATH.

**Claude returns markdown-fenced JSON** → the script handles this defensively, but if you see "invalid JSON" errors, check that the model is current. Older models sometimes wrap JSON in ```json fences; the script strips these but extreme cases (lots of preamble text) may leak through.

**Rate limits** → use `--sleep 1.0` to pace requests. Anthropic's Tier 1 rate limits are generous enough for a few hundred bulletins; if you're processing thousands, request a tier upgrade.

**Low-confidence entries** → after a batch, query the JSON for `"confidence": "low"` entries and review them by hand against the source PDFs. The schema flags these for you specifically so you don't have to manually skim every entry.
