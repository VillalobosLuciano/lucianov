import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SanityImage from '@/components/SanityImage'

export default function ProjectPreview({
  slug,
  coverImage,
  title,
  projectType,
  intro,
}: any) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/projects/${slug}`)
  }

  return (
    <div
      onClick={handleClick}
      className="relative mt-4 transform cursor-pointer overflow-hidden rounded-2xl bg-zinc-800/30 px-4 pt-5 pb-6 ring-1 ring-white/10 backdrop-blur transition-colors duration-200 hover:bg-zinc-800/50 hover:ring-amber-500/30"
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
      <div className="mt-6 px-1 lg:mb-1">
        <h3 className="text-2xl font-semibold text-zinc-200">{title}</h3>
        <h2 className="mb-2 text-sm capitalize text-amber-500/90">
          {projectType}
        </h2>
        <p className="pt-1 leading-5 text-zinc-400">{intro}</p>
      </div>
    </div>
  )
}
