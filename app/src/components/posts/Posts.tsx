import { useState, useEffect } from 'react'
import PostPreview from '@/components/posts/PostPreview'
import { Container } from '@/components/Container'

import Search from '@/components/ui/Search'
import { Listbox } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import SectionSeparator from '../ui/SectionSeparator'
import { motion } from 'framer-motion'

export default function Posts({ posts }: any) {
  const [searchInput, setSearchInput] = useState('')
  const [postsList, setPostsList] = useState(posts)
  const [selected, setSelected] = useState('All')
  // const [open, setOpen] = useState(false)

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
    <Container className="py-24">
      <div className="max-w-2xl pb-4">
        <h2 className="text-4xl font-semibold text-zinc-200">Posts</h2>
        <p className="mb-6 mt-4 text-lg leading-normal tracking-tight text-zinc-400">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC.
        </p>
      </div>
      <div className="mb-6 items-center gap-x-4 md:flex">
        <Search handleSearch={handleSearch} searchInput={searchInput} />
        <Listbox
          as="div"
          className="mt-4 w-full md:mt-0 md:w-32"
          value={selected}
          onChange={setSelected}
        >
          {({ open }) => (
            <>
              <Listbox.Label className="sr-only">Theme</Listbox.Label>
              <Listbox.Button className="relative w-full cursor-default rounded-md border border-amber-500/50 bg-zinc-800/10 py-2 pl-3 pr-10 text-left shadow-md focus:border-amber-500/50 sm:text-sm">
                <span className="block truncate">{selected}</span>
                <span className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2">
                  {open ? (
                    <ChevronUpIcon
                      className="h-6 w-6 text-amber-500/90"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronDownIcon
                      className="h-6 w-6 text-amber-500/90"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </Listbox.Button>
              <Listbox.Options className="mt-2 w-full rounded-lg border border-amber-500/50 bg-[#1a1a1c] text-zinc-300 md:absolute md:w-32">
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
            </>
          )}
        </Listbox>
      </div>
      <SectionSeparator mt={0} mb={4} />
      <div className="grid grid-cols-1 space-y-10 divide-y divide-teal-600/10 dark:divide-zinc-400/10">
        {postsList.length ? (
          postsList.map((post: any, i: number) => (
            <motion.div
              key={post._id}
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 + i * 0.1 }}
            >
              <PostPreview
                key={post.slug}
                title={post.title}
                date={post.date}
                slug={post.slug}
                excerpt={post.excerpt}
                categories={post.categories}
              />
            </motion.div>
          ))
        ) : (
          <div className="text-zinc-400">No posts yet</div>
        )}
      </div>
    </Container>
  )
}
