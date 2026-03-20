const Database = require('better-sqlite3');
const db = new Database('lab.db');

db.prepare(`
CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount TEXT,
    type TEXT,
    date TEXT,
    note TEXT
)
`).run();

module.exports = db;