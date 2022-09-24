import { useState, useEffect } from 'react'
import PostPreview from '@/components/posts/PostPreview'
import { Container } from '@/components/Container'
import { Popover } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Search from '@/components/ui/Search'
import { XIcon, ViewListIcon } from '@heroicons/react/solid/'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import SectionSeparator from '../ui/SectionSeparator'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <>
      <div className="flex border-b border-white/10 md:border-none">
        <div className="mx-auto flex w-full max-w-7xl items-center px-6">
          <div className="my-4 w-fit text-sm transition-colors dark:text-zinc-400/80 dark:hover:text-zinc-50 md:mt-5">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative mt-1 flex items-center space-x-2"
                    aria-label="Toggle site navigation"
                  >
                    <ViewListIcon className="h-4 w-4 text-zinc-400" />
                    <span className="text-zinc-300">Categories</span>
                    {/* {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <ChevronDownIcon className="h-6 w-6" />
                      )
                    } */}
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-zinc-900/60 backdrop-blur-sm"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: 32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: 32,
                            transition: { duration: 0.2 },
                          }}
                          className="fixed inset-x-0 bottom-0 z-0 origin-bottom rounded-t-2xl border-t border-amber-500/30 bg-zinc-900 px-6 pt-8 pb-14"
                        >
                          <div className="flex flex-col gap-y-6">
                            <div className="flex items-center justify-between text-zinc-200">
                              <h3>Categories</h3>
                              <Popover.Button>
                                <XIcon className="h-5 w-5 hover:text-zinc-100" />
                              </Popover.Button>
                            </div>
                            <div className="w-full space-y-1">
                              {filteredCategories &&
                                filteredCategories.map(
                                  (cat: any, i: number) => (
                                    <Popover.Button
                                      as="div"
                                      onClick={() => handleSelected(cat)}
                                      className={clsx(
                                        'cursor-pointer rounded-md border border-transparent px-4 py-2 text-zinc-400/80 transition-colors duration-300 hover:text-zinc-300',
                                        {
                                          'bg-zinc-700/50 dark:text-zinc-300':
                                            cat.title === selected.title,
                                          'hover:bg-zinc-700/10':
                                            cat.title !== selected.title,
                                        }
                                      )}
                                      key={i}
                                    >
                                      {cat.title}
                                    </Popover.Button>
                                  )
                                )}
                            </div>
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
      <div className="mx-auto my-12 flex max-w-7xl flex-col px-4 lg:flex-row">
        <div className="mb-6 flex w-full flex-col self-start lg:sticky lg:top-12 lg:max-w-[300px]">
          {/* <Search handleSearch={handleSearch} searchInput={searchInput} /> */}
          <div className="mt-6 hidden w-full cursor-pointer flex-col gap-y-2 lg:flex">
            {filteredCategories &&
              filteredCategories.map((cat: any, i: number) => (
                <div
                  onClick={() => handleSelected(cat)}
                  className={clsx(
                    'cursor-pointer rounded-md border border-transparent px-4 py-3 text-zinc-400/80 transition-colors duration-300 hover:text-zinc-300',
                    {
                      'border border-white/10 bg-zinc-800/20 dark:text-zinc-300':
                        cat.title === selected.title,
                      'hover:bg-zinc-700/10': cat.title !== selected.title,
                    }
                  )}
                  key={i}
                >
                  {cat.title}
                </div>
              ))}
          </div>
        </div>
        <div className="ml-8 hidden h-auto w-px flex-col bg-white/5 lg:flex" />
        <div className="flex w-full flex-col gap-y-6 md:my-2 lg:ml-12">
          <div className="flex flex-col">
            <h2 className="text-4xl font-semibold text-zinc-300">
              {selected.title}
            </h2>
            <SectionSeparator mt={2} mb={2} />
            <p className="pb-4 text-xl text-zinc-400">{selected.description}</p>
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
    </>
  )
}
