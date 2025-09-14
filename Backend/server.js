import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./Routes/AuthRouter.js";
import profileRoutes from "./Routes/profile.js";
import csvRoutes from "./Routes/csv.js";
import orderRoutes from "./Routes/orders.js";
import verifyRoutes from "./Routes/verify.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/csv", csvRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/verify", verifyRoutes);

app.listen(5000, () => console.log("✅ Server running on port 5000"));
