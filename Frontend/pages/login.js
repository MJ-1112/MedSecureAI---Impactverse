"use client"
import React, { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handle(e) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Direct backend URL
      const res = await fetch("https://medsecureai-impactverse.onrender.com//auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const contentType = res.headers.get("content-type")
      let data

      if (contentType && contentType.includes("application/json")) {
        data = await res.json()
      } else {
        const text = await res.text()
        throw new Error(`Server did not return JSON: ${text.slice(0, 100)}`)
      }

      if (!res.ok) throw new Error(data?.message || "Login failed")

      setSuccess("✅ Login successful")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>

        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center mb-2">{success}</p>}

        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                required
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full border rounded-lg px-3 py-2 pr-16 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute inset-y-0 right-3 text-sm text-indigo-600"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  )
}
