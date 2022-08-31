import { Container } from '@/components/Container'
import Link from 'next/link'
import ProjectList from './ProjectList'

export default function FeaturedProjects({ projects }: any) {
  const featuredProjects = projects.slice(0, 3)
  return (
    <Container className="pt-20 pb-16">
      <p className="mt-2 px-4 pb-4 leading-snug text-zinc-400 lg:pb-12">
        Projects I developed for learning, for friends, for free, for<b> fun</b>
        .
      </p>

      {projects.length ? (
        <ProjectList projects={featuredProjects} />
      ) : (
        <div className="text-center">No Projects Yet</div>
      )}

      <div className="mt-6 mb-4 flex sm:hidden">
        <Link href="/projects">
          <a className="mx-4 w-full rounded-md border border-teal-600/40 py-2 text-center text-base font-semibold text-teal-600/90 dark:border-amber-500/40 dark:text-amber-500/90 md:hidden">
            View all<span aria-hidden="true"> &rarr;</span>
          </a>
        </Link>
      </div>
    </Container>
  )
}
