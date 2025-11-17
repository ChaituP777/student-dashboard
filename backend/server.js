import express from "express";
import fs from "fs";
import cors from "cors";
import CryptoJS from "crypto-js";
import path from "path";
import { fileURLToPath } from "url";

const SECRET_KEY = "mysecretkey12345";
const app = express();

app.use(cors());
app.use(express.json());

// FIX: Correct db.json absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, "..", "db.json");


// Encrypt
const encrypt = (obj) => {
  return CryptoJS.AES.encrypt(JSON.stringify(obj), SECRET_KEY).toString();
};

// Decrypt
const decrypt = (cipher) => {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Read DB
const readDB = () => JSON.parse(fs.readFileSync(DB_FILE));

// Write DB
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));


// ===== ROUTES =====

// GET all students
app.get("/students", (req, res) => {
  const db = readDB();
  res.json({ encryptedData: encrypt(db.students) });
});

// POST student
app.post("/students", (req, res) => {
  const decrypted = decrypt(req.body.encryptedData);

  const db = readDB();
  decrypted.id = Date.now().toString(36);
  db.students.push(decrypted);

  writeDB(db);

  res.json({ encryptedData: encrypt(decrypted) });
});

// PUT student
app.put("/students/:id", (req, res) => {
  const decrypted = decrypt(req.body.encryptedData);

  const db = readDB();
  const index = db.students.findIndex(s => s.id === req.params.id);

  db.students[index] = { ...db.students[index], ...decrypted };
  writeDB(db);

  res.json({ encryptedData: encrypt(db.students[index]) });
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  const db = readDB();
  db.students = db.students.filter(s => s.id !== req.params.id);
  writeDB(db);

  res.json({ encryptedData: encrypt({ success: true }) });
});

app.listen(7000, () => console.log("Secure server running on port 7000"));
