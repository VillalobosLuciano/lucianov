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

interface Category {
  title: string
  description: string
}

export default function Posts({ posts }: any) {
  const allPosts: Category = {
    description: 'hagale pues',
    title: 'All Posts',
  }
  const [searchInput, setSearchInput] = useState('')
  const [postsList, setPostsList] = useState(posts)
  const [selected, setSelected] = useState(allPosts)

  const router = useRouter()

  const categoriesFromSanity = posts.map((post: any) =>
    post.categories.map((cat: Category) => ({
      description: cat.description,
      title: cat.title,
    }))
  )

  const categories = Array.from(new Set(categoriesFromSanity.flat()))
  categories.unshift(allPosts)

  const filteredCategories = categories.filter((value, index) => {
    const _value = JSON.stringify(value)
    return (
      index ===
      categories.findIndex((obj) => {
        return JSON.stringify(obj) === _value
      })
    )
  })

  // const tagsTitle = posts.map((post: any) =>
  //   post.categories.map((tag: any) => tag.title)
  // )
  // const tags = Array.from(new Set(tagsTitle.flat()))
  // tags.unshift('All Posts')

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

  const handleSelected = (cat: any) => {
    router.push('/posts')
    setSelected(cat)
  }

  // const normalizeQueryTags = (str: string) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  // }

  useEffect(() => {
    if (router.query.title) {
      const matchCategory = filteredCategories.filter((obj: any) => {
        return obj.title === router.query.title
      })
      matchCategory.map((cat: any) =>
        setSelected({
          title: cat.title,
          description: cat.description,
        })
      )
    }
  }, [router.query.title])

  useEffect(() => {
    if (selected.title === allPosts.title) {
      setPostsList(posts)
    } else {
      setPostsList(
        posts.filter((post: any) =>
          post.categories.map((cat: any) => cat.title).includes(selected.title)
        )
      )
    }
  }, [selected, posts, allPosts.title])

  return (
    <div className="mx-auto my-12 flex max-w-7xl flex-col px-4 lg:flex-row">
      <div className="mb-6 flex w-full flex-col self-start lg:sticky lg:top-12 lg:max-w-[300px]">
        <Search handleSearch={handleSearch} searchInput={searchInput} />
        <div className="mt-6 flex w-full cursor-pointer flex-col gap-y-2">
          {filteredCategories &&
            filteredCategories.map((cat: any, i: number) => (
              <div
                onClick={() => handleSelected(cat)}
                className={clsx(
                  'cursor-pointer rounded-md border border-transparent px-4 py-3 text-zinc-500 transition-colors duration-300 hover:text-zinc-300',
                  {
                    'border border-white/5 bg-zinc-800/40 dark:text-zinc-300':
                      cat.title === selected.title,
                    'hover:bg-zinc-700/5': cat.title !== selected.title,
                  }
                )}
                key={i}
              >
                {cat.title}
              </div>
            ))}
        </div>
        {/* <Listbox
          as="div"
          className="mt-4 w-full md:mt-0 md:hidden md:w-32"
          value={selected}
          onChange={setSelected}
        >
          {({ open }) => (
            <>
              <Listbox.Label className="sr-only">Theme</Listbox.Label>
              <Listbox.Button className="relative w-full cursor-default rounded-md border border-amber-500/50 py-2 pl-3 pr-10 text-left shadow-md focus:border-amber-500/50 sm:text-sm">
                <span className="block truncate">{selected}</span>
                <span className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2">
                  {open ? (
                    <ChevronUpIcon
                      className="h-6 w-6 text-amber-500/80"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronDownIcon
                      className="h-6 w-6 text-amber-500/80"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </Listbox.Button>
              <Listbox.Options className="mt-2 w-full rounded-lg border border-amber-500/50 bg-zinc-900 text-zinc-300 md:absolute md:w-32">
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
        </Listbox> */}
      </div>
      <div className="ml-8 hidden h-auto w-px flex-col bg-white/10 lg:flex"></div>
      <div className="flex w-full flex-col gap-y-6 lg:ml-12">
        <div className="mt-4 flex flex-col">
          <h2 className="text-4xl font-semibold text-zinc-200">
            {selected.title}
          </h2>
          <SectionSeparator mt={2} mb={4} />
          <p className="pb-4 text-zinc-500">{selected.description}</p>
        </div>

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
    </div>
  )
}
