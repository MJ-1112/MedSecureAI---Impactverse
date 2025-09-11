import { useEffect, useState } from 'react'
import LineChartComp from '@/components/charts/LineChartComp'
import BarChartComp from '@/components/charts/BarChartComp'
import TiltCard from '@/components/TiltCard'
import { useToast } from '@/components/toastContext'

function Stat({label, value}){
  return (
    <TiltCard className='card p-4'>
      <div>
        <div className='text-sm text-gray-500'>{label}</div>
        <div className='text-2xl font-bold mt-2'>{value}</div>
      </div>
    </TiltCard>
  )
}

export default function Dashboard(){
  const [lastSynced,setLast] = useState(null)
  const [lineData,setLineData] = useState([
    {name:'Wk1', value:120},{name:'Wk2', value:180},{name:'Wk3', value:240},{name:'Wk4', value:300}
  ])
  const [barData,setBarData] = useState([{name:'Paracetamol',value:300},{name:'Amoxi',value:180},{name:'ORS',value:220}])
  const { pushToast } = useToast()

  useEffect(()=>{
    const iv = setInterval(()=>{
      // update data randomly
      setLineData(d=> [...d.slice(1), {name:'Wk'+(d.length+1), value: Math.max(50, Math.round((d[d.length-1].value||200)*(0.9+Math.random()*0.2)))}])
      setBarData(d=> d.map(it=> ({...it, value: Math.max(10, Math.round(it.value*(0.9+Math.random()*0.2)))})))
      const t = new Date().toLocaleTimeString()
      setLast(t)
      pushToast({title:'Dashboard Synced', body: 'Latest analytics refreshed'})
    }, 3000)
    return ()=> clearInterval(iv)
  }, [pushToast])

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Stat label='Total Orders (M)' value='152' />
        <Stat label='Active Stock' value='12,340' />
        <Stat label='Supply Efficiency' value='93%' />
      </div>

      <div className='grid md:grid-cols-2 gap-4'>
        <div className='card p-4'>
          <h3 className='font-semibold'>Orders Trend <span className='text-sm text-gray-400'>· Last synced: {lastSynced}</span></h3>
          <LineChartComp data={lineData} />
        </div>
        <div className='card p-4'>
          <h3 className='font-semibold'>Top Medicines</h3>
          <BarChartComp data={barData} />
        </div>
      </div>
    </div>
  )
}
