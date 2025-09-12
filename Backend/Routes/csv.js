import express from 'express';
import multer from 'multer';
import { uploadCsv } from '../Controllers/CsvController.js';
import isAuthenticated from '../Middlewares/Auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.post('/upload', isAuthenticated, upload.single('file'), uploadCsv);

export default router;
