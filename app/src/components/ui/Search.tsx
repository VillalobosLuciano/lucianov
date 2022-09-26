import { useState } from 'react'
import { SearchIcon, XIcon } from '@heroicons/react/solid/'
import clsx from 'clsx'

export default function Search({ handleSearch, searchInput, openSearch }: any) {
  return (
    <div className="relative flex w-full items-center">
      <input
        aria-label="Search posts"
        type="text"
        value={searchInput}
        onChange={handleSearch}
        placeholder="Search posts..."
        className={clsx(
          'block w-full rounded-md border pl-9 text-zinc-400 placeholder-zinc-400/50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:focus:ring-zinc-400/80',
          {
            'py-[3px] text-sm': openSearch,
            'py-2': !openSearch,
          }
        )}
      />
      <SearchIcon className="absolute left-3 h-4 w-4 text-teal-600/90 dark:text-zinc-500" />
    </div>
  )
}
