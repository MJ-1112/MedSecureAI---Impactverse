import Link from 'next/link'
import { Home, User, PackageSearch, Database, LogOut } from 'lucide-react'
import { useRouter } from 'next/router'

export default function Sidebar(){
  const router = useRouter()
  const items = [
    {href:'/profile', label:'Profile', icon: User},
    {href:'/dashboard', label:'Dashboard', icon: Home},
    {href:'/orders', label:'Orders', icon: PackageSearch},
    {href:'/meddata', label:'Med Data', icon: Database},
    {href:'/logout', label:'Logout', icon: LogOut},
  ]
  return (
    <aside className="w-64 hidden md:block fixed top-16 left-4 bottom-6">
      <nav className="flex flex-col gap-2">
        {items.map(it=>{
          const Active = it.icon
          const active = router.pathname === it.href
          return (
            <Link key={it.href} href={it.href} className={`flex items-center gap-3 p-3 rounded-lg ${active ? 'bg-green-50 dark:bg-gray-800 font-semibold text-green-600 dark:text-green-300' : 'text-gray-600 dark:text-gray-300 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 hover:text-white hover:text-white dark:bg-slate-800/5'}`}><Active size={18} />
                <span>{it.label}</span></Link>
          )
        })}
      </nav>
    </aside>
  )
}
