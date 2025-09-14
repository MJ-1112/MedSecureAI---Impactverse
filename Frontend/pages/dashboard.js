"use client";

export default function SupplierDashboard() {
  const LOGOUT_URL = "https://med-secure-ai-impactverse-client1.vercel.app/";

  // Logout logic (simple redirect)
  const handleLogout = () => {
    window.location.href = LOGOUT_URL;
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Supplier Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Welcome */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold">Welcome, Supplier 👋</h2>
        <p className="text-gray-300 mt-2 max-w-2xl">
          You are logged in as a <span className="font-bold">Supplier</span> in
          MedLedger. As a supplier, your role is to ensure that medicine records
          are authentic, verified, and securely added to the blockchain. This
          prevents counterfeit drugs from entering the market and builds trust
          in the supply chain.
        </p>
      </section>

      {/* IPFS Verification */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Medicine Verification</h3>
        <p className="text-gray-400 mb-4">
          Verify medicine authenticity through our blockchain-powered IPFS
          system.
        </p>
        <a
          href="https://adi-tya16.github.io/medblock-blockchain-ipfs/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to IPFS Verification
        </a>
      </section>
    </main>
  );
}
