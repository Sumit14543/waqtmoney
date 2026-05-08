import db from "../configs/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [user] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (user.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed]
    );

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user[0].password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login success",
      token,
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};