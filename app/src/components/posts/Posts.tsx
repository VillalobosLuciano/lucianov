import { useState, useEffect } from 'react'
import PostPreview from '@/components/posts/PostPreview'
import { Container } from '@/components/Container'

import Search from '@/components/ui/Search'
import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import SectionSeparator from '../ui/SectionSeparator'

export default function Posts({ posts }: any) {
  const [searchInput, setSearchInput] = useState('')
  const [postsList, setPostsList] = useState(posts)
  const [selected, setSelected] = useState('All')

  const router = useRouter()

  const tagsTitle = posts.map((post: any) =>
    post.categories.map((tag: any) => tag.title)
  )
  const tags = Array.from(new Set(tagsTitle.flat()))
  tags.unshift('All')

  const handleSearch = (e: any) => {
    setSearchInput(e.target.value)
    if (e.target.value === '') {
      setPostsList(posts)
    } else {
      setPostsList(
        posts.filter((post: any) =>
          Object.values(post)
            .join('')
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
      )
    }
  }

  const normalizeQueryTags = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  useEffect(() => {
    if (router.query.tag) {
      setSelected(normalizeQueryTags(router.query.tag as string))
    } else {
      setSelected('All')
    }
  }, [router.query.tag])

  useEffect(() => {
    if (selected === 'All') {
      setPostsList(posts)
    } else {
      setPostsList(
        posts.filter((post: any) =>
          post.categories.map((tag: any) => tag.title).includes(selected)
        )
      )
    }
  }, [selected, posts])

  return (
    <Container className="pt-14 pb-20 md:py-20">
      <div className="max-w-2xl px-2 pb-4 font-display lg:mx-0">
        <h2 className="text-3xl font-medium tracking-tighter text-amber-500">
          Posts
        </h2>
        <p className="mt-4 text-lg leading-normal tracking-tight text-zinc-400">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC.
        </p>
      </div>
      <div className="mt-8 mb-6 items-center gap-x-4 px-2 md:flex">
        <Search handleSearch={handleSearch} searchInput={searchInput} />
        <Listbox
          as="div"
          className="mt-4 w-full md:mt-0 md:w-60"
          value={selected}
          onChange={setSelected}
        >
          <Listbox.Label className="sr-only">Theme</Listbox.Label>
          <Listbox.Button className="relative w-full cursor-default rounded-md border border-amber-500/30 bg-zinc-800/10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-6 w-6 text-amber-500/90"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="mt-2 w-full rounded-lg border border-amber-500/30 bg-zinc-800 text-zinc-300 md:absolute md:w-60">
            {tags.map((tag: any) => (
              <Listbox.Option
                key={tag}
                value={tag}
                className={clsx(
                  'cursor-pointer py-2 pl-3 pr-10 text-left text-sm transition-colors hover:bg-amber-500/5 hover:text-zinc-100',
                  tag === selected &&
                    'bg-amber-500/20 text-amber-500 hover:bg-amber-500/20 hover:text-amber-500'
                )}
              >
                {tag}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      <SectionSeparator mt={0} mb={4} />
      <div className="grid grid-cols-1 space-y-10 divide-y divide-teal-600/10 dark:divide-amber-500/10">
        {postsList.length ? (
          postsList.map((post: any) => (
            <PostPreview
              key={post.slug}
              title={post.title}
              date={post.date}
              slug={post.slug}
              excerpt={post.excerpt}
              categories={post.categories}
            />
          ))
        ) : (
          <div className="px-2 text-zinc-400">No posts yet</div>
        )}
      </div>
    </Container>
  )
}
