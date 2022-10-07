import { parseISO, format } from 'date-fns'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/solid'

export default function PostHeader({
  title,
  dateString,
  logo,
  name,
  category,
}: any) {
  const [_, setCategory] = useState('')

  const handleTagChange = (e: any) => {
    e.preventDefault()
    const categoryName: string = e.target.innerText
    setCategory(categoryName)
    router.push({
      pathname: '/posts',
      query: { title: categoryName },
    })
  }

  const router = useRouter()
  if (!dateString) return null
  const date = parseISO(dateString)
  return (
    <>
      <div className="mt-14 flex border-b border-white/10 px-4 md:mt-16 md:border-none lg:px-0">
        <div className="mx-auto flex w-full max-w-7xl items-center lg:px-3">
          <button
            className="my-3 flex w-fit items-center text-sm transition-colors dark:text-zinc-400/80 dark:hover:text-zinc-50 md:mt-5"
            onClick={() => router.push('/projects')}
          >
            <ChevronLeftIcon className="mr-0.5 h-5 w-5 text-amber-400/40 lg:-ml-1.5" />
            Back to Blog
          </button>
        </div>
      </div>
      <div className="mb-10 flex w-full flex-col space-y-5 border-b-[1px] border-white/10 bg-gradient-to-br from-zinc-900 via-orange-500/[.03] to-amber-500/[.03] px-6 pb-14 md:mb-14 md:bg-gradient-to-b md:pb-24 lg:px-0">
        <div className="mx-auto flex w-full max-w-7xl flex-col lg:px-3">
          <div className="mt-4 mb-5 flex h-28 w-fit flex-col justify-between gap-x-4 md:mt-12 md:h-auto md:flex-row-reverse md:items-center md:justify-start">
            <time
              className="text-sm text-zinc-400/80 dark:text-zinc-400/80"
              dateTime={dateString}
            >
              {format(date, 'LLLL	d, yyyy')}
            </time>
            <button
              onClick={handleTagChange}
              className="w-fit rounded-md bg-gradient-to-r from-orange-500/25 to-amber-500/25 px-3 py-1 text-sm text-zinc-100 hover:text-white md:flex-row-reverse"
            >
              {category.title}
            </button>
          </div>
          <h1 className="font-sans text-3xl font-bold tracking-tight text-zinc-50 md:mr-28 md:text-7xl">
            {title}
          </h1>
        </div>
      </div>
    </>
  )
}
