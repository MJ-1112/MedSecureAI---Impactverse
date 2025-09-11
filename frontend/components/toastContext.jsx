'use client'
import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ToastContext = createContext()

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])
  const [muted, setMuted] = useState(true) // default muted
  const idRef = useRef(1)

  useEffect(()=>{
    // expose for debugging
    window._pushToast = (t)=> pushToast(t)
  }, [])

  function pushToast({title, body}){
    const id = idRef.current++
    setToasts(prev=> [...prev, {id, title, body}])
    // audio ping if not muted
    if(!muted){
      try{
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        const o = ctx.createOscillator(); const g = ctx.createGain()
        o.type='sine'; o.frequency.value=880; g.gain.value=0.02; o.connect(g); g.connect(ctx.destination)
        o.start(); g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime+0.15); o.stop(ctx.currentTime+0.16)
      }catch(e){}
    }
    // auto remove after 5s
    setTimeout(()=> setToasts(prev=> prev.filter(t=> t.id!==id)), 5000)
  }

  function removeToast(id){
    setToasts(prev=> prev.filter(t=> t.id!==id))
  }

  function toggleMute(){ setMuted(m=> !m) }

  return (
    <ToastContext.Provider value={{toasts, pushToast, removeToast, muted, toggleMute}}>
      {children}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col-reverse gap-3 items-end">
        <AnimatePresence>
          {toasts.map(t=> (
            <motion.div key={t.id} initial={{opacity:0, x:30}} animate={{opacity:1, x:0}} exit={{opacity:0, x:30}} transition={{duration:0.25}} className="max-w-xs w-full">
              <div className="card flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <strong>{t.title}</strong>
                    <button onClick={()=> removeToast(t.id)} className="text-gray-400">✕</button>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t.body}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(){ return useContext(ToastContext) }
