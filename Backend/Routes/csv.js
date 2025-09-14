import express from "express";
import { loadCsv, getCsvData } from "../Controllers/CsvController.js";

const router = express.Router();

router.get("/load", loadCsv);
router.get("/", getCsvData);

export default router;
