"use client"
import { ImagePlus, SmilePlus, X } from "lucide-react"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { MdOutlineVideoCameraBack } from "react-icons/md"
import EmojiPicker from "emoji-picker-react"
import { Theme, EmojiStyle } from "emoji-picker-react"

const CreatePost = () => {
  const [postContent, setPostContent] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<
    Array<{ type: "image" | "video"; url: string }>
  >([])
  const modalRef = useRef<HTMLDivElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)
  const warningRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (postContent.trim() || selectedMedia.length > 0) {
          setShowWarning(true)
        } else {
          setIsModalOpen(false)
        }
      }
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false)
      }
      if (
        warningRef.current &&
        !warningRef.current.contains(event.target as Node)
      ) {
        setShowWarning(false)
      }
    }

    if (isModalOpen || showEmojiPicker || showWarning) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isModalOpen, showEmojiPicker, showWarning, postContent, selectedMedia])

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

  const onEmojiClick = (emojiObject: any) => {
    setPostContent((prev) => prev + emojiObject.emoji)
  }

  const handleDiscard = () => {
    setPostContent("")
    setSelectedMedia([])
    setIsModalOpen(false)
    setShowWarning(false)
  }

  const handleCancel = () => {
    setShowWarning(false)
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
                      <div
                        ref={emojiPickerRef}
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowEmojiPicker(!showEmojiPicker)
                        }}
                        className={`${
                          showEmojiPicker ? "bg-zinc-800" : "hover:bg-zinc-800"
                        } p-2  rounded-xl transition-all duration-200 cursor-pointer relative`}
                      >
                        <SmilePlus size={20} />
                        {showEmojiPicker && (
                          <div
                            className="absolute top-full left-0 mt-2 z-20"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <EmojiPicker
                              onEmojiClick={onEmojiClick}
                              theme={Theme.DARK}
                              searchPlaceholder="Search emoji..."
                              width={350}
                              height={400}
                              emojiStyle={EmojiStyle.NATIVE}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      )}

      {showWarning && (
        <div className="fixed inset-0 bg-bgClr/50 backdrop-blur-sm flex justify-center items-center z-[10000]">
          <div
            ref={warningRef}
            className="bg-bgClr border border-zinc-700 w-full max-w-[400px] rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Discard changes?</h2>
            <p className="text-zinc-400 mb-6">
              You have unsaved changes. Are you sure you want to discard them?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-xl font-semibold hover:bg-zinc-800 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDiscard}
                className="px-4 py-2 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost
