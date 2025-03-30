import React from "react"
import { FaGithub, FaStar } from "react-icons/fa"

const GithubStar = () => {
  return (
    <div className="rounded-xl p-6 w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300">
      <h2 className="text-xl font-semibold text-center mb-3 text-zinc-900 dark:text-zinc-100">
        Star us on GitHub
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 text-center mb-6 text-sm">
        Support our open source project by giving us a star on GitHub!
      </p>
      <div className="flex flex-col items-center gap-4">
        <a
          href="https://github.com/rinkitadhana/cuez"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium py-2.5 px-4 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-200"
        >
          <FaGithub className="text-lg" />
          <span>Star on GitHub</span>
        </a>

      </div>
    </div>
  )
}

export default GithubStar
