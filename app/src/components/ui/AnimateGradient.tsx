import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export default function AnimateGradient() {
  let interval = useMotionValue(0)
  let y = useTransform(interval, (value) => Math.sin(value) * 100)
  let x = useTransform(interval, (value) => Math.cos(value) * 100)

  useEffect(() => {
    let controls = animate(interval, [0, Math.PI * 2], {
      repeat: Infinity,
      duration: 15,
      ease: 'linear',
    })

    return controls.stop
  }, [interval])

  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden">
      <motion.div
        style={{
          x,
          y,
          scale: 1.75,
          backgroundColor: '#322840',
          backgroundImage: `
            radial-gradient(at 21% 33%, #1f2460 0px, transparent 50%),
            radial-gradient(at 79% 32%, #2d1e51 0px, transparent 50%),
            radial-gradient(at 26% 83%, #0f2451 0px, transparent 50%)`,
        }}
        className="absolute inset-0"
      ></motion.div>
    </div>
  )
}
