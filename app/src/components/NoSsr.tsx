import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

type Props = {
  children?: ReactNode
}

const NoSsr = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return <>{mounted ? children : null}</>
}

export default NoSsr
