import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import Underline from '@/components/icons/Underline'

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
              'relative cursor-pointer border-transparent px-4 py-1.5 font-display text-sm capitalize transition-colors delay-150 hover:delay-[0ms]',
              {
                'text-teal-600 dark:text-zinc-100': isActive,
                'text-zinc-400 transition-colors duration-200 hover:text-zinc-400/80 dark:text-zinc-300/90':
                  !isActive,
              }
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 rounded bg-zinc-800/40"
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
            <div className="relative z-10 flex w-full flex-col items-center capitalize">
              <span>{item.label}</span>
              <Underline
                className={clsx(
                  '-mt-1.5 h-4 w-full transition-opacity duration-500',
                  {
                    'opacity-100': isActive,
                    'opacity-0': !isActive,
                  }
                )}
              />
            </div>
          </div>
        )
      })}
    </>
  )
}
