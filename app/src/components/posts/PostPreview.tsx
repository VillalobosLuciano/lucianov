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
  const [_, setTag] = useState('')
  const router = useRouter()

  const handleTagChange = (e: any) => {
    e.preventDefault()
    const tagName = e.target.innerText.toLowerCase()
    setTag(tagName)
    router.push({
      pathname: '/posts',
      query: { tag: tagName },
    })
  }

  return (
    <div className="px-4 pt-8 font-display md:pr-20 xl:grid xl:grid-cols-4 xl:items-baseline">
      <time className="text-sm text-zinc-400 dark:text-zinc-300/80 md:text-base">
        {format(parseISO(date), 'MMMM dd, yyyy')}
      </time>

      <div className="xl:col-span-3">
        <h3 className="mt-1 text-xl font-medium leading-8 tracking-tight md:text-2xl">
          <Link href={`/posts/${slug}`}>
            <a className="capitalize text-teal-600/90 transition-colors duration-300 hover:text-teal-600 dark:text-amber-500 dark:hover:text-amber-500/90">
              {title}
            </a>
          </Link>
        </h3>
        <div className="flex flex-wrap">
          {categories?.map((tag: any) => (
            <p
              onClick={handleTagChange}
              key={tag._id}
              className="mt-3 mr-3 cursor-pointer rounded border border-amber-500/20 bg-amber-400/10 px-1.5 text-sm font-medium text-zinc-500/90 transition first-letter:uppercase hover:text-zinc-500 dark:text-zinc-200 dark:hover:text-zinc-200/90"
            >
              {tag.title}
            </p>
          ))}
        </div>
        <div className="mt-4 max-w-none text-zinc-400 line-clamp-4">
          {excerpt}
        </div>
      </div>
    </div>
  )
}
