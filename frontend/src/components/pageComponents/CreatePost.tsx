"use client"
import { ImagePlus, SmilePlus, Video, X } from "lucide-react"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { MdOutlineVideoCameraBack } from "react-icons/md"

const CreatePost = () => {
  const [postContent, setPostContent] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<
    Array<{ type: "image" | "video"; url: string }>
  >([])
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isModalOpen])

  const handleMediaSelect = (file: File, type: "image" | "video") => {
    if (selectedMedia.length >= 4) return

    const url = URL.createObjectURL(file)
    setSelectedMedia((prev) => [...prev, { type, url }])
  }

  const removeMedia = (index: number) => {
    setSelectedMedia((prev) => {
      const newMedia = [...prev]
      URL.revokeObjectURL(newMedia[index].url)
      newMedia.splice(index, 1)
      return newMedia
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle post submission here
    console.log("Post content:", postContent)
    setPostContent("")
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-3 py-2 rounded-xl bg-mainclr text-white font-semibold hover:bg-mainclr/80 transition-all duration-200"
      >
        Create a post
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-bgClr/50 backdrop-blur-sm flex justify-center z-[9999] py-10">
          <div
            ref={modalRef}
            className="bg-bgClr border border-zinc-700 w-full max-w-[600px] rounded-xl p-4  h-fit "
          >
            <section className="flex flex-col gap-4">
              <div className="flex justify-between items-center sticky top-0 bg-bgClr z-10 py-2">
                <Image
                  src="/img/pfp/Gruz.jpeg"
                  alt="profile"
                  width={32}
                  height={32}
                  className="rounded-lg size-9 select-none"
                />
                <div className="flex gap-2 items-center">
                  <button
                    type="submit"
                    disabled={!postContent.trim()}
                    className="px-4 py-1 bg-mainclr text-white font-semibold rounded-xl hover:bg-mainclr/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
                    <div>
                      <textarea
                        value={postContent}
                        onChange={(e) => {
                          setPostContent(e.target.value)
                          // Auto-resize textarea
                          e.target.style.height = "auto"
                          e.target.style.height = `${e.target.scrollHeight}px`
                        }}
                        placeholder="What's happening?"
                        className="w-full bg-transparent border-none outline-none resize-none text-lg placeholder:text-zinc-500 min-h-[120px]"
                        rows={3}
                        autoFocus
                      />
                    </div>
                    {selectedMedia.length > 0 && (
                      <div className="relative w-full">
                        <div
                          className={`grid gap-2 ${
                            selectedMedia.length === 1
                              ? "grid-cols-1"
                              : selectedMedia.length === 2
                              ? "grid-cols-2"
                              : selectedMedia.length === 3
                              ? "grid-cols-2"
                              : "grid-cols-2"
                          }`}
                        >
                          {selectedMedia.map((media, index) => (
                            <div key={index} className="relative aspect-square">
                              {media.type === "image" ? (
                                <Image
                                  src={media.url}
                                  alt={`Selected image ${index + 1}`}
                                  fill
                                  className="rounded-lg object-cover"
                                />
                              ) : (
                                <video
                                  src={media.url}
                                  controls
                                  className="rounded-lg w-full h-full object-cover"
                                />
                              )}
                              <button
                                onClick={() => removeMedia(index)}
                                className="absolute top-2 right-2 bg-black/50 text-white px-2 py-2 rounded-full hover:bg-black/70 transition-all duration-200"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                          {selectedMedia.length}/4
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between sticky bottom-0 bg-bgClr z-10 py-2">
                    <div className="flex gap-3 text-zinc-100">
                      <label className="p-2 hover:bg-zinc-800 rounded-xl transition-all duration-200 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleMediaSelect(file, "image")
                            }
                          }}
                          disabled={selectedMedia.length >= 4}
                        />
                        <ImagePlus
                          size={20}
                          className={
                            selectedMedia.length >= 4 ? "opacity-50" : ""
                          }
                        />
                      </label>
                      <label className="p-2 hover:bg-zinc-800 rounded-xl transition-all duration-200 cursor-pointer">
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleMediaSelect(file, "video")
                            }
                          }}
                          disabled={selectedMedia.length >= 4}
                        />
                        <MdOutlineVideoCameraBack
                          size={22}
                          className={
                            selectedMedia.length >= 4 ? "opacity-50" : ""
                          }
                        />
                      </label>
                      <div className="p-2 hover:bg-zinc-800 rounded-xl transition-all duration-200 cursor-pointer">
                        <SmilePlus size={20} />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost
