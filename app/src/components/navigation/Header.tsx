import Link from 'next/link'
import { Popover } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import ThemeSelector from '../ThemeSelector'
import useMediaQuery from '../../hooks/useMediaQuery'
import SectionSeparator from '../ui/SectionSeparator'
import { useToggleContext } from '@/hooks/useToggle'

function MenuIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronUpIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileNavLink({ children, href, ...props }: any) {
  const router = useRouter()
  const isActive = router.pathname === href
  return (
    <Popover.Button
      as="button"
      onClick={() => router.push(href)}
      className={clsx(
        'block w-full py-2 text-start text-sm font-semibold capitalize tracking-wide',
        {
          'text-teal-600/90 dark:text-amber-500/80': isActive,
          'text-zinc-500/90 dark:text-zinc-300': !isActive,
        }
      )}
      {...props}
    >
      {children}
    </Popover.Button>
  )
}

type Navigation = {
  label: string
  pathname: string
}

export function Header({ navigation }: { navigation: Navigation[] }) {
  const lgQuery = useMediaQuery(1024)
  const { toggle, setToggle } = useToggleContext()

  return (
    <header className="bg-[#19191a] lg:bg-zinc-900/80 lg:backdrop-blur-lg">
      <nav className="relative z-50 mx-auto flex w-full max-w-7xl items-center justify-between py-2 md:py-4 lg:px-2">
        <Link href="/" aria-label="Home">
          <a className="mt-1 ml-1 lg:ml-0">
            <Logo className="relative z-50 ml-5 h-7 w-12 md:ml-1" />
          </a>
        </Link>

        <div className="hidden lg:flex lg:space-x-6">
          <NavLinks navigation={navigation} />
        </div>
        <div className="mr-2 flex items-center gap-6 md:mr-0">
          <Popover className="lg:hidden">
            {({ open }) => (
              <>
                <Popover.Button
                  onClick={() => setToggle(open)}
                  className="relative z-10 mr-2 mt-1 inline-flex items-center stroke-zinc-400 p-1 [&:not(:focus-visible)]:focus:outline-none"
                  aria-label="Toggle site navigation"
                >
                  {({ open }) =>
                    open ? (
                      <ChevronUpIcon className="h-6 w-6" />
                    ) : (
                      <MenuIcon className="h-6 w-6" />
                    )
                  }
                </Popover.Button>
                <AnimatePresence initial={false}>
                  {open && (
                    <>
                      <Popover.Overlay
                        static
                        as={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-0 bg-zinc-900/60 backdrop-blur-sm"
                      />
                      <Popover.Panel
                        static
                        as={motion.div}
                        initial={{ opacity: 0, y: -32 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          y: -32,
                          transition: { duration: 0.2 },
                        }}
                        className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl border-b border-amber-500/30 bg-zinc-900 px-6 pb-12 pt-28 shadow-2xl shadow-amber-500/20"
                      >
                        <div className="space-y-4">
                          {navigation.map(({ label, pathname }) => (
                            <MobileNavLink key={label} href={pathname}>
                              {label}
                            </MobileNavLink>
                          ))}
                        </div>
                      </Popover.Panel>
                    </>
                  )}
                </AnimatePresence>
              </>
            )}
          </Popover>

          <div
            className={clsx('mr-1 text-zinc-400 md:mr-0', {
              '': lgQuery,
              'absolute right-14 mt-[2px]': !lgQuery,
            })}
          >
            <ThemeSelector />
          </div>
        </div>
      </nav>
      <SectionSeparator mt={0} mb={0} />
    </header>
  )
}
