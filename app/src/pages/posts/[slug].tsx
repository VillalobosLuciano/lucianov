import { postQuery, postSlugsQuery } from '@/lib/queries'
import { getClient, overlayDrafts, sanityClient } from '@/lib/sanity.server'
import { useRouter } from 'next/router'
import { usePreviewSubscription } from '../../lib/sanity'
import ErrorPage from 'next/error'
import { Prose } from '@/components/Prose'
import PostHeader from '../../components/posts/PostHeader'
import { Container } from '@/components/Container'
import { ChevronLeftIcon } from '@heroicons/react/solid'

export default function Posts({ data = {}, preview }: any) {
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
    <Container className="max-w-4xl pb-24">
      <button
        className="mt-16 flex items-center decoration-amber-500/50 transition-colors hover:underline dark:text-zinc-300 dark:hover:text-zinc-200"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon className="h-5 " />
        Back
      </button>
      <PostHeader
        title={post?.title}
        dateString={post?.date}
        logo={post?.author.logo}
        name={post?.author.name}
      />
      <Prose content={post?.content} />
    </Container>
  )
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
