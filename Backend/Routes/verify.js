import express from "express";
import multer from "multer";
import { verifyUser } from "../Controllers/VerifyController.js";
import auth from "../Middlewares/Auth.js";

const router = express.Router();
const upload = multer();

router.post("/", auth, upload.single("doc"), verifyUser);

export default router;
