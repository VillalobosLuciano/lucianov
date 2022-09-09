import clsx from 'clsx'

interface ContainerProps {
  className?: string
  children?: React.ReactNode
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={clsx('mx-auto max-w-5xl px-4', className)} {...props}>
      {children}
    </div>
  )
}
