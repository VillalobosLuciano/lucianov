import React from 'react'
import { Container } from './Container'
import SanityImage from './SanityImage'
import Technologies from './Technologies'
import Image from 'next/image'
import background from '@/images/background.png'

export default function Header({ author, technologies }: any) {
  return (
    <Container className="my-16 md:mt-44 md:mb-36">
      <div className="absolute inset-0 hidden overflow-hidden md:flex">
        <Image
          src={background}
          alt="background image"
          layout="fill"
          className="absolute bottom-0 hidden opacity-20 sepia lg:block"
        />
      </div>
      <div className="flex flex-col-reverse justify-between px-2 md:flex-row md:items-center md:px-0">
        <div className="flex-col space-y-5 font-display md:w-2/3">
          <h1 className="text-2xl font-bold leading-snug tracking-tight text-zinc-300 md:text-5xl">
            Web developer, industrial engineer, and IoT enthusiast.
          </h1>
          <p className="text-zinc-400">
            I’m Someone, a software designer and entrepreneur based in New York
            City. I’m the founder and CEO of Planetaria, where we develop
            technologies that empower regular people to explore space on their
            own terms.
          </p>
        </div>
        <div className="flex pb-6 md:w-1/3 md:justify-end md:pb-0">
          <div className="relative h-28 w-28 md:h-52 md:w-52">
            <SanityImage
              className="rounded-full grayscale transition-all hover:grayscale-0"
              layout="fill"
              src={author.picture}
              alt={author.name}
            />
          </div>
        </div>
      </div>
      <div className="relative flex px-2 pb-16 pt-10 md:px-0 md:pb-32">
        <Technologies technologies={technologies} />
        <div className="absolute -right-8 bottom-0 -left-8 hidden h-px [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#f59e09_32.29%,#fb79004c_67.19%,rgba(236,72,153,0)_100%)] md:flex"></div>
      </div>
    </Container>
  )
}
