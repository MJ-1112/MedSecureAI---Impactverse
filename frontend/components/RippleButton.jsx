'use client'
import { useRef } from 'react'

export default function RippleButton({children, className='', onClick, ...props}){
  const ref = useRef(null)
  function handleClick(e){
    const el = ref.current; const rect = el.getBoundingClientRect()
    const circle = document.createElement('span')
    const size = Math.max(rect.width, rect.height)
    circle.style.width = circle.style.height = size + 'px'
    circle.style.left = (e.clientX - rect.left) + 'px'
    circle.style.top = (e.clientY - rect.top) + 'px'
    circle.className = 'ripple-circle bg-green-500/30'
    el.appendChild(circle)
    setTimeout(()=> circle.remove(), 600)
    if(onClick) onClick(e)
  }
  return (
    <button ref={ref} onClick={handleClick} className={`ripple ${className}`} {...props}>{children}</button>
  )
}
