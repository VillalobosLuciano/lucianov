import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SanityImage from '@/components/SanityImage'

export default function ProjectPreview({
  index,
  slideRefs,
  slug,
  coverImage,
  title,
  projectType,
  description,
}: any) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/projects/${slug}`)
  }

  return (
    <>
      <div
        onClick={handleClick}
        className="relative mt-4 transform cursor-pointer overflow-hidden rounded-2xl bg-zinc-600/10 px-5 py-6 ring-1 ring-white/10 backdrop-blur"
      >
        <div className="absolute top-0 left-20 right-11 h-px bg-gradient-to-r from-amber-300/0 via-amber-500/50 to-amber-300/0" />
        <div className="relative h-52 w-full">
          <SanityImage
            src={coverImage}
            layout="fill"
            alt={title}
            className="absolute rounded-lg"
          />
        </div>
        <div className="mt-6 mb-6 px-1 font-display lg:mb-2">
          <h3 className="text-2xl font-semibold text-zinc-200 sm:text-lg">
            {title}
          </h3>
          <h2 className="pb-3 text-sm capitalize text-amber-500/90">
            {projectType}
          </h2>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
        <button
          className="w-full rounded-lg border border-amber-500/30 py-2 text-center text-amber-500 transition-colors focus:border-amber-500/50 focus:bg-amber-500/5 lg:hidden"
          onClick={handleClick}
        >
          Visit Project
        </button>
      </div>
    </>
  )
}
