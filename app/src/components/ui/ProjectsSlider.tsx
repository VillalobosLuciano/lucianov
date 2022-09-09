import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import clsx from 'clsx'
import ProjectPreview from '../projects/ProjectPreview'

export default function ImageSlider({ projects }: any) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      spacing: 25,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const slides = instanceRef.current?.track?.details.slides

  return (
    <>
      <div className="mb-6 md:hidden">
        <div ref={sliderRef} className="keen-slider">
          {projects.map((project: any) => (
            <div className="keen-slider__slide px-4 py-1" key={project._id}>
              <ProjectPreview
                slug={project.slug}
                coverImage={project.coverImage}
                title={project.title}
                projectType={project.projectType}
                intro={project.intro}
              />
            </div>
          ))}
        </div>
      </div>
      {loaded && instanceRef.current && (
        <div className="mb-16 flex justify-center space-x-1 md:hidden">
          {slides?.map((_, idx) => {
            const active = currentSlide === idx
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={clsx(
                  'cursor pointer z-1 h-[2px] w-10 rounded bg-zinc-500/60',
                  {
                    'bg-amber-500/80': active,
                  }
                )}
              ></button>
            )
          })}
        </div>
      )}
    </>
  )
}
