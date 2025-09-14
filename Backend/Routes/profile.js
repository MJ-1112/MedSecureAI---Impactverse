import express from "express";
import { profile } from "../Controllers/AuthController.js";
import auth from "../Middlewares/Auth.js";

const router = express.Router();

router.get("/", auth, profile);

export default router;
