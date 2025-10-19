import * as SQLite from 'expo-sqlite';

const DB_NAME = 'spark_demo.db';
let _db: SQLite.SQLiteDatabase | null = null;

export async function openDb(): Promise<SQLite.SQLiteDatabase> {
  if (_db) return _db;
  _db = await SQLite.openDatabaseAsync(DB_NAME);
  await _db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS entries(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      gratitude TEXT NOT NULL,
      win TEXT NOT NULL,
      affirmation TEXT NOT NULL
    );
  `);
  return _db;
}

export async function insertEntry(gratitude: string, win: string, affirmation: string) {
  const db = await openDb();
  const date = new Date().toISOString().slice(0, 10);
  await db.runAsync(
    'INSERT INTO entries(date, gratitude, win, affirmation) VALUES (?,?,?,?)',
    [date, gratitude, win, affirmation]
  );
}

export type Entry = { id: number; date: string; gratitude: string; win: string; affirmation: string };

export async function getEntries(): Promise<Entry[]> {
  const db = await openDb();
  const res = await db.getAllAsync<Entry>('SELECT * FROM entries ORDER BY date DESC, id DESC');
  return res;
}

export async function getEntryDates(): Promise<string[]> {
  const db = await openDb();
  const rows = await db.getAllAsync<{ date: string }>('SELECT DISTINCT date FROM entries ORDER BY date ASC');
  return rows.map(r => r.date);
}

export async function resetDatabase() {
  const db = await openDb();
  await db.execAsync('DELETE FROM entries; VACUUM;');
}
