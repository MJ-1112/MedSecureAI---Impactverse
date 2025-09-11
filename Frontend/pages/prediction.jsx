import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const LineDemand = dynamic(()=>import('@/components/charts/PredictionLine'), { ssr: false })

export async function getServerSideProps(){
  const filePath = path.join(process.cwd(), 'data', 'prediction.json')
  const payload = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  // Build simple line data mock (index as x)
  const line = payload.forecast.map((f,i)=>({ idx: i+1, value: f.predicted_demand, label: f.medicine }))
  return { props: { payload, line } }
}

export default function Prediction({ payload, line }){
  return (
    <main className="pt-28 px-6 max-w-7xl mx-auto">
      <motion.h1 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{duration:0.6}} className="text-4xl font-extrabold mb-6">Medicine Prediction</motion.h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-3">How it Works</h2>
          <p className="text-gray-700 dark:text-gray-300">We fuse clinic logs, weather & seasonal signals, soil & occupation risks, and local news to predict demand spikes—giving health officers a 2–4 week head start.</p>
          <ul className="list-disc pl-6 mt-3 text-gray-700 dark:text-gray-300">
            <li>Features: rainfall, temp anomaly, soil/occupation indices, outbreak keywords.</li>
            <li>Models: Gradient Boosting baseline → LSTM/Temporal Fusion Transformer later.</li>
            <li>Targets: SKUs per block per week.</li>
          </ul>
        </div>
        <div className="card">
          <h2 className="text-2xl font-semibold mb-3">Forecast Snapshot</h2>
          <LineDemand data={line}/>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {payload.forecast.map((f)=> (
          <div key={f.medicine} className="card">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{f.medicine}</h3>
              <span className="badge">{f.risk} Risk</span>
            </div>
            <p className="mt-3 text-gray-700 dark:text-gray-300">Predicted demand: <span className="font-semibold">{f.predicted_demand}</span></p>
            <p className="text-sm text-gray-500 mt-1">Date: {f.date}</p>
          </div>
        ))}
      </div>

      <div className="card mt-6">
        <h3 className="text-xl font-semibold mb-2">Alerts</h3>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
          {payload.alerts.map((a,i)=> <li key={i}>{a}</li>)}
        </ul>
      </div>
    </main>
  )
}
