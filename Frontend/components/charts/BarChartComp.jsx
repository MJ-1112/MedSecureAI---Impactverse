'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
export default function BarChartComp({data}){
  return (
    <div style={{width:'100%',height:240}}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis dataKey='name'/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey='value' fill='#16a34a'/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
