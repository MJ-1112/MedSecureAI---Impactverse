import Image from 'next/image'
import { Sun, Moon, Bell } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useToast } from './toastContext'

export default function Navbar(){ 
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { muted, toggleMute } = useToast()
  useEffect(()=> setMounted(true), [])
  return (
    <header className="w-full bg-white dark:bg-slate-800 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 fixed z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 hover:scale-105 transition">
            <Image src="/images/logo.svg" alt="logo" width={140} height={35} priority/>
          </Link>
          <div className="hidden md:block text-gray-600 dark:text-gray-300">MedSecureAI Portal</div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md nav-link" onClick={()=> toggleMute()} title="Toggle sound">
            <Bell size={18} className="text-gray-700 dark:text-gray-200"/>
          </button>
          {mounted && (
            <button className="p-2 rounded-md nav-link" onClick={()=> setTheme(resolvedTheme==='dark'?'light':'dark')}>
              {resolvedTheme==='dark'? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
