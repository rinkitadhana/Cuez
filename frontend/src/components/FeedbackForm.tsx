"use client"

import { useState } from "react"
import Input from "./Input"
import { LoaderCircle } from "lucide-react"
import { useCreateFeedback, FeedbackInput } from "@/hooks/useFeedback"

const FeedbackForm = () => {
  const { mutate: createFeedback, isPending } = useCreateFeedback()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim() && !description.trim()) {
      setError(true)
      setTimeout(() => setError(false), 5000)
      return
    }
    const feedbackData: FeedbackInput = { title, description }
    createFeedback(feedbackData)
    setTitle("")
    setDescription("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 border rounded-xl border-zinc-700 p-4"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold">Feedback</h2>
        <p className="text-sm text-zinc-400">
          Request a feature or report a bug.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Input
          text="Title"
          type="text"
          value={title}
          error={error}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
              e.target.style.height = "auto"
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            placeholder="Description"
            className={`w-full px-4 py-2.5 placeholder:select-none bg-transparent border rounded-[10px] placeholder:text-zinc-500 outline-none transition-colors duration-200 min-h-[120px] overflow-hidden resize-none ${
              error ? "border-red-500" : "border-zinc-500 focus:border-mainclr"
            }`}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">
              Title and description are required!
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className=" font-semibold select-none text-center   px-3 py-2 bg-mainclr hover:bg-mainclr/70 cursor-pointer transition duration-200 rounded-xl"
      >
        {isPending ? (
          <div className="flex items-center justify-center">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          "Submit Feedback"
        )}
      </button>
    </form>
  )
}

export default FeedbackForm
