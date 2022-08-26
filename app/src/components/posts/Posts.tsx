import { useState, useEffect } from 'react'
import PostPreview from '@/components/posts/PostPreview'
import { Container } from '@/components/Container'

import Search from '@/components/ui/Search'
import { Listbox } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { useRouter } from 'next/router'

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
    <Container className="pt-20 pb-16">
      <div className="mt-2 mb-4 flex">
        <Search handleSearch={handleSearch} searchInput={searchInput} />
        <Listbox as="div" value={selected} onChange={setSelected}>
          <Listbox.Label className="sr-only">Theme</Listbox.Label>
          <Listbox.Button className="relative w-72 cursor-default rounded-lg bg-zinc-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-zinc-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute rounded-lg bg-zinc-800 shadow-md">
            {tags.map((tag: any) => (
              <Listbox.Option
                key={tag}
                value={tag}
                className={clsx(
                  'py-2 pl-3 pr-10 text-left',
                  tag === selected && 'bg-zinc-200'
                )}
              >
                {tag}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>

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
          <div className="text-center">No Posts Yet</div>
        )}
      </div>
    </Container>
  )
}
