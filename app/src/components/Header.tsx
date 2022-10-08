import useMediaQuery from '@/hooks/useMediaQuery'
import { urlForImage } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import React from 'react'
import { Container } from './Container'
import SanityImage from './SanityImage'

export default function Header({ author }: any) {
  const lgQuery = useMediaQuery(1024)
  return (
    <Container className="mt-14 mb-24 md:mt-36 md:mb-32">
      <div className="flex flex-col-reverse justify-between md:flex-row md:items-center">
        <div className="flex-col space-y-4 md:w-2/3 lg:space-y-6">
          <h1 className="text-3xl font-bold leading-snug tracking-tight text-zinc-200 md:text-5xl">
            {author.name}
          </h1>
          <div className="max-w-2xl leading-relaxed text-zinc-400 lg:text-lg">
            <PortableText value={author.introduction} />
          </div>
        </div>
        {lgQuery ? (
          <div className="flex justify-center pb-6 md:w-1/3 md:pb-0">
            <div className="flex w-fit -skew-x-6 skew-y-6 rounded bg-zinc-300 px-3 pt-6 pb-16 transition-all duration-500 hover:skew-y-0 hover:skew-x-0 hover:bg-zinc-200">
              <div className="relative h-16 w-16 md:h-[220px] md:w-[175px]">
                <Image
                  className="rounded-md object-cover grayscale transition-all duration-500 hover:grayscale-0"
                  src={urlForImage(author.picture).url()}
                  alt={author.name || ' '}
                  layout="responsive"
                  width={680}
                  height={900}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex pb-6 md:w-1/3 md:justify-end md:pb-0">
            <div className="relative h-16 w-16 md:h-48 md:w-48">
              <SanityImage
                className="rounded-full object-cover grayscale transition-all hover:grayscale-0"
                layout="fill"
                src={author.picture}
                alt={author.name}
              />
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
