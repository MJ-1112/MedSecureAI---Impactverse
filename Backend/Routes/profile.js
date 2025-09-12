import express from 'express';
import isAuthenticated from '../Middlewares/Auth.js';
import UserModel from '../Modules/User.js';

const router = express.Router();

router.get('/', isAuthenticated, async(req,res)=>{
    const user = await UserModel.findById(req.user.id).select('-password');
    res.status(200).json(user);
});

export default router;
