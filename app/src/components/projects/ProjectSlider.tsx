import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import ProjectPreview from '@/components/projects/ProjectPreview'
import { useRouter } from 'next/router'

interface Props {
  children: React.ReactNode
  projects: any
}

export default function ProjectSlider({ projects, children }: Props) {
  const router = useRouter()
  let [activeIndex, setActiveIndex] = useState(0)
  let slideContainerRef = useRef<HTMLDivElement>(null)
  let slideRefs = useRef<HTMLDivElement[]>([] || null)

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(slideRefs.current.indexOf(entry.target as any))
            break
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      }
    )

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [slideContainerRef, slideRefs])

  return (
    <>
      <div
        ref={slideContainerRef}
        className="flex snap-x snap-mandatory space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project: any, projectIndex: any) => (
          <div
            key={projectIndex}
            ref={(ref) => (slideRefs.current[projectIndex] = ref!)}
            className="w-full flex-none snap-center px-3 sm:px-6"
            onClick={() => router.push(`/projects/${project.slug}`)}
          >
            {children}
          </div>
        ))}
      </div>
      {/* <div className="mt-6 flex justify-center gap-3">
        {projects.map((_: any, projectIndex: any) => (
          <button
            type="button"
            key={projectIndex}
            className={clsx(
              'relative h-0.5 w-4 rounded-full',
              projectIndex === activeIndex ? 'bg-zinc-300' : 'bg-zinc-500'
            )}
            aria-label={`Go to slide ${projectIndex + 1}`}
            onClick={() => {
              slideRefs.current[projectIndex].scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              })
            }}
          >
            <span className="absolute -inset-x-1.5 -inset-y-3" />
          </button>
        ))}
      </div> */}
    </>
  )
}
