import UploadDoc from "@/components/UploadDocs";

export default function UploadPage() {
  const userId = "replace_with_logged_in_user_id"; // you can replace with actual ID after login
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">IPFS Document Verification</h1>
      <UploadDoc userId={userId} />
    </div>
  );
}
