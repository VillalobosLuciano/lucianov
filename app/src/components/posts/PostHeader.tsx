import { parseISO, format } from 'date-fns'
import SanityImage from '../SanityImage'

export default function PostHeader({ title, dateString, logo, name }: any) {
  if (!dateString) return null
  const date = parseISO(dateString)
  return (
    <div className="mt-16 flex flex-col space-y-5 md:mt-8 md:mb-14">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-200 md:text-5xl">
        {title}
      </h1>
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <div className="relative -ml-2 h-8 w-10">
            <SanityImage src={logo} alt={name} layout="fill" />
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">{name}</div>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <time
          className="flex text-sm text-zinc-500 dark:text-zinc-400"
          dateTime={dateString}
        >
          {format(date, 'LLLL	d, yyyy')}
        </time>
      </div>
      {/* <hr className="border-teal-600/30 dark:border-white/10" /> */}
    </div>
  )
}
