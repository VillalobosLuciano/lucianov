import clsx from 'clsx'
import { Container } from '@/components/Container'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectPreview from '@/components/projects/ProjectPreview'
import SectionSeparator from '../ui/SectionSeparator'

export default function Projects({ projects }: any) {
  const [selected, setSelected] = useState('all')
  const [projectsList, setProjectsList] = useState(projects)
  const [hoveredIndex, setHoveredIndex] = useState(-1)

  const projectTypes = projects.map((project: any) => project.projectType)
  projectTypes.unshift('all')

  const handleClick = (type: string) => {
    setSelected(type)
    if (type === 'all') {
      setProjectsList(projects)
    } else {
      setProjectsList(
        projects.filter((project: any) => project.projectType === type)
      )
    }
  }

  return (
    <Container className="pt-14 pb-20 md:py-20">
      <div className="max-w-2xl px-2 pb-4 font-display lg:mx-0">
        <h2 className="text-3xl font-medium tracking-tighter text-amber-500">
          Projects
        </h2>
        <p className="mt-4 text-lg leading-normal tracking-tight text-zinc-400">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC.
        </p>
      </div>
      <div className="mt-8 mb-6 flex flex-wrap gap-4 px-2">
        {projectTypes.map((type: any, index: number) => (
          <button
            key={type}
            className={clsx(
              'relative cursor-pointer rounded border-transparent px-4 py-1.5 font-display text-sm capitalize transition-colors delay-150 hover:delay-[0ms]',
              {
                'border border-teal-600/30 bg-amber-500/5 text-teal-600 dark:border-amber-500/30 dark:text-amber-500':
                  type === selected,
                'border border-white/5 text-zinc-400 transition-colors duration-200 hover:text-zinc-500 dark:text-zinc-300 dark:hover:text-zinc-200':
                  type !== selected,
              }
            )}
            onClick={() => handleClick(type)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 rounded bg-amber-500/5"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            {type}
          </button>
        ))}
      </div>
      <SectionSeparator mt={0} mb={4} />
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-1 text-sm sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
        {projectsList.length ? (
          projectsList.map((project: any, i: number) => (
            <motion.div
              className="px-3 pb-3"
              key={project._id}
              initial={{
                opacity: 0,
                translateX: -5,
                translateY: -5,
              }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.25, delay: 0.1 + i * 0.2 }}
            >
              <ProjectPreview
                slug={project.slug}
                coverImage={project.coverImage}
                title={project.title}
                projectType={project.projectType}
                intro={project.intro}
              />
            </motion.div>
          ))
        ) : (
          <div className="text-center">No Projects Yet</div>
        )}
      </div>
    </Container>
  )
}
