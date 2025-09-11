import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const BarMonthly = dynamic(()=>import('@/components/charts/DashboardBar'), { ssr: false })

export async function getServerSideProps(){
  const filePath = path.join(process.cwd(), 'data', 'dashboard.json')
  const payload = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  return { props: { payload } }
}

export default function Dashboard({ payload }){
  return (
    <main className="pt-28 px-6 max-w-7xl mx-auto">
      <motion.h1 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{duration:0.6}} className="text-4xl font-extrabold mb-6">Admin Dashboard</motion.h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="card"><p className="text-sm text-gray-500">Prediction Accuracy</p><p className="text-3xl font-bold">{payload.prediction_accuracy}%</p></div>
        <div className="card"><p className="text-sm text-gray-500">Blockchain Entries</p><p className="text-3xl font-bold">{payload.blockchain_entries}</p></div>
        <div className="card"><p className="text-sm text-gray-500">Counterfeit Cases</p><p className="text-3xl font-bold">{payload.counterfeit_cases_detected}</p></div>
        <div className="card"><p className="text-sm text-gray-500">Supply Chain Nodes</p><p className="text-3xl font-bold">{payload.supply_chain_nodes}</p></div>
      </div>

      <div className="card mt-6">
        <h3 className="text-xl font-semibold mb-3">Monthly Trend</h3>
        <BarMonthly data={payload.monthlyTrend}/>
      </div>
    </main>
  )
}
