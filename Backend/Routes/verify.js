import express from "express";
import multer from "multer";
import fs from "fs";
import { NFTStorage, File } from "nft.storage";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Directly put NFT.Storage key here for testing
const client = new NFTStorage({ token: "<YOUR_NFT_STORAGE_KEY>" });

router.post("/", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) return res.json({ success: false, message: "No file uploaded" });

    const fileData = await fs.promises.readFile(req.file.path);
    const ipfsFile = new File([fileData], req.file.originalname, { type: req.file.mimetype });
    const cid = await client.storeBlob(ipfsFile);

    res.json({ success: true, cid, url: `https://ipfs.io/ipfs/${cid}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
