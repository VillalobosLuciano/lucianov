import { Container } from '@/components/Container'
import Link from 'next/link'
import ProjectPreview from './ProjectPreview'
import ProjectsSlider from '@/components/ui/ProjectsSlider'

export default function FeaturedProjects({ projects }: any) {
  const featuredProjects = projects.slice(0, 3)
  return (
    <Container className="pt-20">
      <div className="max-w-2xl px-2 pb-8 font-display lg:mx-0">
        <h2 className="text-5xl font-semibold text-zinc-200">Projects</h2>
        <p className="mt-4 text-lg leading-normal tracking-tight text-zinc-400">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC.
        </p>
      </div>

      <ProjectsSlider projects={featuredProjects} />

      {projects.length ? (
        <div className="mx-auto hidden max-w-2xl grid-cols-1 gap-1 text-sm sm:grid-cols-2 md:grid lg:max-w-none lg:grid-cols-3">
          {featuredProjects.map((project: any) => (
            <div className="px-3 pb-3" key={project._id}>
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

      <div className="mt-8 mb-4 flex sm:hidden">
        <Link href="/projects">
          <a className="mx-4 w-full rounded-md border border-teal-600/40 py-2 text-center text-base font-semibold text-teal-600/90 dark:border-amber-500/40 dark:text-amber-500/90 md:hidden">
            View all<span aria-hidden="true"> &rarr;</span>
          </a>
        </Link>
      </div>
    </Container>
  )
}
