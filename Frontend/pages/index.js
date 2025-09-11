import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('./dashboard').then(m => m.default || m), { ssr: false });

export default function Home() {
  return (
    <>
      <Dashboard />
    </>
  );
}
