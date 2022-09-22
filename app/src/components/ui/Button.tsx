interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className="flex cursor-pointer items-center rounded-md border border-teal-600/20 p-2 text-zinc-500 transition duration-300 hover:text-zinc-400 dark:border-amber-500/20 dark:text-zinc-300/90 dark:hover:text-zinc-300"
    >
      {children}
    </a>
  )
}
