#!/usr/bin/env bash
set -e
VERSION=${1:-"v2.3"}
mkdir -p dist
zip -r "dist/spark_${VERSION}_demo.zip" dist/exports SBOM README.md LICENSE
echo "Release built at dist/spark_${VERSION}_demo.zip"
