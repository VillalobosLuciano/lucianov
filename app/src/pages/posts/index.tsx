import { indexQuery } from '@/lib/queries'
import { getClient, overlayDrafts } from '@/lib/sanity.server'
import Head from 'next/head'
import Posts from '@/components/posts/Posts'
import type { NextPageWithLayout } from '././../_app'
import type { ReactElement } from 'react'
import PostLayout from '@/components/layouts/PostLayout'

const PostsPage: NextPageWithLayout = ({ posts }: any) => {
  return (
    <>
      <Head>
        <title>Smart Home Solutions</title>
        <meta name="description" content="Smart Home Solutions" />
      </Head>
      <Posts posts={posts} />
    </>
  )
}
PostsPage.getLayout = (page: ReactElement) => {
  return <PostLayout>{page}</PostLayout>
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  const { posts } = await client.fetch(indexQuery)
  return {
    props: {
      preview,
      posts,
    },
  }
}

export default PostsPage
