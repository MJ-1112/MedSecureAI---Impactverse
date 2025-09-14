"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const r = useRouter()

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null

  // ✅ Fetch profile when token exists
  useEffect(() => {
    if (!token) {
      r.replace("/login")
      return
    }
    fetch("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Profile fetch error:", err)
        setLoading(false)
      })
  }, [token])

  // ✅ Upload verification document
  const handleVerify = async () => {
    if (!file) return alert("Please select a file first")
    const formData = new FormData()
    formData.append("document", file)

    try {
      const res = await fetch("http://localhost:5000/api/verify", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        alert("✅ Document uploaded: " + data.url)
      } else {
        alert("❌ " + data.message)
      }
    } catch (err) {
      console.error("Verify error:", err)
      alert("Upload failed")
    }
  }

  // ✅ Logout clears token & role
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    r.push("/logout")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Profile */}
        {loading ? (
          <p>Loading profile...</p>
        ) : profile ? (
          <div className="space-y-2">
            <p>
              <b>Name:</b> {profile.name}
            </p>
            <p>
              <b>Email:</b> {profile.email}
            </p>
            <p>
              <b>Role:</b>{profile.role}
              {role ? role.charAt(0).toUpperCase() + role.slice(1) : profile.role}
            </p>
          </div>
        ) : (
          <p className="text-red-500">⚠️ Failed to load profile</p>
        )}

        {/* Verification */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Verification</h2>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleVerify}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Upload to IPFS
          </button>
        </div>
      </div>
    </div>
  )
}
