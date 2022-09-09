import { useState } from 'react'

export default function Search({ handleSearch, searchInput }: any) {
  return (
    <div className="relative w-full md:w-1/2">
      <input
        aria-label="Search posts"
        type="text"
        value={searchInput}
        onChange={handleSearch}
        placeholder="Search posts"
        className="block w-full rounded-md border border-teal-600/30 bg-zinc-200 px-4 py-2 text-zinc-400 placeholder-zinc-400 focus:border-teal-600/30 focus:ring-teal-600/50 dark:border-amber-500/50 dark:bg-zinc-800/10 dark:text-zinc-300 dark:focus:border-amber-500/50 dark:focus:ring-amber-500/50"
      />
      <svg
        className="absolute right-3 top-3 h-5 w-5 text-teal-600/90 dark:text-amber-500/90"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  )
}
