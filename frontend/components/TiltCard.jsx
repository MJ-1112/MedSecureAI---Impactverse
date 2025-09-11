'use client'
import { motion, useMotionValue, useTransform } from 'framer-motion'
export default function TiltCard({children, className='', style={}}){
  const x = useMotionValue(0); const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50,50], [10,-10])
  const rotateY = useTransform(x, [-50,50], [-10,10])
  function handleMove(e){
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) - rect.width/2
    const py = (e.clientY - rect.top) - rect.height/2
    x.set(px); y.set(py)
  }
  function reset(){ x.set(0); y.set(0) }
  return (
    <motion.div onPointerMove={handleMove} onPointerLeave={reset} style={{rotateX, rotateY}} className={`${className}`}>
      {children}
    </motion.div>
  )
}
