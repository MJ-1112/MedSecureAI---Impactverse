import express from 'express';
import multer from 'multer';
import { uploadDoc } from '../Controllers/VerifyController.js';
import isAuthenticated from '../Middlewares/Auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.post('/upload-doc', isAuthenticated, upload.single('doc'), uploadDoc);

export default router;
