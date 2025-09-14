"use client"
import React, { useState } from "react"

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirm: "",
    region: "",
    role: "chemist"
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  function validate() {
    if (!form.email || !form.name || !form.phone || !form.password || !form.confirm || !form.region) {
      setError("All fields are required")
      return false
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  async function handle(e) {
    e.preventDefault()
    setError("")
    setSuccess("")
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Signup failed")
      setSuccess("Signup successful 🎉 You can now log in.")
      setForm({ email:"", name:"", phone:"", password:"", confirm:"", region:"", role:"chemist" })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>
        
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center mb-2">{success}</p>}

        <form onSubmit={handle} className="space-y-4">
          <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full border rounded-lg px-3 py-2"/>
          <input placeholder="Name" type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border rounded-lg px-3 py-2"/>
          <input placeholder="Phone" type="text" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full border rounded-lg px-3 py-2"/>
          
          <select value={form.region} onChange={e=>setForm({...form,region:e.target.value})} className="w-full border rounded-lg px-3 py-2">
            <option value="">Select Region</option>
            <option>North India</option>
            <option>South India</option>
            <option>East India</option>
            <option>West India</option>
            <option>Central India</option>
            <option>North-East India</option>
          </select>

          <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="w-full border rounded-lg px-3 py-2">
            <option value="chemist">Chemist</option>
            <option value="supplier">Supplier</option>
          </select>

          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full border rounded-lg px-3 py-2"/>
          <input placeholder="Confirm Password" type="password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} className="w-full border rounded-lg px-3 py-2"/>

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-lg">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  )
}
