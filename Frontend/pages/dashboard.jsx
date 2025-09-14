"use client"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null)
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  useEffect(() => {
    if (!token) return
    fetch("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => { setUser(data); setLoading(false) })
  }, [token])

  async function handleVerify() {
    if (!file) return alert("Upload a document first")
    const formData = new FormData()
    formData.append("doc", file)
    const res = await fetch("http://localhost:5000/api/verify", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })
    const data = await res.json()
    if(res.ok) setUser(data.user)
    alert(data.message)
  }

  if (loading) return <p>Loading...</p>

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Region: {user.region}</p>
      <p>Status: {user.verified ? "✅ Verified" : "❌ Not Verified"}</p>

      {!user.verified && (
        <div className="mt-4">
          <input type="file" onChange={e=>setFile(e.target.files[0])}/>
          <button onClick={handleVerify} className="px-4 py-2 bg-green-600 text-white rounded ml-2">Verify Identity</button>
        </div>
      )}
    </main>
  )
}
