import { parseISO, format } from 'date-fns'
import SanityImage from '../SanityImage'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

export default function PostHeader({
  title,
  dateString,
  logo,
  name,
  category,
}: any) {
  const router = useRouter()
  if (!dateString) return null
  const date = parseISO(dateString)
  return (
    <>
      <div className="flex border-b border-white/10 md:border-none">
        <div className="mx-auto flex w-full max-w-7xl items-center px-6">
          <button
            className="my-4 w-fit text-sm transition-colors dark:text-zinc-400/90 dark:hover:text-zinc-50 md:mt-5"
            onClick={() => router.back()}
          >
            ← Back to Blog
          </button>
        </div>
      </div>
      <div className="mb-10 flex w-full flex-col space-y-5 border-b-[1px] border-white/10 bg-gradient-to-br from-zinc-900 via-orange-500/[.15] to-amber-500/[.15] pb-14 md:mb-14 md:bg-gradient-to-b md:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mt-4 mb-5 flex h-28 w-fit flex-col justify-between gap-x-4 md:mt-12 md:h-auto md:flex-row-reverse md:items-center md:justify-start">
            <time
              className="text-sm text-zinc-500 dark:text-zinc-400/90 md:pt-0.5"
              dateTime={dateString}
            >
              {format(date, 'LLLL	d, yyyy')}
            </time>
            <button className="w-fit rounded-full bg-gradient-to-r from-yellow-600/20 to-amber-500/50 px-4 py-1 text-sm text-zinc-50 md:flex-row-reverse">
              {category.title}
            </button>
          </div>
          <h1 className="font-sans text-3xl font-bold tracking-tight text-zinc-50 md:text-7xl">
            {title}
          </h1>
          {/* <div className="flex flex-row items-center space-x-3">
            <div className="flex items-center">
              <div className="relative -ml-2 h-8 w-10">
                <SanityImage src={logo} alt={name} layout="fill" />
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {name}
              </div>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <time
              className="flex text-sm text-zinc-500 dark:text-zinc-400"
              dateTime={dateString}
            >
              {format(date, 'LLLL	d, yyyy')}
            </time>
          </div> */}
        </div>
      </div>
    </>
  )
}
