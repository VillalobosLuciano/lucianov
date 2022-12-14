import Link from 'next/link'
import { parseISO, format } from 'date-fns'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function PostPreview({
  title,
  date,
  excerpt,
  slug,
  categories,
}: any) {
  const [_, setCategory] = useState('')
  const router = useRouter()

  const handleTagChange = (e: any) => {
    e.preventDefault()
    const categoryName: string = e.target.innerText
    setCategory(categoryName)
    router.push({
      pathname: '/posts',
      query: { title: categoryName },
    })
  }

  return (
    <div className="w-full rounded-md border border-white/5 bg-zinc-800/5 px-4 py-5 lg:rounded-xl lg:p-8">
      <div className="mb-1 mt-[1px] flex flex-row items-center justify-between gap-x-4 md:mb-1 md:gap-0 lg:mt-0">
        <time className="text-xs text-zinc-400/80 md:text-base">
          {format(parseISO(date), 'MMMM dd, yyyy')}
        </time>
        <div className="-mt-1 w-fit lg:mt-0">
          {categories?.map((tag: any) => (
            <p
              onClick={handleTagChange}
              key={tag._id}
              className="cursor-pointer rounded border border-amber-300/10 bg-amber-400/[0.02] py-1 px-1.5 font-display text-xs font-medium text-zinc-400/80 transition first-letter:uppercase hover:text-zinc-400/80 dark:text-zinc-400/80 dark:hover:border-amber-400/30 dark:hover:text-zinc-200 md:px-3 md:py-1 md:text-sm lg:rounded-md"
            >
              {tag.title}
            </p>
          ))}
        </div>
      </div>
      <div className="max-w-2xl">
        <h3 className="text-xl font-semibold md:text-3xl">
          <Link href={`/posts/${slug}`}>
            <a className="capitalize text-teal-600/90 transition-colors duration-300 hover:text-teal-600 dark:text-zinc-300 dark:hover:text-zinc-50">
              {title}
            </a>
          </Link>
        </h3>
      </div>
    </div>
  )
}
