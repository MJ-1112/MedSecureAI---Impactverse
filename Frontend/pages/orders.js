"use client";
import { useState, useEffect } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Demo static orders
    const demoOrders = [
      {
        _id: "1",
        product: "Paracetamol 500mg",
        quantity: 2,
        txHash: "0xabc123def456...",
        status: "Pending",
      },
      {
        _id: "2",
        product: "Amoxicillin 250mg",
        quantity: 1,
        txHash: "0x789ghi456jkl...",
        status: "Pending",
      },
      {
        _id: "3",
        product: "Cough Syrup",
        quantity: 3,
        txHash: "0x987xyz321uvw...",
        status: "Pending",
      },
    ];
    setOrders(demoOrders);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center p-6 border rounded bg-gray-50">
          <p className="text-gray-600">No orders found yet.</p>
          <p className="text-sm text-gray-400">Your orders will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Quantity</th>
                <th className="p-3 border">Transaction Hash</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border p-3 font-medium">{o.product}</td>
                  <td className="border p-3">{o.quantity}</td>
                  <td className="border p-3 text-blue-600 break-all">
                    {o.txHash}
                  </td>
                  <td className="border p-3">
                    <span className="px-3 py-1 text-sm rounded bg-yellow-100 text-yellow-700 font-medium">
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
