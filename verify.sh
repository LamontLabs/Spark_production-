#!/usr/bin/env bash
set -euo pipefail
echo "verify: tests + deterministic export + checksum"
npx jest --passWithNoTests
python3 export/export.py --out dist/exports/spark.json --deterministic
mkdir -p SBOM
sha256sum dist/exports/spark.json > SBOM/checksums.csv
echo "done."
