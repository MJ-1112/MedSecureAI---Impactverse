import express from "express";
import { signup, login, profile } from "../Controllers/AuthController.js";
import isAuthenticated from "../Middlewares/Auth.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", isAuthenticated, profile);

export default router;
