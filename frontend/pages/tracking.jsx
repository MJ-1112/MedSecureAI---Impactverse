import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const AreaChart = dynamic(() => import('@/components/charts/TrackingAreaChart'), { ssr: false })

export async function getServerSideProps(){
  const filePath = path.join(process.cwd(), 'data', 'tracking.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  const rows = JSON.parse(raw)
  const statusCount = rows.reduce((acc, r)=>{
    acc[r.status] = (acc[r.status]||0)+1; return acc
  }, {})
  const chartData = Object.keys(statusCount).map(k => ({ status: k, count: statusCount[k] }))
  return { props: { rows, chartData } }
}

export default function Tracking({ rows, chartData }){
  return (
    <main className="pt-28 px-6 max-w-7xl mx-auto">
      <motion.h1 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{duration:0.6}} className="text-4xl font-extrabold mb-6">IoT & Blockchain Tracking</motion.h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-3">Why Tracking?</h2>
          <p className="text-gray-700 dark:text-gray-300">Every batch is signed on-chain and condition-verified via IoT sensors (temp, humidity, GPS). This creates an immutable audit trail that blocks diversion and counterfeiting.</p>
        </div>
        <div className="card">
          <h2 className="text-2xl font-semibold mb-3">Ledger Snapshot</h2>
          <AreaChart data={chartData}/>
        </div>
      </div>

      <div className="card mt-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-3">Tracked Batches</h3>
        <table>
          <thead><tr><th>Batch</th><th>Medicine</th><th>Status</th><th>Location</th><th>Time</th><th>Tx Hash</th></tr></thead>
          <tbody>
            {rows.map((r)=> (
              <tr key={r.batchId} className="hover:bg-gray-50/60 dark:hover:bg-white/5">
                <td className="font-mono">{r.batchId}</td>
                <td>{r.medicine}</td>
                <td>{r.status}</td>
                <td>{r.location}</td>
                <td>{r.timestamp}</td>
                <td className="font-mono">{r.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
