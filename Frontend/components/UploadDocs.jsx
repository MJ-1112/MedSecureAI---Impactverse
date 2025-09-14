"use client";
import { useState } from "react";

export default function UploadDoc({ token }) {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const BACKEND_URL = "http://localhost:5000/api";

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    const formData = new FormData();
    formData.append("document", file);

    try {
      const res = await fetch(`${BACKEND_URL}/verify/upload-doc`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (data.success) setIpfsHash(data.ipfsHash);
      else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Upload failed: " + err.message);
    }
  };

  const handleVerify = async () => {
    const res = await fetch(`${BACKEND_URL}/verify/verify-doc`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setFileUrl(data.fileUrl);
      window.open(data.fileUrl, "_blank");
    } else alert(data.message);
  };

  return (
    <div className="flex flex-col gap-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload & Get IPFS Hash
      </button>
      {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
      <button onClick={handleVerify} className="bg-green-500 text-white px-4 py-2 rounded">
        Verify Document
      </button>
      {fileUrl && (
        <p>
          File URL: <a href={fileUrl} target="_blank">{fileUrl}</a>
        </p>
      )}
    </div>
  );
}
