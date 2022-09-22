import { useState } from 'react'

export default function Search({ handleSearch, searchInput }: any) {
  return (
    <div className="relative w-full">
      <input
        aria-label="Search posts"
        type="text"
        value={searchInput}
        onChange={handleSearch}
        placeholder="Search posts..."
        className="block w-full rounded-md border py-2 pl-10 text-zinc-400 placeholder-zinc-400/50 dark:border-zinc-500/40 dark:bg-zinc-900 dark:text-zinc-300 dark:focus:ring-zinc-500/60"
      />
      <svg
        className="absolute left-3 top-3 h-5 w-5 text-teal-600/90 dark:text-zinc-500/60"
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
