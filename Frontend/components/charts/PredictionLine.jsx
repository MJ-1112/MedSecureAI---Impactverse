'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function PredictionLine({ data }){
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="idx" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#16a34a" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
