import { NFTStorage, File } from "nft.storage";

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });

export const uploadFileToIPFS = async (fileBuffer, filename) => {
  const file = new File([fileBuffer], filename);
  const cid = await client.storeBlob(file);
  return cid;
};
