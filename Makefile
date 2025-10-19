SHELL := /bin/bash

install:
	@npm install

run:
	@npx expo start

test:
	@npx jest --passWithNoTests

verify:
	@echo "Running tests…"
	@npx jest --passWithNoTests
	@echo "Generating deterministic export…"
	@python3 export/export.py --out dist/exports/spark.json --deterministic
	@mkdir -p SBOM
	@sha256sum dist/exports/spark.json > SBOM/checksums.csv
	@echo "verify complete."

export:
	@python3 export/export.py --out dist/exports/spark.json --deterministic

sbom:
	@mkdir -p SBOM
	@printf '{ "bomFormat":"CycloneDX","specVersion":"1.5","components":[] }' > SBOM/sbom.cdx.json
	@printf '{ "project":"Spark","version":"v2.3","generated_at":"%s" }\n' "$$(date -u +'%Y-%m-%dT%H:%M:%SZ')" > SBOM/provenance.json
	@echo "SBOM written to SBOM/"

clean:
	@rm -rf dist web-build SBOM
