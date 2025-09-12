import { NFTStorage, File } from 'nft.storage';
import fs from 'fs';

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });

export const uploadToIPFS = async (filePath) => {
    const content = fs.readFileSync(filePath);
    const file = new File([content], filePath);
    const cid = await client.storeBlob(file);
    return `ipfs://${cid}`;
};
