import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Modules/User.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, phone, region, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, phone, region, role });
    res.status(201).json({ message: "Signup successful", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, role });
    if (!user) return res.status(404).json({ message: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const profile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};
