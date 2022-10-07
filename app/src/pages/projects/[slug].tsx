import { projectQuery, projectSlugsQuery } from '@/lib/queries'
import { getClient, overlayDrafts, sanityClient } from '@/lib/sanity.server'
import { useRouter } from 'next/router'
import { usePreviewSubscription } from '../../lib/sanity'
import SanityImage from '@/components/SanityImage'
import ErrorPage from 'next/error'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { Prose } from '@/components/Prose'
import NoSsr from '@/components/NoSsr'
import ImageSlider from '@/components/ui/ImageSlider'
import { PortableText } from '@portabletext/react'
import { motion } from 'framer-motion'
import Underline from '@/components/icons/Underline'
import type { NextPageWithLayout } from '././../_app'
import type { ReactElement } from 'react'
import ProjectLayout from '@/components/layouts/ProjectLayout'

const ProjectPage: NextPageWithLayout = ({ data = {}, preview }: any) => {
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
    <NoSsr>
      <div className="relative lg:mx-2">
        <div className="relative mx-auto py-12">
          <div className="mx-auto grid max-w-[40rem] grid-cols-1 gap-y-16 gap-x-3 xl:max-w-none xl:grid-cols-3">
            <div className="flex flex-col">
              <button
                className="-mt-10 mb-16 flex w-fit items-center text-sm transition-colors dark:text-zinc-400/80 dark:hover:text-zinc-50 md:mb-20 md:-mt-9"
                onClick={() => router.back()}
              >
                <ChevronLeftIcon className="-ml-[5px] h-5" />
                Back to projects
              </button>

              <p className="text-lg font-semibold text-amber-500/80">
                {project?.projectType}
              </p>
              <h1 className="mt-1 text-4xl font-extrabold leading-none tracking-tight text-zinc-200 sm:text-5xl sm:leading-[3.5rem]">
                {project?.title}
              </h1>
              <p className="mt-6 leading-normal text-zinc-400">
                <PortableText value={project?.description} />
              </p>
              <div className="mt-8 grid w-fit grid-cols-3 gap-y-6 gap-x-7">
                {project?.technologies?.map((tech: any, i: number) => (
                  <motion.div
                    className="flex items-center"
                    key={tech._id}
                    initial={{
                      opacity: 0,
                      translateX: -5,
                      translateY: -5,
                    }}
                    animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 + i * 0.1 }}
                  >
                    <div className="relative h-[32px] w-[32px] flex-none">
                      <SanityImage
                        src={tech?.logo}
                        alt={tech?.name}
                        layout="fill"
                      />
                    </div>
                    <p className="pl-1.5 text-sm text-zinc-400">{tech.name}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-16 flex max-w-2xl items-center gap-4">
                <button className="inline-flex w-1/2 justify-center rounded-md bg-amber-500/80 py-4 text-zinc-100 transition-colors hover:bg-amber-500 md:rounded-lg">
                  <span className="flex items-center">
                    Live preview
                    <svg
                      viewBox="0 0 20 20"
                      className="ml-1.5 h-5 w-5 fill-zinc-100"
                    >
                      <path d="M7 3.25H3.25v13.5h13.5V13h-1.5v2.25H4.75V4.75H7v-1.5Zm9.75 0H10v1.5h4.19l-5.72 5.72 1.06 1.06 5.72-5.72V10h1.5V3.25Z"></path>
                    </svg>
                  </span>
                </button>
                <button className="inline-flex w-1/2 justify-center rounded-md border border-amber-500/70 py-4 text-zinc-200 transition-colors hover:border-amber-500 hover:text-zinc-100 md:rounded-lg md:px-8">
                  <span className="flex items-center">
                    Source code
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-1.5 h-5 w-5 fill-zinc-100"
                    >
                      <path d="M16.24 22a1 1 0 0 1-1-1v-2.6a2.15 2.15 0 0 0-.54-1.66 1 1 0 0 1 .61-1.67C17.75 14.78 20 14 20 9.77a4 4 0 0 0-.67-2.22 2.75 2.75 0 0 1-.41-2.06 3.71 3.71 0 0 0 0-1.41 7.65 7.65 0 0 0-2.09 1.09 1 1 0 0 1-.84.15 10.15 10.15 0 0 0-5.52 0 1 1 0 0 1-.84-.15 7.4 7.4 0 0 0-2.11-1.09 3.52 3.52 0 0 0 0 1.41 2.84 2.84 0 0 1-.43 2.08 4.07 4.07 0 0 0-.67 2.23c0 3.89 1.88 4.93 4.7 5.29a1 1 0 0 1 .82.66 1 1 0 0 1-.21 1 2.06 2.06 0 0 0-.55 1.56V21a1 1 0 0 1-2 0v-.57a6 6 0 0 1-5.27-2.09 3.9 3.9 0 0 0-1.16-.88 1 1 0 1 1 .5-1.94 4.93 4.93 0 0 1 2 1.36c1 1 2 1.88 3.9 1.52a3.89 3.89 0 0 1 .23-1.58c-2.06-.52-5-2-5-7a6 6 0 0 1 1-3.33.85.85 0 0 0 .13-.62 5.69 5.69 0 0 1 .33-3.21 1 1 0 0 1 .63-.57c.34-.1 1.56-.3 3.87 1.2a12.16 12.16 0 0 1 5.69 0c2.31-1.5 3.53-1.31 3.86-1.2a1 1 0 0 1 .63.57 5.71 5.71 0 0 1 .33 3.22.75.75 0 0 0 .11.57 6 6 0 0 1 1 3.34c0 5.07-2.92 6.54-5 7a4.28 4.28 0 0 1 .22 1.67V21a1 1 0 0 1-.94 1z"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="relative lg:col-span-2 xl:ml-20">
              <ImageSlider images={project?.screenshots} />
              <div className="z-0 hidden md:block">
                <div className="absolute -bottom-12 flex h-8 items-end overflow-hidden">
                  <div className="-mb-px flex h-[2px] w-80 -scale-x-100">
                    <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#f59e09_32.29%,#ed86094c_67.19%,rgba(236,72,153,0)_100%)]"></div>
                    <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#f59e09_32.29%,#e15c034c_67.19%,rgba(236,72,153,0)_100%)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 left-0 hidden h-px bg-zinc-100/10 [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)] md:flex"></div>
      </div>
      <div className="mx-auto mt-4 max-w-[85rem] pb-14 md:mt-16">
        <div className="flex flex-col space-y-10 lg:flex-row lg:space-y-0 lg:space-x-20">
          <section className="w-full md:mt-6">
            <div className="mb-4 md:mb-8">
              <h2 className="text-3xl font-semibold capitalize leading-snug text-zinc-300">
                Features
              </h2>
            </div>
            <div className="max-w-xl">
              <Prose content={project?.content} />
            </div>
          </section>
          <div className="relative flex h-auto w-px flex-col bg-white/5"></div>
          <section className="w-full max-w-2xl justify-start">
            <div className="md:mt-6">
              <h2 className="text-3xl font-semibold capitalize leading-snug text-zinc-300">
                Dependencies
              </h2>
            </div>
            <div className="pt-6 md:mb-6 md:pt-8">
              <Prose content={project?.dependencies} />
            </div>
          </section>
        </div>
      </div>
    </NoSsr>
  )
}

ProjectPage.getLayout = (page: ReactElement) => {
  return <ProjectLayout>{page}</ProjectLayout>
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

export default ProjectPage
