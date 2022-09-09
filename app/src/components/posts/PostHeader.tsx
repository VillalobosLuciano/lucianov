import { parseISO, format } from 'date-fns'
import SanityImage from '../SanityImage'

export default function PostHeader({ title, dateString, logo, name }: any) {
  if (!dateString) return null
  const date = parseISO(dateString)
  return (
    <>
      <div className="mt-16 mb-2 space-y-3 md:mt-8">
        <h1 className="md:leading-11 max-w-4xl pt-1  font-semibold capitalize leading-9 tracking-tight text-zinc-600 dark:text-zinc-300 sm:text-4xl sm:leading-10 md:text-5xl">
          {title}
        </h1>
        <div className="flex items-center space-x-3 py-4">
          <div className="flex items-center">
            <div className="relative h-8 w-10">
              <SanityImage src={logo} alt={name} layout="fill" />
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-300">
              {name}
            </div>
          </div>
          <div className="h-4 w-px bg-zinc-300/30"></div>
          <time
            className="flex text-sm text-zinc-500 dark:text-zinc-300"
            dateTime={dateString}
          >
            {format(date, 'LLLL	d, yyyy')}
          </time>
        </div>
      </div>
      <hr className="border-teal-600/30 dark:border-amber-500/10 lg:mb-10" />
    </>
  )
}
