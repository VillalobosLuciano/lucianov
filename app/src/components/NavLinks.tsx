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
              'relative cursor-pointer rounded border-transparent px-4 py-1.5 text-sm font-semibold tracking-wide transition-colors delay-150 hover:delay-[0ms]',
              {
                'text-teal-600" border border-teal-600/30 dark:border-amber-500/30 dark:text-amber-500':
                  isActive,
                'dark:hover:text-zinc-200" border  border-zinc-800 text-zinc-500/90 hover:text-zinc-500 dark:text-zinc-300':
                  !isActive,
              }
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 rounded bg-amber-500/5"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
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
