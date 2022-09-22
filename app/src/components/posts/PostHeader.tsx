import { parseISO, format } from 'date-fns'
import SanityImage from '../SanityImage'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
      <div className="flex border-b border-white/10 md:border-none">
        <div className="mx-auto flex w-full max-w-7xl items-center px-6">
          <button
            className="my-4 w-fit text-sm transition-colors dark:text-zinc-500 dark:hover:text-zinc-50 md:mt-5"
            onClick={() => router.back()}
          >
            ← Back to Blog
          </button>
        </div>
      </div>
      <div className="mb-10 flex w-full flex-col space-y-5 border-b-[1px] border-white/10 bg-gradient-to-br from-zinc-900 via-orange-500/[.03] to-amber-500/[.03] pb-14 md:mb-14 md:bg-gradient-to-b md:pb-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col px-6">
          <div className="mt-4 mb-5 flex h-28 w-fit flex-col justify-between gap-x-4 md:mt-12 md:h-auto md:flex-row-reverse md:items-center md:justify-start">
            <time
              className="text-sm text-zinc-500 dark:text-zinc-500"
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
