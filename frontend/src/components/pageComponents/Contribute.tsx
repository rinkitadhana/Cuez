import React from "react"
import { FaGithub } from "react-icons/fa"

const Contribute = () => {
  return (
    <div className="rounded-xl p-6 w-full max-w-md border border-zinc-700">
      <h2 className="text-2xl font-semibold text-center mb-2 text-white">
        Contribute to Cuez
      </h2>
      <p className="text-gray-400 text-center mb-6">
        Help us improve Cuez by contributing to our open-source project
      </p>
      <a
        href="https://github.com/rinkitadhana/cuez"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-[#2a2a2a] text-white py-2 px-4 rounded-md hover:bg-[#3a3a3a] transition-colors border border-[#3a3a3a]"
      >
        <FaGithub />
        <span>View on GitHub</span>
      </a>
    </div>
  )
}

export default Contribute
