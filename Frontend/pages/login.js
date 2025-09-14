"use client"
import React, { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("chemist")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handle(e) {
    e.preventDefault()
    setError(""); setLoading(true)
    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Login failed")
      localStorage.setItem("token", data.jwtToken)
      localStorage.setItem("user", JSON.stringify(data.user))
      window.location.href = "/dashboard"
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        <form onSubmit={handle} className="space-y-4">
          <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded-lg px-3 py-2"/>
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2"/>
          <select value={role} onChange={e=>setRole(e.target.value)} className="w-full border rounded-lg px-3 py-2">
            <option value="chemist">Chemist</option>
            <option value="supplier">Supplier</option>
          </select>
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg">{loading ? "Logging in..." : "Login"}</button>
        </form>
      </div>
    </div>
  )
}
