import { useState, useEffect, useContext, Suspense } from 'react'
import PostPreview from '@/components/posts/PostPreview'
import { Container } from '@/components/Container'
import { Popover } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Search from '@/components/ui/Search'
import { XIcon, ViewListIcon, SearchIcon } from '@heroicons/react/solid/'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useToggleContext } from '@/hooks/useToggle'

interface Category {
  title: string
  description: string
}

export default function Posts({ posts }: any) {
  const { toggle, setToggle } = useToggleContext()

  useEffect(() => {
    setToggle(true)
  }, [setToggle])

  const allPosts: Category = {
    description: 'hagale pues',
    title: 'All Posts',
  }
  const [searchInput, setSearchInput] = useState('')
  const [postsList, setPostsList] = useState(posts)
  const [selected, setSelected] = useState(allPosts)
  const [openSearch, setOpenSearch] = useState(false)

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
      {toggle && (
        <Popover className="fixed top-[55px] w-full border-b border-white/5 bg-[#19191a] px-4 py-3 lg:hidden [&:not(:focus-visible)]:focus:outline-none">
          {({ open }) => (
            <>
              {!openSearch ? (
                <div className="flex w-full items-center justify-between px-2">
                  <Popover.Button
                    className="relative flex items-center space-x-2"
                    aria-label="Toggle site navigation"
                  >
                    <ViewListIcon className="h-4 w-4 text-zinc-400" />
                    <span className="text-zinc-300">Categories</span>
                  </Popover.Button>
                  <SearchIcon
                    onClick={() => setOpenSearch(true)}
                    className="h-4 w-4 cursor-pointer text-zinc-400 hover:text-zinc-100"
                  />
                </div>
              ) : (
                <div className="-my-1 flex w-full items-center">
                  <Search
                    handleSearch={handleSearch}
                    searchInput={searchInput}
                    openSearch={openSearch}
                  />
                  {openSearch && (
                    <XIcon
                      onClick={() => setOpenSearch(false)}
                      className="absolute right-[18px] z-10 h-7 w-7 cursor-pointer p-1.5 text-zinc-400"
                    />
                  )}
                </div>
              )}
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
                        <div className="flex items-center justify-between pl-1.5">
                          <h3 className="text-zinc-300">Categories</h3>
                          <Popover.Button>
                            <XIcon className="h-5 w-5 text-zinc-400 hover:text-zinc-200" />
                          </Popover.Button>
                        </div>
                        <div className="w-full space-y-1">
                          {filteredCategories &&
                            filteredCategories.map((cat: any, i: number) => (
                              <Popover.Button
                                as="div"
                                onClick={() => handleSelected(cat)}
                                className={clsx(
                                  'cursor-pointer rounded-md border border-transparent px-4 py-2 text-zinc-400/80 transition-colors duration-300 hover:text-zinc-300',
                                  {
                                    'bg-zinc-500/10 dark:text-zinc-300':
                                      cat.title === selected.title,
                                    'hover:bg-zinc-700/10':
                                      cat.title !== selected.title,
                                  }
                                )}
                                key={i}
                              >
                                {cat.title}
                              </Popover.Button>
                            ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </AnimatePresence>
            </>
          )}
        </Popover>
      )}

      <div className="mx-auto mb-24 flex max-w-7xl flex-col lg:mb-0 lg:flex-row">
        <div className="flex w-full flex-col self-start lg:sticky lg:top-[114px] lg:mb-6 lg:max-w-[315px] lg:px-2">
          <div className="hidden lg:flex">
            <Search handleSearch={handleSearch} searchInput={searchInput} />
          </div>
          <div className="mt-6 hidden w-full cursor-pointer flex-col gap-y-3 lg:flex">
            {filteredCategories &&
              filteredCategories.map((cat: any, i: number) => (
                <div
                  onClick={() => handleSelected(cat)}
                  className={clsx(
                    'cursor-pointer rounded-md px-4 py-3 text-zinc-500 transition-colors duration-300 hover:text-zinc-300',
                    {
                      'bg-amber-400/[0.04] dark:text-zinc-300':
                        cat.title === selected.title,
                      'hover:bg-amber-400/[0.01]': cat.title !== selected.title,
                    }
                  )}
                  key={i}
                >
                  {cat.title}
                </div>
              ))}
          </div>
        </div>
        <div className="mt-8 ml-7 hidden w-px flex-col bg-white/5 lg:flex" />
        <div className="mt-24 flex w-full flex-col lg:my-[130px] lg:ml-11 lg:gap-y-5">
          <div className="mb-2 flex flex-col bg-gradient-to-b from-amber-300/[.02] to-zinc-900 px-7 pt-14 pb-6 lg:mx-4 lg:rounded-xl lg:bg-gradient-to-r lg:pb-2 lg:pt-8">
            <span className="pb-0.5 text-xs tracking-wide text-amber-400/50">
              Category
            </span>
            <h2 className="text-3xl font-semibold text-zinc-300">
              {selected.title}
            </h2>
            <p className="pb-4 pt-2 text-xl text-zinc-500">
              {selected.description}
            </p>
          </div>
          <div className="flex w-full flex-col gap-y-6 px-6 lg:px-4">
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
      </div>
    </>
  )
}
