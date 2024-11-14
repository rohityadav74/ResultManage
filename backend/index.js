//index.js file
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'result',
  password: 'Rohit1390',
  port: 5432,
});

const admins = [
  { email: "admin@example.com", password: "password123" },
  { email: "admin2@example.com", password: "password456" }
];

app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  const admin = admins.find(admin => admin.email === email && admin.password === password);

  if (admin) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.post("/admin/upload-result", async (req, res) => {
  const { name, rollNumber, semester, subjects } = req.body;
  try {
    await pool.query(
      `INSERT INTO students (name, roll_number, semester, subjects) VALUES ($1, $2, $3, $4)`,
      [name, rollNumber, semester, JSON.stringify(subjects)]
    );
    res.status(200).json({ message: "Result uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/student/check-result", async (req, res) => {
  const { name, rollNumber, semester } = req.body;
  try {
    const result = await pool.query(
      `SELECT * FROM students WHERE name = $1 AND roll_number = $2 AND semester = $3`,
      [name, rollNumber, semester]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Result not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
