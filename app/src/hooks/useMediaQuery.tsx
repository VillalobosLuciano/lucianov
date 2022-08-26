import { useCallback, useState, useEffect } from 'react'

export const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false)

  const handleResize = useCallback(() => {
    if (window.innerWidth > width) {
      setTargetReached(true)
    } else {
      setTargetReached(false)
    }
  }, [width])

  useEffect(() => {
    handleResize()
  }, [handleResize])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])
  return targetReached
}

export default useMediaQuery
