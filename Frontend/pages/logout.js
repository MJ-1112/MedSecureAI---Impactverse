"use client"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Logout() {
  const r = useRouter()
  useEffect(() => {
    // Redirect to login after 1.2s
    setTimeout(() => r.replace("/login"), 1200)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h2 className="text-xl font-bold">You have been logged out</h2>
        <p className="text-gray-500 mt-2">Redirecting to login...</p>
      </div>
    </div>
  )
}
