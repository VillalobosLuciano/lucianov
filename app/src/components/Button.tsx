import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
  outline:
    'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors',
}

const variantStyles = {
  solid: {
    cyan: 'relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors',
    white:
      'bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70',
    gray: 'bg-zinc-800 text-white hover:bg-zinc-900 active:bg-zinc-800 active:text-white/80',
  },
  outline: {
    gray: 'border-zinc-300 text-zinc-700 hover:border-zinc-400 active:bg-zinc-100 active:text-zinc-700/80',
  },
}

interface Props {
  href: string
  variant?: 'solid' | 'outline'
  color?: 'cyan' | 'white' | 'gray'
  className?: string
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ href, variant = 'solid', color = 'cyan', className, children }, ref) => {
    const classes = clsx(baseStyles[variant], variantStyles[variant], className)
    return href ? (
      <Link href={href}>
        <a className={classes}>{children}</a>
      </Link>
    ) : (
      <button ref={ref} className={classes}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
