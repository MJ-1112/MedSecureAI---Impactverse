import express from 'express';
// import {signupValidation} from '../Middlewares/AuthValidation.js'
import {login, signup} from '../Controllers/AuthController.js'
const router = express.Router();

router.post('/login',login);
router.post('/signup', signup
)

export default router;