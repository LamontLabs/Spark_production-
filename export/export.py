#!/usr/bin/env python3
import os, json, hashlib, argparse, pathlib, datetime
from dotenv import load_dotenv

load_dotenv()

OUT_DIR_DEFAULT = os.getenv("EXPORT_DIR", "dist/exports")
DB_NAME = os.getenv("DB_NAME", "spark_demo.db")

def deterministic_entries():
    # Demo-only: produce deterministic content independent of device DB.
    # Stable seed data sorted by (date, gratitude, win, affirmation).
    data = [
        {"date":"2025-10-01","gratitude":"Coffee","win":"Walked 10 min","affirmation":"I show up."},
        {"date":"2025-10-02","gratitude":"Sun","win":"Read 2 pages","affirmation":"I learn daily."},
        {"date":"2025-10-04","gratitude":"Friend","win":"Messaged back","affirmation":"I connect."}
    ]
    return sorted(data, key=lambda x:(x["date"],x["gratitude"],x["win"],x["affirmation"]))

def write_json(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
    return path

def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return "sha256:" + h.hexdigest()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=os.path.join(OUT_DIR_DEFAULT, "spark.json"))
    ap.add_argument("--deterministic", action="store_true")
    args = ap.parse_args()

    if args.deterministic:
        payload = {
            "project": "Spark",
            "version": "v2.3",
            "generated_at": datetime.datetime.utcnow().isoformat() + "Z",
            "entries": deterministic_entries()
        }
    else:
        # Fallback: deterministic anyway for demo.
        payload = {"project":"Spark","version":"v2.3","entries":deterministic_entries()}

    out_path = write_json(args.out, payload)
    checksum = sha256_file(out_path)

    # Also emit provenance files if SBOM directory exists
    sbom_dir = "SBOM"
    os.makedirs(sbom_dir, exist_ok=True)
    with open(os.path.join(sbom_dir, "checksums.csv"), "w", encoding="utf-8") as f:
        f.write(f"{out_path},{checksum}\n")
    with open(os.path.join(sbom_dir, "provenance.json"), "w", encoding="utf-8") as f:
        json.dump({
            "project":"Spark",
            "version":"v2.3",
            "date": datetime.date.today().isoformat(),
            "builder":"Lamont Labs deterministic seed",
            "artifacts":[out_path,"SBOM/checksums.csv"],
            "notes":"Demo-only; reproducible seeded outputs; no external secrets."
        }, f, indent=2)
    print(out_path, checksum)

if __name__ == "__main__":
    main()
