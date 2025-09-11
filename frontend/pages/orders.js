import fs from 'fs'; import path from 'path'; import { useState, useEffect } from 'react'; import TiltCard from '@/components/TiltCard'; import { useToast } from '@/components/toastContext'

export async function getServerSideProps(){
  const rows = JSON.parse(fs.readFileSync(path.join(process.cwd(),'data','orders.json'),'utf-8'))
  return { props: { rows } }
}

export default function Orders({ rows }){
  const [data, setData] = useState(rows)
  const [last, setLast] = useState(null)
  const { pushToast } = useToast()
  const totalOrders = data.length;
  const delivered = data.filter(d=>d.status==='Delivered').length;
  const processing = data.filter(d=>d.status==='Processing').length;
  useEffect(()=>{
    const iv = setInterval(()=>{
      // randomly change a status
      setData(d=> {
        const copy = d.map(x=> ({...x}))
        const i = Math.floor(Math.random()*copy.length)
        const statuses = ['Pending','In-Transit','Delivered']
        copy[i].status = statuses[Math.floor(Math.random()*statuses.length)]
        return copy
      })
      const t = new Date().toLocaleTimeString(); setLast(t)
      pushToast({title:'Orders Synced', body:'Order statuses updated'})
    }, 3000)
    return ()=> clearInterval(iv)
  }, [pushToast])
  return (
    <div className='space-y-4'>
      <div className='card p-4'><h2 className='font-bold'>Blockchain Ledger - Orders <span className='text-sm text-gray-400'>· Last synced: {last}</span></h2></div>
      <div className='card p-4 overflow-x-auto'>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-4 rounded-lg shadow-sm bg-slate-800 text-white">
            <div className="text-sm text-gray-500">Total Orders</div>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </div>
          <div className="p-4 rounded-lg shadow-sm bg-slate-800 text-white">
            <div className="text-sm text-gray-500">Delivered</div>
            <div className="text-2xl font-bold">{delivered}</div>
          </div>
          <div className="p-4 rounded-lg shadow-sm bg-slate-800 text-white">
            <div className="text-sm text-gray-500">Processing</div>
            <div className="text-2xl font-bold">{processing}</div>
          </div>
        </div>
        <table className='w-full'>

          <thead><tr className='text-left text-sm text-gray-400'><th>Order</th><th>Medicine</th><th>Qty</th><th>Status</th><th>Hash</th><th>Location</th></tr></thead>
          <tbody className='text-white'>
            {data.map(r=> (
              <tr key={r.id} className='hover:bg-gray-50 dark:hover:bg-slate-800 text-white/5'>
                <td className='py-4 text-white' className='font-mono'>{r.id}</td>
                <td className='py-4 text-white'>{r.medicine}</td>
                <td className='py-4 text-white'>{r.qty}</td>
                <td className='py-4 text-white'>{r.status}</td>
                <td className='py-4 text-white' className='font-mono'>{r.hash}</td>
                <td className='py-4 text-white'>{r.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
