"use client";
import { useEffect, useState } from "react";

export default function MedDataPage() {
  const [records, setRecords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const API_URL = "https://csv-to-mongo-convrter.onrender.com/data";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();

        // Only keep required fields
        const slimData = (json.records || []).map((r) => ({
          _id: r._id,
          medicine_id: r.medicine_id,
          product_name: r.product_name,
        }));

        setRecords(slimData);
        setFiltered(slimData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // --- Search ---
  useEffect(() => {
    if (!query.trim()) {
      setFiltered(records);
      return;
    }
    const q = query.toLowerCase();
    const results = records.filter(
      (row) =>
        row._id?.toLowerCase().includes(q) ||
        String(row.medicine_id).toLowerCase().includes(q) ||
        row.product_name?.toLowerCase().includes(q)
    );
    setFiltered(results);
  }, [query, records]);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Medicine Data</h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search by ID, Medicine ID, or Name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
        />
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : filtered.length === 0 ? (
        <p>No medicines found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-blue-400">
              <tr>
                <th className="p-3 border border-gray-700">_id</th>
                <th className="p-3 border border-gray-700">Medicine ID</th>
                <th className="p-3 border border-gray-700">Product Name</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr
                  key={m._id || i}
                  className="border-b border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="p-3">{m._id}</td>
                  <td className="p-3">{m.medicine_id}</td>
                  <td className="p-3">{m.product_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
