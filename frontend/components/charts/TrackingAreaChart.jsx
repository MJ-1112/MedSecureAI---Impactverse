'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TrackingAreaChart({ data }){
  // Convert to array suitable for recharts (status on x)
  const arr = data.map(d => ({ name: d.status, count: d.count }));
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <AreaChart data={arr}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="count" fill="#22c55e" stroke="#16a34a" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
