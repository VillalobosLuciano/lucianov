import { useTheme } from 'next-themes'
import NoSsr from '@/components/NoSsr'
import { SunIcon } from '@heroicons/react/solid'
import { MoonIcon } from '@heroicons/react/solid'

const ThemeSelector = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const Icon = isDark ? SunIcon : MoonIcon

  return (
    <NoSsr>
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="flex h-full w-full items-center justify-center"
      >
        <Icon className="z-10 h-5 w-5" />
      </button>
    </NoSsr>
  )
}

export default ThemeSelector
