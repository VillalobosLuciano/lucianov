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
    <div className="w-full rounded-xl border border-white/10 p-4 lg:p-8">
      <div className="mb-2 flex flex-row items-center gap-x-4 md:mb-1 md:justify-between md:gap-0">
        <time className="text-sm text-zinc-500 md:text-base">
          {format(parseISO(date), 'MMMM dd, yyyy')}
        </time>
        <div className="order-first w-fit md:order-none">
          {categories?.map((tag: any) => (
            <p
              onClick={handleTagChange}
              key={tag._id}
              className="cursor-pointer rounded-md border border-amber-500/30 px-2 py-1 text-xs font-medium text-zinc-500 transition first-letter:uppercase hover:text-zinc-500 dark:text-zinc-400 dark:hover:border-amber-500/60 dark:hover:text-zinc-200 md:py-0 md:text-sm"
            >
              {tag.title}
            </p>
          ))}
        </div>
      </div>
      <div className="max-w-2xl">
        <h3 className="text-2xl font-semibold md:text-3xl">
          <Link href={`/posts/${slug}`}>
            <a className="capitalize text-teal-600/90 transition-colors duration-300 hover:text-teal-600 dark:text-zinc-300 dark:hover:text-zinc-50">
              {title}
            </a>
          </Link>
        </h3>

        <div className="mt-4 text-zinc-400 line-clamp-2">{excerpt}</div>
      </div>
    </div>
  )
}
