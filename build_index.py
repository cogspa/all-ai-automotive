import os
import json
import subprocess
import sys

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package, "--user", "--break-system-packages"])

try:
    import pypdf
except ImportError:
    install("pypdf")
    import pypdf

pdf_dir = "public/uploads"
index = []

for filename in os.listdir(pdf_dir):
    if filename.endswith(".pdf"):
        path = os.path.join(pdf_dir, filename)
        try:
            reader = pypdf.PdfReader(path)
            text = ""
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + " "
            index.append({
                "id": filename.replace(".pdf", ""),
                "filename": filename,
                "text": text.strip()
            })
        except Exception as e:
            print(f"Error on {filename}: {e}")

with open("public/searchIndex.json", "w") as f:
    json.dump(index, f)

print("Generated search index with", len(index), "entries.")
