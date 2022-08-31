import { projectQuery, projectSlugsQuery } from '@/lib/queries'
import { getClient, overlayDrafts, sanityClient } from '@/lib/sanity.server'
import { useRouter } from 'next/router'
import { usePreviewSubscription } from '../../lib/sanity'
import SanityImage from '@/components/SanityImage'
import ErrorPage from 'next/error'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import background from '@/images/background.png'
import { Prose } from '@/components/Prose'
import NoSsr from '@/components/NoSsr'
import Slider from '@/components/ui/Slider'
import { PortableText } from '@portabletext/react'

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
    <NoSsr>
      <div className="relative -mt-[5.75rem] pt-[5.75rem]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={background}
            alt="background image"
            layout="fill"
            className="absolute bottom-0 hidden lg:block"
          />
        </div>

        <div className="relative">
          <div className="relative mx-auto max-w-[85rem] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
            <div className="mx-auto grid max-w-[40rem] grid-cols-1 gap-y-16 gap-x-8 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col lg:py-12">
                <h1 className="mt-3 text-4xl font-extrabold leading-none tracking-tight text-zinc-200 sm:text-5xl sm:leading-[3.5rem]">
                  {project?.title}
                </h1>
                <p className="order-first text-xl font-semibold leading-7 text-amber-500">
                  {project?.projectType}
                </p>
                <p className="mt-6 font-display leading-7 text-zinc-400">
                  <PortableText value={project?.description} />
                </p>
                <div className="mt-6 grid max-w-[18rem] grid-cols-2 gap-y-5">
                  {project?.technologies?.map((tech: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center text-sm font-medium text-zinc-300"
                    >
                      <div className="relative h-[32px] w-[34px] flex-none">
                        <SanityImage
                          src={tech?.logo}
                          alt={tech?.name}
                          layout="fill"
                        />
                      </div>
                      <span className="ml-1.5">{tech?.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex gap-5">
                  <button className="inline-flex justify-center rounded-lg bg-amber-500/90 py-3 px-4 font-semibold text-zinc-100 transition-colors hover:bg-amber-500">
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
                  <button className="inline-flex justify-center rounded-lg border border-amber-500/70 py-3 px-4 font-semibold text-zinc-200 transition-colors hover:border-amber-500 hover:text-zinc-100">
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
              <div className="relative md:mx-20 lg:col-span-2">
                <Slider images={project?.screenshots} />

                <div className="z-0 hidden md:block">
                  <div className="absolute -top-4 -right-12 -left-12 h-px bg-zinc-100/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                  <div className="absolute -top-12 bottom-0 -left-4 w-px bg-zinc-100/[0.1] [mask-image:linear-gradient(to_top,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                  <div className="absolute -top-12 bottom-0 -right-4 w-px bg-zinc-100/[0.1] [mask-image:linear-gradient(to_top,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                  <div className="absolute -top-12 right-10 mt-px flex h-8 items-end overflow-hidden">
                    <div className="-mb-px flex h-[2px] w-80 -scale-x-100">
                      <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                      <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 -left-48 flex h-8 items-end overflow-hidden">
                    <div className="-mb-px flex h-[2px] w-80 -scale-x-100">
                      <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                      <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
          <div className="absolute -right-8 bottom-0 -left-8 h-px bg-zinc-100/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
        </div>
      </div>
      <div className="mx-auto mt-52 w-full max-w-[85rem] px-4 pb-20 sm:mt-36 sm:px-6 sm:pb-24 lg:mt-28 lg:px-8 lg:pb-32 xl:mt-36">
        <div className="mx-auto max-w-[40rem] space-y-20 divide-y divide-zinc-800 sm:space-y-24 lg:max-w-none lg:space-y-32">
          <section className="grid grid-cols-1 items-baseline gap-y-10 gap-x-6 lg:grid-cols-3">
            <h2 className="text-2xl font-semibold leading-9 tracking-tight text-amber-500">
              What`s included
            </h2>
            <div className="max-w-2xl lg:col-span-2">
              <Prose content={project?.content} />
            </div>
          </section>
          <section className="grid grid-cols-1 gap-y-10 gap-x-6 pt-10 lg:grid-cols-3">
            <h2 className="text-2xl font-semibold leading-9 tracking-tight text-amber-500">
              Built for developers
            </h2>
            <div className="max-w-2xl lg:col-span-2">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {project?.technologies?.map((tech: any, i: number) => (
                  <strong key={i} className="font-semibold text-zinc-300">
                    {tech?.name}
                  </strong>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </NoSsr>
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
