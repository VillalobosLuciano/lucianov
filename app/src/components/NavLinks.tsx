import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import clsx from 'clsx'

type Navigation = {
  label: string
  pathname: string
}

export function NavLinks({ navigation }: { navigation: Navigation[] }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const router = useRouter()

  return (
    <>
      {navigation.map((item, index) => {
        const isActive = router.pathname === item.pathname
        return (
          <div
            onClick={() => router.push(item.pathname)}
            key={item.pathname}
            className={clsx(
              'relative cursor-pointer rounded-md px-4 py-1 font-display text-base capitalize tracking-tight transition-colors delay-150',
              {
                'bg-amber-400/[0.04] dark:text-zinc-300': isActive,
                'text-zinc-500 transition-colors duration-200 hover:text-zinc-400/80 dark:text-zinc-500':
                  !isActive,
              }
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 rounded-md bg-amber-400/[0.01]"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.1 },
                  }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10 capitalize">{item.label}</span>
          </div>
        )
      })}
    </>
  )
}
