import jwt from 'jsonwebtoken';
import UserModel from '../Modules/User.js';

const isAuthenticated = async (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) return res.status(401).json({message:'No token provided'});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);
        if(!user) return res.status(404).json({message:'User not found'});
        req.user = { id: user._id };
        next();
    }catch(err){
        res.status(401).json({message:'Invalid token'});
    }
}

export default isAuthenticated;
