import UserModel, { regions } from "../Modules/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async(req,res) =>{
    try{
        const {name,email,password, phone, region} = req.body;

        if(!regions.includes(region)) return res.status(400).json({message:'Invalid region', success:false});

        const user = await UserModel.findOne({email});
        if(user) return res.status(409).json({message:'User exists', success:false});

        const userModel = new UserModel({name,email,password, phone, region});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();

        res.status(201).json({ message:"Signup Successful", success:true });
    } catch (error) {
        res.status(500).json({ message: "Error in signup", success: false, error: error.message });
    }
}

const login = async (req,res) => {
    try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found', success: false });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials', success: false });

        const jwtToken = jwt.sign({email:user.email, id:user._id}, process.env.JWT_SECRET, {expiresIn:'10h'});

        res.status(200).json({
            message: 'Login successful',
            success: true,
            jwtToken,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                region: user.region,
                verified: user.verified
            }
        });
    } catch(error){
        res.status(500).json({message:'Error in login', success:false, error:error.message});
    }
}

export { signup, login };
