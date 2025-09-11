import { useEffect } from 'react'
import { useRouter } from 'next/router'
export default function Logout(){
  const r = useRouter()
  useEffect(()=>{
    // placeholder: redirect to login page of wireframe A
    setTimeout(()=> r.replace('/'), 1200)
  },[])
  return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className='card p-6 text-center'>
        <h2 className='text-xl font-bold'>You have been logged out</h2>
        <p className='text-gray-500 mt-2'>Redirecting to login...</p>
      </div>
    </div>
  )
}
