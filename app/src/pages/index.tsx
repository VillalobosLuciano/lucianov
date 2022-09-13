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
import SectionHeader from '@/components/ui/SectionHeader'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { InView } from 'react-intersection-observer'
import Header from '@/components/Header'

const Home: NextPageWithLayout = ({
  projects,
  posts,
  technologies,
  author,
}: any) => {
  const [inView, setInView] = useState(false)

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
        <Header author={author} technologies={technologies} />
        <InView onChange={setInView}>
          {({ ref, inView }: any) => (
            <SectionHeader
              ref={ref}
              inView={inView}
              sectionName="Tech stack"
              SectionDescription="Contrary to popular belief, Lorem Ipsum is not simply random text."
            />
          )}
        </InView>
        <Technologies technologies={technologies} />
        <InView onChange={setInView}>
          {({ ref, inView }: any) => (
            <SectionHeader
              ref={ref}
              inView={inView}
              sectionName="projects"
              SectionDescription="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature."
            />
          )}
        </InView>
        <FeaturedProjects projects={overlayDrafts(projects)} />
        <InView onChange={setInView}>
          {({ ref, inView }: any) => (
            <SectionHeader
              ref={ref}
              inView={inView}
              sectionName="latest posts"
              SectionDescription="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature."
            />
          )}
        </InView>
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
