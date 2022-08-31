import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import SanityImage from '../SanityImage'
import clsx from 'clsx'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { motion } from 'framer-motion'

export default function Slider({ images }: any) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)
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
    dragged() {
      setHovered(true)
    },
  })

  const onEnter = () => {
    setHovered(true)
  }
  const onExit = () => {
    setHovered(false)
  }

  const slides = instanceRef.current?.track.details.slides

  return (
    <>
      <div className="relative mb-6">
        <p className="mb-2 text-lg font-semibold leading-7 text-amber-500 md:hidden">
          Screenshots
        </p>
        <div ref={sliderRef} className="keen-slider">
          {images.map((image: any, i: number) => (
            <div
              onMouseEnter={onEnter}
              onMouseLeave={onExit}
              key={image._key}
              className="keen-slider__slide relative z-20 aspect-[500/400]"
            >
              <SanityImage
                className="rounded-2xl"
                src={image}
                alt="snapshot"
                layout="fill"
              />
              {hovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 hidden w-full flex-col rounded-b-2xl border border-zinc-100/5 bg-zinc-900/70 px-4 py-3 font-display backdrop-blur-lg md:flex"
                >
                  <div className="flex items-center space-x-4">
                    <p className="text-zinc-300">
                      {i + 1}
                      <span className="text-zinc-400">/</span>
                      {images.length}
                    </p>
                    <p className="font-display text-lg text-amber-500">
                      {image?.caption}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <div
            onMouseEnter={onEnter}
            onMouseLeave={onExit}
            className="absolute right-4 bottom-[14px] z-20 hidden rounded-full md:flex"
          >
            {hovered && (
              <>
                <Arrow
                  left
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                />

                <Arrow
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    currentSlide ===
                    instanceRef.current.track.details.slides.length - 1
                  }
                />
              </>
            )}
          </div>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="mb-6 flex justify-center space-x-3 md:hidden">
          {slides?.map((_, idx) => {
            const active = currentSlide === idx
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={clsx('cursor pointer h-1 w-4 rounded bg-zinc-500', {
                  'bg-amber-500': active,
                })}
              ></button>
            )
          })}
        </div>
      )}
    </>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        'flex bg-zinc-300/30 px-2 text-zinc-200 transition-colors',
        {
          'rounded-l-full border border-zinc-400/50 hover:bg-zinc-300/40':
            props.left,
          'rounded-r-full border border-zinc-400/50 hover:bg-zinc-300/40':
            !props.left,
          'cursor-not-allowed bg-transparent hover:bg-transparent':
            props.disabled,
        }
      )}
    >
      {props.left && <ChevronLeftIcon className="h-6 w-6" />}
      {!props.left && <ChevronRightIcon className="h-6 w-6" />}
    </button>
  )
}