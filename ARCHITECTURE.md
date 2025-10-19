# Architecture

**Stack:** Expo React Native (SDK 52), `expo-sqlite` for local persistence. Optional Python script creates deterministic JSON export.

## Components
- `src/screens/*` — UI screens (Today, History, Streaks, Settings)
- `src/lib/db.ts` — SQLite access layer
- `src/lib/streaks.ts` — bend-not-break streak engine
- `prompts/*.json` — adaptive prompt sets
- `export/export.py` — deterministic export + SBOM/provenance update
- `__tests__/*` — Jest unit tests

## Data Flow
User inputs → `insertEntry()` → SQLite `entries` table → History/Stats read via `getEntries()` / `getEntryDates()` → `computeStreak()` → UI.  
Export path calls Python to generate reproducible JSON and SHA-256 checksum.

## Determinism
- Stable, sorted export fields and order
- SHA-256 recorded at `SBOM/checksums.csv`
