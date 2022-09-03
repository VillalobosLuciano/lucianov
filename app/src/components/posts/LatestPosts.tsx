import Link from 'next/link'
import { Container } from '@/components/Container'
import PostPreview from '@/components/posts/PostPreview'

export default function LatestPosts({ posts }: any) {
  const latestPosts = posts.slice(0, 2)
  return (
    <Container className="pt-20 pb-16">
      <div className="max-w-2xl px-2 pb-8 font-display lg:mx-0">
        <h2 className="text-5xl font-semibold text-zinc-200">Posts</h2>
        <p className="mt-4 text-lg leading-normal tracking-tight text-zinc-400">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC.
        </p>
      </div>

      <div className="grid grid-cols-1 space-y-10 divide-y divide-teal-600/10 dark:divide-amber-500/10">
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
