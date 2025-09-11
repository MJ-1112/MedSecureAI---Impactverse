'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function LineChartComp({data}){
  return (
    <div style={{width:'100%', height:240}}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis dataKey='name'/>
          <YAxis/>
          <Tooltip/>
          <Line type='monotone' dataKey='value' stroke='#16a34a' strokeWidth={3} dot={{r:3}}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
