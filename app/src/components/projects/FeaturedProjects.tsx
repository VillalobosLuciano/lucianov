import { Container } from '@/components/Container'
import Link from 'next/link'
import ProjectPreview from './ProjectPreview'
import ProjectsSlider from '@/components/ui/ProjectsSlider'
import { ChevronRightIcon } from '@heroicons/react/solid'

export default function FeaturedProjects({ projects }: any) {
  const featuredProjects = projects.slice(0, 3)
  return (
    <Container className="mb-28">
      <ProjectsSlider projects={featuredProjects} />
      {projects.length ? (
        <div className="mx-auto hidden max-w-2xl grid-cols-1 gap-x-9 gap-y-6 text-sm sm:grid-cols-2 md:grid lg:max-w-none lg:grid-cols-3">
          {featuredProjects.map((project: any) => (
            <div key={project._id}>
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
      ) : (
        <div className="text-center">No Projects Yet</div>
      )}

      <div className="flex sm:hidden">
        <Link href="/projects">
          <a className="mx-auto flex items-center rounded-full border border-amber-500/40 px-6 py-2 text-center text-teal-600/90 dark:text-zinc-200 md:hidden">
            View all projects
            <ChevronRightIcon className="ml-2 -mr-2 mt-[2px] h-6 w-6 dark:text-amber-500/90" />
          </a>
        </Link>
      </div>
    </Container>
  )
}
