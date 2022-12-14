import { postQuery, postSlugsQuery } from '@/lib/queries'
import { getClient, overlayDrafts, sanityClient } from '@/lib/sanity.server'
import { useRouter } from 'next/router'
import { usePreviewSubscription } from '../../lib/sanity'
import ErrorPage from 'next/error'
import { Prose } from '@/components/Prose'
import PostHeader from '../../components/posts/PostHeader'
import { Container } from '@/components/Container'
import type { NextPageWithLayout } from '././../_app'
import type { ReactElement } from 'react'
import PostLayout from '@/components/layouts/PostLayout'
import SanityImage from '../../components/SanityImage'
import NoSsr from '@/components/NoSsr'
import Link from 'next/link'

const PostPage: NextPageWithLayout = ({ data = {}, preview }: any) => {
  const router = useRouter()

  const slug = data?.post?.slug
  const {
    data: { post },
  } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <NoSsr>
      <PostHeader
        title={post?.title}
        dateString={post?.date}
        logo={post?.author.logo}
        name={post?.author.name}
        category={post?.categories[0]}
      />
      <div className="mx-auto flex max-w-7xl flex-col-reverse px-2 pb-24 lg:flex-row">
        <div className="w-full px-4 pt-4 pb-6 lg:w-[64%] lg:px-2">
          <Prose content={post?.content} />
        </div>
        <div className="hidden h-auto w-px flex-col bg-white/5 md:ml-12 lg:flex xl:ml-14"></div>
        <div className="-mt-4 mb-4 flex flex-col gap-y-4 border-b border-white/10 px-4 pb-6 md:border-none md:pt-4 lg:ml-10 lg:mt-0 lg:px-0">
          <p className="text-sm text-zinc-400/80">Posted by</p>
          <div className="block flex-shrink-0">
            <div className="flex items-center">
              <div className="relative inline-block h-9 w-9">
                <SanityImage
                  className="rounded-full"
                  src={post?.author.picture}
                  alt={post?.author.name}
                  layout="fill"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-zinc-200">
                  {post?.author.name}
                </p>
                <Link href="#">
                  <a className="text-xs font-medium text-zinc-400/80 hover:text-zinc-400">
                    @lucianov0
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NoSsr>
  )
}

PostPage.getLayout = (page: ReactElement) => {
  return <PostLayout>{page}</PostLayout>
}

export async function getStaticProps({ params, preview = false }: any) {
  const { post } = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  })

  return {
    props: {
      preview,
      data: {
        post,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postSlugsQuery)
  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  }
}

export default PostPage
