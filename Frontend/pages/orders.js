"use client"
import { useEffect, useState } from "react"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  useEffect(() => {
    if (!token) return
    fetch("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setOrders)
  }, [token])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Tx Hash</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td className="border p-2">{o.product}</td>
              <td className="border p-2">{o.quantity}</td>
              <td className="border p-2">{o.txHash}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
