import type { NextPageWithLayout } from './_app'
import type { ReactElement } from 'react'
import Head from 'next/head'
import { getClient, overlayDrafts } from '@/lib/sanity.server'
import { indexQuery } from '@/lib/queries'

import HomeLayout from '@/components/layouts/HomeLayout'
import FeaturedProjects from '@/components/projects/FeaturedProjects'
import LatestPosts from '@/components/posts/LatestPosts'
import Technologies from '../components/Technologies'
import Intro from '@/components/Intro'

const Home: NextPageWithLayout = ({
  projects,
  posts,
  technologies,
  author,
}: any) => {
  return (
    <>
      <Head>
        <title>Luciano Villalobos</title>
        <meta
          name="description"
          content="A portfolio of front-end development."
        />
      </Head>
      <main className="mb-4">
        <Intro author={author} />

        <Technologies technologies={technologies} />
        <FeaturedProjects projects={overlayDrafts(projects)} />
        <LatestPosts posts={overlayDrafts(posts)} />
      </main>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <HomeLayout>{page}</HomeLayout>
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  const { projects, posts, technologies, author } = await client.fetch(
    indexQuery
  )
  return {
    props: {
      preview,
      projects,
      posts,
      technologies,
      author,
    },
  }
}

export default Home
