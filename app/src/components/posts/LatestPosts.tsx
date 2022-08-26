import Link from 'next/link'
import { Container } from '@/components/Container'
import PostPreview from '@/components/posts/PostPreview'

export default function LatestPosts({ posts }: any) {
  return (
    <Container className="pt-20 pb-16">
      <p className="mt-2 px-4 pb-1 leading-snug text-zinc-400 lg:pb-4">
        This is where I document my learning journey.
      </p>
      <div className="grid grid-cols-1 space-y-10 divide-y divide-teal-600/10 dark:divide-amber-500/10">
        {posts.map((post: any) => (
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
      <div className="mt-12 mb-16 flex sm:hidden">
        <Link href="/posts">
          <a className="mx-4 w-full rounded-md border border-teal-600/40 py-2 text-center text-base font-semibold text-teal-600/90 dark:border-amber-500/40 dark:text-amber-500/90 md:hidden">
            View all<span aria-hidden="true"> &rarr;</span>
          </a>
        </Link>
      </div>
    </Container>
  )
}
