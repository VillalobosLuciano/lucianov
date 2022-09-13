import React from 'react'
import { Container } from './Container'
import SanityImage from './SanityImage'

export default function Header({ author }: any) {
  return (
    <Container className="mt-14 mb-24 md:mt-36 md:mb-32">
      <div className="flex flex-col-reverse justify-between md:flex-row md:items-center">
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
    </Container>
  )
}
