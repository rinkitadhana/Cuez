const BetaNotification = () => {
  return (
    <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-zinc-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-sm text-zinc-200">
          You are using a beta version. Your feedback helps us create a better
          platform.
        </p>
      </div>
    </div>
  )
}

export default BetaNotification
