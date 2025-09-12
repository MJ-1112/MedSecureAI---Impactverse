import UserModel from '../Modules/User.js';
import { uploadToIPFS } from '../utils/ipfs.js';

export const uploadDoc = async(req,res) => {
    try{
        const ipfsHash = await uploadToIPFS(req.file.path);
        await UserModel.findByIdAndUpdate(req.user.id, { verificationDoc: ipfsHash });
        res.status(200).json({message:'Document uploaded', ipfsHash});
    }catch(err){
        res.status(500).json({message:'IPFS upload error', error: err.message});
    }
}
