import React from "react"
import { FaGithub } from "react-icons/fa"

const GithubStar = () => {
  return (
    <div className="rounded-xl p-6 w-full max-w-md border border-zinc-700 transition-all duration-300">
      <h2 className="text-xl font-semibold text-center mb-3">
        Star us on GitHub
      </h2>
      <p className="text-zinc-400 text-center mb-6 text-sm">
        Support our open source project by giving us a star on GitHub!
      </p>
      <div className="flex flex-col items-center gap-4">
        <a
          href="https://github.com/rinkitadhana/cuez"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 py-2.5 px-3 bg-zinc-100 hover:bg-zinc-300 w-full rounded-xl text-black justify-center transition-colors duration-200"
        >
          <FaGithub className="text-lg" />
          <span>Star on GitHub</span>
        </a>
      </div>
    </div>
  )
}

export default GithubStar
