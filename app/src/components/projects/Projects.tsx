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
    <Container className="px-2 pt-12 pb-36 lg:px-0 lg:py-24">
      <div className="max-w-2xl pb-6 lg:mx-0">
        <h2 className="text-2xl font-semibold text-zinc-200 lg:text-4xl">
          Projects
        </h2>
        <p className="mt-4 mb-6 leading-normal tracking-tight text-zinc-500 lg:text-lg">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC.
        </p>
      </div>
      <div className="mb-6 flex flex-wrap gap-3">
        {projectTypes.map((type: any, index: number) => (
          <button
            key={type}
            className={clsx(
              'relative cursor-pointer rounded-md border-transparent px-3 py-1 text-sm capitalize transition-colors delay-150 hover:delay-[0ms]',
              {
                'border border-teal-600/30 bg-zinc-800/30 text-teal-600 dark:border-amber-400/40 dark:text-zinc-100':
                  type === selected,
                'border border-white/10 text-zinc-400 transition-colors duration-200 hover:text-zinc-400/80 dark:text-zinc-300/90 dark:hover:text-zinc-200':
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
                  className="absolute inset-0 rounded bg-zinc-800/30"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.1 },
                  }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10 capitalize">{type}</span>
          </button>
        ))}
      </div>
      <SectionSeparator mt={0} mb={6} />
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-9 gap-y-6 text-sm sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
        {projectsList.length ? (
          projectsList.map((project: any, i: number) => (
            <motion.div
              key={project._id}
              initial={{
                opacity: 0,
                translateX: -5,
                translateY: -5,
              }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.3, delay: 0.05 + i * 0.1 }}
            >
              <ProjectPreview
                slug={project.slug}
                coverImage={project.coverImage}
                title={project.title}
                projectType={project.projectType}
                intro={project.intro}
                technologies={project.technologies}
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
