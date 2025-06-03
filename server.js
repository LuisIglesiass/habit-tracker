// server.js
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(path.join(__dirname, "db", "habit-tracker.db"));

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

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function (err) {
    if (err) return res.status(400).json({ error: "Usuario ya existe" });
    res.json({ id: this.lastID, username });
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, row) => {
    if (err || !row) return res.status(401).json({ error: "Credenciales inválidas" });

    const isMatch = await bcrypt.compare(password, row.password);
    if (!isMatch) return res.status(401).json({ error: "Credenciales inválidas" });

    res.json(row);
  });
});

app.post("/api/habits", (req, res) => {
  const { user_id, name } = req.body;
  console.log("Datos recibidos:", { user_id, name }); // Agrega esta línea
  db.run(`INSERT INTO habits (user_id, name) VALUES (?, ?)`, [user_id, name], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ user_id, name });
  });
});

app.delete("/api/habits/remove/:habit_id", (req, res) => {
  const { habit_id } = req.params;
  console.log("Datos recibidos hola:", { habit_id });
  db.run(`DELETE FROM habits WHERE id = ?`, [habit_id], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ habit_id });
  });
});

app.put("/api/habits/edit/:habit_id", (req, res) => {
  const { habit_id } = req.params;
  const { name } = req.body;
  db.run(`UPDATE habits SET name = ? WHERE id = ?`, [name, habit_id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ habit_id, name });
  });
});

app.get("/api/habits/:user_id", (req, res) => {
  const { user_id } = req.params;
  db.all(`SELECT * FROM habits WHERE user_id = ?`, [user_id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/habits/completed/:habit_id", (req, res) => {
  const { habit_id } = req.params;
  const { date, completed } = req.body;
  console.log("Received data:", { habit_id, date, completed });
  db.run(`INSERT INTO habit_entries (habit_id, date, completed) VALUES (?, ?, ?)`, [habit_id, date, completed], (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ habit_id, date, completed });
  });
});

app.post("/api/habits/incompleted/:habit_id", (req, res) => {
  const { habit_id } = req.params;
  const { date, completed } = req.body;

  // Primero, obtenemos la última fecha para el habit_id
  db.get(`SELECT date FROM habit_entries WHERE habit_id = ? ORDER BY date DESC LIMIT 1`, [habit_id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    
    if (row) {
      console.log("Última fecha encontrada:", row.date); // Para depuración
      // Ahora eliminamos la entrada con la última fecha
      db.run(`DELETE FROM habit_entries WHERE habit_id = ? AND date = ?`, [habit_id, row.date], function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ habit_id, date: row.date, completed });
      });
    } else {
      res.status(404).json({ error: "No entries found for this habit." });
    }
  });
});

app.get("/api/habits/completed/:user_id", (req, res) => {
  const { user_id } = req.params;
  db.all(`SELECT * FROM habit_entries WHERE user_id = ? AND completed = 1`, [user_id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/api/habits/with-entries/:user_id", (req, res) => {
  const { user_id } = req.params;
  const today = new Date().toISOString().split('T')[0]; // Obtener la fecha de hoy en formato YYYY-MM-DD

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

// Route to get completed habits for today
app.get("/api/habits/completed/today/:user_id", (req, res) => {
  const { user_id } = req.params;
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  db.all(`
    SELECT h.id, h.name, 
           CASE WHEN he.completed IS NOT NULL AND DATE(he.date) = ? THEN 1 ELSE 0 END AS completed
    FROM habits h
    LEFT JOIN habit_entries he ON h.id = he.habit_id
    WHERE h.user_id = ? AND he.completed = 1 AND DATE(he.date) = ?
  `, [today, user_id, today], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// Route to get incomplete habits for today
app.get("/api/habits/incomplete/today/:user_id", (req, res) => {
  const { user_id } = req.params;
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  db.all(`
    SELECT h.id, h.name, 
           CASE WHEN he.completed IS NOT NULL AND DATE(he.date) = ? THEN 1 ELSE 0 END AS completed
    FROM habits h
    LEFT JOIN habit_entries he ON h.id = he.habit_id
    WHERE h.user_id = ? AND (he.completed IS NULL OR he.completed = 0) AND (he.date IS NULL OR DATE(he.date) = ?)
  `, [today, user_id, today], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});