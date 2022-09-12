import Link from 'next/link'
import { Container } from '@/components/Container'
import PostPreview from '@/components/posts/PostPreview'
import { ChevronRightIcon } from '@heroicons/react/solid'

export default function LatestPosts({ posts }: any) {
  const latestPosts = posts.slice(0, 2)
  return (
    <Container className="mb-28 md:mb-40">
      <div className="grid grid-cols-1 space-y-10 divide-y divide-teal-600/10 dark:divide-zinc-400/10">
        {latestPosts.map((post: any) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
            categories={post.categories}
          />
        ))}
      </div>
      <div className="mt-16 flex sm:hidden">
        <Link href="/posts">
          <a className="mx-auto flex items-center rounded-lg border border-amber-500/40 px-4 py-2 text-center text-teal-600/90 dark:text-zinc-200/90 md:hidden">
            View all posts
            <ChevronRightIcon className="ml-2 -mr-2 mt-[2px] h-6 w-6 dark:text-amber-500/90" />
          </a>
        </Link>
      </div>
    </Container>
  )
}
