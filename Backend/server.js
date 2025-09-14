import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";
import { NFTStorage, File } from "nft.storage";
import dotenv from "dotenv";
import cors from "cors";

import User from "./Modules/User.js"; // Make sure User model exists

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB connection error:", err));

// NFT Storage client
const nftClient = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });

// Multer for file uploads
const upload = multer({ dest: "uploads/" });

// --- Signup ---
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, role, region } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.json({ success: false, message: "User exists" });

    const user = await User.create({ name, email, password, role, region });
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// --- Login ---
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.password !== password)
      return res.json({ success: false, message: "Invalid password" });

    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// --- Profile ---
app.get("/api/profile/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// --- Upload verification doc to IPFS ---
app.post("/api/verify/:userId", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) return res.json({ success: false, message: "No file uploaded" });

    const fileData = await fs.promises.readFile(req.file.path);
    const ipfsFile = new File([fileData], req.file.originalname, { type: req.file.mimetype });
    const cid = await nftClient.storeBlob(ipfsFile);

    res.json({ success: true, cid, url: `https://ipfs.io/ipfs/${cid}` });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// --- Start server ---
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
