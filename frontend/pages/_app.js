import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { ToastProvider } from '@/components/toastContext'

export default function App({ Component, pageProps }){
  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <ToastProvider>
        <div className='min-h-screen'>
          <Navbar />
          <div className='pt-16 md:pl-72'>
            <Sidebar />
            <main className='max-w-7xl mx-auto p-6'>
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}
