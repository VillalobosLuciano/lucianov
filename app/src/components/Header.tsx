import React from 'react'
import { Container } from './Container'
import SanityImage from './SanityImage'
import Technologies from './Technologies'
import Image from 'next/image'
import background from '@/images/background.png'

export default function Header({ author, technologies }: any) {
  return (
    <Container className="mt-14 mb-2 md:mt-44 md:mb-28">
      <div className="flex flex-col-reverse justify-between px-2 md:flex-row md:items-center md:px-0">
        <div className="flex-col space-y-5 md:w-2/3">
          <h1 className="text-3xl font-bold leading-snug tracking-tight text-zinc-200 md:text-5xl">
            Web developer, industrial engineer, and IoT enthusiast.
          </h1>
          <p className="leading-relaxed text-zinc-400">
            I’m Someone, a software designer and entrepreneur based in New York
            City. I’m the founder and CEO of Planetaria, where we develop
            technologies that empower regular people to explore space on their
            own terms.
          </p>
        </div>
        <div className="flex pb-6 md:w-1/3 md:justify-end md:pb-0">
          <div className="relative h-16 w-16 md:h-48 md:w-48">
            <SanityImage
              className="rounded-full grayscale transition-all hover:grayscale-0"
              layout="fill"
              src={author.picture}
              alt={author.name}
            />
          </div>
        </div>
      </div>
      <div className="flex px-2 pt-12 md:px-0 md:pt-12 md:pb-36">
        <Technologies technologies={technologies} />
      </div>
      <div className="relative pt-16">
        <div className="absolute -right-8 bottom-0 -left-8 hidden h-px opacity-80 [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#f59e09_32.29%,#fb79004c_67.19%,rgba(236,72,153,0)_100%)] md:flex"></div>
      </div>
    </Container>
  )
}
