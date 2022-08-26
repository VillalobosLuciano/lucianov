import { projectQuery, projectSlugsQuery } from '@/lib/queries'
import { getClient, overlayDrafts, sanityClient } from '@/lib/sanity.server'
import { useRouter } from 'next/router'
import { usePreviewSubscription } from '../../lib/sanity'
import { PortableText } from '@portabletext/react'
import SanityImage from '@/components/SanityImage'
import ErrorPage from 'next/error'

export default function Project({ data = {}, preview }: any) {
  const router = useRouter()

  const slug = data?.project?.slug
  const {
    data: { project },
  } = usePreviewSubscription(projectQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <button onClick={() => router.back()}>Back</button>
      <h1>{project?.title}</h1>
      <PortableText value={project?.content} />
    </>
  )
}

export async function getStaticProps({ params, preview = false }: any) {
  const { project } = await getClient(preview).fetch(projectQuery, {
    slug: params.slug,
  })

  return {
    props: {
      preview,
      data: {
        project,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(projectSlugsQuery)
  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  }
}
