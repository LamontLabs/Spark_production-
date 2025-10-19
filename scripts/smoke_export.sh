#!/usr/bin/env bash
set -e
python3 export/export.py --out dist/exports/spark.json --deterministic
test -f SBOM/checksums.csv
echo "Smoke export OK."
