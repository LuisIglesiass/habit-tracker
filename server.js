// server.js
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

const dbPath =
  process.env.NODE_ENV === "production"
    ? path.join("/tmp", "habit-tracker.db")
    : path.join(__dirname, "db", "habit-tracker.db");
// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    console.log(`Connected to database at ${dbPath}`);
  }
});

// Create tables if they do not exist
db.serialize(() => {
  db.run("PRAGMA busy_timeout = 3000");
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS habit_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habit_id INTEGER,
    date TEXT,
    completed BOOLEAN DEFAULT false,
    FOREIGN KEY(habit_id) REFERENCES habits(id)
  )`);
});

// Register user
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function (err) {
    if (err) return res.status(400).json({ error: "User already exists" });
    res.json({ id: this.lastID, username });
  });
});

// Login user
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, row) => {
    if (err || !row) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, row.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.json(row);
  });
});

// Create a new habit
app.post("/api/habits", (req, res) => {
  const { user_id, name } = req.body;
  db.run(`INSERT INTO habits (user_id, name) VALUES (?, ?)`, [user_id, name], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, user_id, name });
  });
});

// Get all habits for a user
app.get("/api/habits/:user_id", (req, res) => {
  const { user_id } = req.params;
  db.all(`SELECT * FROM habits WHERE user_id = ?`, [user_id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// Delete a habit
app.delete("/api/habits/remove/:habit_id", (req, res) => {
  const { habit_id } = req.params;
  db.run(`DELETE FROM habits WHERE id = ?`, [habit_id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ habit_id });
  });
});

// Edit habit name
app.put("/api/habits/edit/:habit_id", (req, res) => {
  const { habit_id } = req.params;
  const { name } = req.body;
  db.run(`UPDATE habits SET name = ? WHERE id = ?`, [name, habit_id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ habit_id, name });
  });
});

// Mark a habit as completed (add entry)
app.post("/api/habits/completed/:habit_id", (req, res) => {
  const { habit_id } = req.params;
  const { date, completed } = req.body;
  db.run(`INSERT INTO habit_entries (habit_id, date, completed) VALUES (?, ?, ?)`, [habit_id, date, completed], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: this.lastID, habit_id, date, completed });
  });
});

// Remove the most recent completion entry (mark as incomplete)
app.post("/api/habits/incompleted/:habit_id", (req, res) => {
  const { habit_id } = req.params;

  db.get(`SELECT date FROM habit_entries WHERE habit_id = ? ORDER BY date DESC LIMIT 1`, [habit_id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });

    if (row) {
      db.run(`DELETE FROM habit_entries WHERE habit_id = ? AND date = ?`, [habit_id, row.date], function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ habit_id, date: row.date, removed: true });
      });
    } else {
      res.status(404).json({ error: "No entries found for this habit." });
    }
  });
});

// ✅ Get all completed entries for a specific user
app.get("/api/habits/completed/:user_id", (req, res) => {
  const { user_id } = req.params;
  db.all(`
    SELECT he.id, he.habit_id, he.date, he.completed
    FROM habit_entries he
    JOIN habits h ON he.habit_id = h.id
    WHERE h.user_id = ? AND he.completed = 1
  `, [user_id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// Get all habits for a user with today's completion status
app.get("/api/habits/with-entries/:user_id", (req, res) => {
  const { user_id } = req.params;
  const today = new Date().toISOString().split('T')[0];

  db.all(`
    SELECT h.id, h.name, 
           CASE WHEN he.completed IS NOT NULL AND DATE(he.date) = ? THEN 1 ELSE 0 END AS completed
    FROM habits h
    LEFT JOIN habit_entries he ON h.id = he.habit_id
    WHERE h.user_id = ?
  `, [today, user_id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// Get all habits completed today by a user
app.get("/api/habits/completed/today/:user_id", (req, res) => {
  const { user_id } = req.params;
  const today = new Date().toISOString().split('T')[0];

  db.all(`
    SELECT h.id, h.name
    FROM habits h
    JOIN habit_entries he ON h.id = he.habit_id
    WHERE h.user_id = ? AND he.completed = 1 AND DATE(he.date) = ?
  `, [user_id, today], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// Get all habits not completed today by a user
app.get("/api/habits/incomplete/today/:user_id", (req, res) => {
  const { user_id } = req.params;
  const today = new Date().toISOString().split('T')[0];

  db.all(`
    SELECT h.id, h.name
    FROM habits h
    LEFT JOIN habit_entries he 
      ON h.id = he.habit_id AND DATE(he.date) = ?
    WHERE h.user_id = ?
      AND (he.completed IS NULL OR he.completed = 0)
  `, [today, user_id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});