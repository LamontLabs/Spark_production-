# Quickstart — Spark v2.3

## 1) Install toolchain
- Node.js 20+, npm or yarn
- Expo CLI: `npm i -g expo`
- Python 3.11+ (for export)

## 2) Clone and install
git clone https://github.com/Lamont-Labs/Spark.git
cd Spark
make install

## 3) Run the app
make run
# Open on Android/iOS or web via Expo

## 4) Verify determinism
make verify
# Produces: dist/exports/spark.json and SBOM/checksums.csv

## 5) Export (anytime)
make export

Troubleshooting:
- If Expo can’t find your device, use the web target from the QR menu.
- If Python missing, install `python3` and rerun `make verify`.
