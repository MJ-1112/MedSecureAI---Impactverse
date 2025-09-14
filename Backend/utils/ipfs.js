import { create } from "ipfs-http-client";

const client = create({ url: "https://ipfs.infura.io:5001" });

export async function uploadToIPFS(fileBuffer) {
  const { path } = await client.add(fileBuffer);
  return path; // CID
}
