"use client"
import { useEffect, useState } from "react"

export default function MedData(){
  const [data, setData] = useState([])

  useEffect(()=>{
    fetch("http://localhost:5000/api/csv")
      .then(res=>res.json())
      .then(setData)
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Medicine Data</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Manufacturer</th>
            <th className="p-2 border">Batch</th>
            <th className="p-2 border">Expiry</th>
            <th className="p-2 border">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m,i)=>(
            <tr key={i}>
              <td className="border p-2">{m.name}</td>
              <td className="border p-2">{m.manufacturer}</td>
              <td className="border p-2">{m.batch}</td>
              <td className="border p-2">{m.expiry}</td>
              <td className="border p-2">₹{m.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
