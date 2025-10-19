# Operations

| Command       | Purpose                                                   |
|---------------|-----------------------------------------------------------|
| make install  | Install npm deps                                          |
| make run      | Start Expo dev server                                     |
| make test     | Run Jest unit tests                                       |
| make verify   | Jest + deterministic export + checksum                    |
| make export   | Write JSON export to `dist/exports/spark.json`            |
| make sbom     | Generate SBOM & provenance                                |
| make clean    | Remove caches/outputs                                     |

SQLite schema (created on first run):
- `entries(id, date, gratitude, win, affirmation)`
- `streaks(id, start, end, length, broken)`
- `prompts(id, mode, text)`

Deterministic export hash saved to `SBOM/checksums.csv`.
