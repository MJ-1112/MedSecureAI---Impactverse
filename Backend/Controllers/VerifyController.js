import { uploadToIPFS } from "../utils/ipfs.js";
import User from "../Modules/User.js";

export const verifyUser = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const hash = await uploadToIPFS(req.file.buffer);
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { verified: true, ipfsHash: hash },
      { new: true }
    );

    res.json({ message: "Verified on IPFS", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
