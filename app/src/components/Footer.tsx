import Link from 'next/link'

import { Container } from '@/components/Container'

export function Footer() {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-900 md:mt-8 font-display">
      <Container>
        <div className="flex flex-col items-center border-t border-zinc-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex space-x-4">
            <Link href="#">
              <a className="group">
                <span className="sr-only">TaxPal on Twitter</span>
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 fill-zinc-400 transition-colors group-hover:fill-zinc-300"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
                </svg>
              </a>
            </Link>
            <Link href="#">
              <a className="group">
                <span className="sr-only">TaxPal on GitHub</span>
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 fill-zinc-400 transition-colors group-hover:fill-zinc-300"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
              </a>
            </Link>
            <Link href="#">
              <a className="group">
                <span className="sr-only">TaxPal on GitHub</span>
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 fill-zinc-400 transition-colors group-hover:fill-zinc-300"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </a>
            </Link>
          </div>
          <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400 sm:mt-0">
            Luciano Villalobos • {new Date().getFullYear()}
          </p>
        </div>
      </Container>
    </footer>
  )
}
