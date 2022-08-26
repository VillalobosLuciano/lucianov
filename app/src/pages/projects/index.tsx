import { indexQuery } from '@/lib/queries'
import { getClient, overlayDrafts } from '@/lib/sanity.server'
import Head from 'next/head'
import Projects from '@/components/projects/Projects'
import type { NextPageWithLayout } from '././../_app'
import type { ReactElement } from 'react'
import HomeLayout from '@/components/layouts/HomeLayout'

const ProjectsPage: NextPageWithLayout = ({ projects }: any) => {
  return (
    <>
      <Head>
        <title>Smart Home Solutions</title>
        <meta name="description" content="Smart Home Solutions" />
      </Head>
      <Projects projects={projects} />
    </>
  )
}
ProjectsPage.getLayout = (page: ReactElement) => {
  return <HomeLayout>{page}</HomeLayout>
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  const { projects } = await client.fetch(indexQuery)
  return {
    props: {
      preview,
      projects,
    },
  }
}

export default ProjectsPage
