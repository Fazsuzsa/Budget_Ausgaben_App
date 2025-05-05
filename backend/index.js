const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');


const app = express();
const PORT = 5005
const pool = new Pool({
    user: process.env.DB_USER, // Dein PostgreSQL-Benutzername
    host: process.env.DB_HOST, // z. B. 'localhost'
    database: process.env.DB_NAME, // Name deiner Datenbank
    password: process.env.DB_PASSWORD, // Dein Passwort
    port: process.env.DB_PORT, // Standardport für PostgreSQL
});


const createTable = async () => {
    const client = await pool.connect();
    try {
        const queryText = `
            CREATE TABLE IF NOT EXISTS Users (id  SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    budget real NOT NULL,
    e_mail VARCHAR(100) NOT NULL
            );
        `;
        await client.query(queryText);
        console.log("✅ Table 'Users' created!");
    } catch (err) {
        console.error("❌ Error creating table:", err);
    } finally {
        client.release();
    }
};

createTable();



app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/expenses", async (req, res) => {
    const result = await pool.query("SELECT * FROM expenses");
    res.json(result.rows);
});



app.post("/login", async (req, res) => {
    const { e_mail, password } = req.body;
    console.log("Request login:", e_mail, password);

    try {
        const result = await pool.query('SELECT * FROM users WHERE e_mail = $1', [e_mail]);
        const user = result.rows[0];

        if (!user) {
            return res.json({ error: "e_mail incorrect!" });
        }


        if (user.password !== password) {
            return res.json({ error: "Passwort incorrect" });
        }

        res.json({ message: "Connexion OK", user });
        console.log(res.json({ user }))
    } catch (error) {
        console.error("Error login:", error);
        res.status(500).json({ error: "Error server" });
    }
});




app.listen(PORT, () => {
    console.log(`Server lauft: http://localhost:${PORT}`);
});