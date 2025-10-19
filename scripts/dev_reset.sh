#!/usr/bin/env bash
set -e
echo "Resetting local outputs…"
rm -rf dist SBOM
mkdir -p dist/exports SBOM
echo "Done."
