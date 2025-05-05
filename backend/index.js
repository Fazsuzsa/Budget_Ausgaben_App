const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json());

// PostgreSQL-Verbindung über Pool ???
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// POST-Route - Ausgabe Hinzufügen
app.post('/api/expenses', async (req, res) => {
  const { title, amount, category } = req.body;

  if (!title || !amount) {
    return res.status(400).json({ error: 'title und amount sind erforderlich' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO expenses (title, amount, category) VALUES ($1, $2, $3) RETURNING *',
      [title, amount, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Fehler beim Einfügen in DB:', err);
    res.status(500).json({ error: 'Datenbankfehler' });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft: http://localhost:${PORT}`);
});
