import clsx from 'clsx'
import { Container } from '@/components/Container'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectPreview from '@/components/projects/ProjectPreview'
import ProjectList from '@/components/projects/ProjectList'
import ProjectSlider from './ProjectSlider'

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
    <Container className="py-10">
      <div className="mx-auto max-w-2xl px-2 pb-4 font-display lg:mx-0">
        <h2 className="text-3xl font-medium tracking-tighter text-amber-500">
          Projects
        </h2>
        <p className="mt-4 text-lg leading-normal tracking-tight text-zinc-400">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC.
        </p>
      </div>
      <div className="mt-6 mb-8 flex flex-wrap gap-4 px-2">
        {projectTypes.map((type: any, index: number) => (
          <button
            key={type}
            className={clsx(
              'relative cursor-pointer rounded border-transparent px-4 py-1.5 text-sm font-semibold capitalize tracking-wide transition-colors delay-150 hover:delay-[0ms]',
              {
                'text-teal-600" border border-teal-600/30 dark:border-amber-500/30 dark:text-amber-500':
                  type === selected,
                'dark:hover:text-zinc-200" border border-zinc-800 text-zinc-500/90 hover:text-zinc-500 dark:text-zinc-300':
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
      <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-2 text-sm sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
        {projectsList.length ? (
          projectsList.map((project: any) => (
            <div className="px-3 pb-3" key={project._id}>
              <ProjectPreview
                slug={project.slug}
                coverImage={project.coverImage}
                title={project.title}
                projectType={project.projectType}
                description={project.description}
              />
            </div>
          ))
        ) : (
          <div className="text-center">No Projects Yet</div>
        )}
      </div>
    </Container>
  )
}
