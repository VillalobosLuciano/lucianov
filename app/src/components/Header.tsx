import { PortableText } from '@portabletext/react'
import React from 'react'
import { Container } from './Container'
import SanityImage from './SanityImage'

export default function Header({ author }: any) {
  return (
    <Container className="mt-14 mb-24 md:mt-36 md:mb-32">
      <div className="flex flex-col-reverse justify-between md:flex-row md:items-center">
        <div className="flex-col space-y-5 md:w-2/3">
          <h1 className="text-3xl font-bold leading-snug tracking-tight text-zinc-200 md:text-5xl">
            {author.name}
          </h1>
          <div className="leading-relaxed text-zinc-400">
            <PortableText value={author.introduction} />
          </div>
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
