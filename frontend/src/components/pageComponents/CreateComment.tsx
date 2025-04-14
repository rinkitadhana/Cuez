import { ArrowUpFromDot, ImagePlus, SmilePlus, X } from "lucide-react"
import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useGetMe } from "@/hooks/useAuth"
import { MdOutlineVideoCameraBack } from "react-icons/md"
import EmojiPickerPortal from "./EmojiPickerPortal"

const CreateComment = () => {
  const { data: authUser } = useGetMe()
  const [formData, setFormData] = useState<{
    text?: string
    img?: string
    video?: string
  }>({
    text: "",
    img: "",
    video: "",
  })
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [emojiPosition, setEmojiPosition] = useState<"top" | "bottom">("bottom")
  const [selectedFiles, setSelectedFiles] = useState<{
    imageFile?: File
    videoFile?: File
  }>({})
  const emojiButtonRef = useRef<HTMLButtonElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const hasMedia = !!formData.img || !!formData.video

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false)
      }
    }

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showEmojiPicker])

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    setFormData((prev) => ({
      ...prev,
      text: (prev.text || "") + emojiObject.emoji,
    }))
  }

  const clearMedia = () => {
    setFormData((prev) => ({
      ...prev,
      img: "",
      video: "",
    }))
    setSelectedFiles({})
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFiles({ imageFile: file })
      setFormData((prev) => ({
        ...prev,
        img: URL.createObjectURL(file),
        video: "",
      }))
    }
  }

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFiles({ videoFile: file })
      setFormData((prev) => ({
        ...prev,
        video: URL.createObjectURL(file),
        img: "",
      }))
    }
  }

  const toggleEmojiPicker = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!showEmojiPicker) {
      if (emojiButtonRef.current) {
        const rect = emojiButtonRef.current.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom
        const spaceNeeded = 400

        if (spaceBelow < spaceNeeded) {
          setEmojiPosition("top")
        } else {
          setEmojiPosition("bottom")
        }
      }
    }

    setShowEmojiPicker(!showEmojiPicker)
  }

  return (
    <div className="flex items-start gap-4 p-4 border-y border-zinc-700 w-full">
      <Image
        src={authUser?.user.profileImg || ""}
        alt="user avatar"
        width={32}
        height={32}
        className="rounded-xl size-[34px] select-none"
      />
      <div className="flex-1">
        <textarea
          ref={textareaRef}
          value={formData.text}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              text: e.target.value,
            }))
            e.target.style.height = "auto"
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          placeholder="Add a comment..."
          className="w-full outline-none bg-transparent resize-none overflow-hidden min-h-[40px]"
        />
        {(formData.img || formData.video) && (
          <div className="relative w-full mt-2">
            <div className="relative">
              {formData.img ? (
                <Image
                  src={formData.img}
                  alt="Selected image"
                  className="rounded-lg w-full"
                  width={1000}
                  height={1000}
                />
              ) : (
                <video
                  src={formData.video}
                  controls
                  className="rounded-lg w-full"
                />
              )}
              <button
                type="button"
                onClick={clearMedia}
                className="absolute top-2 right-2 bg-black/50 text-white px-2 py-2 rounded-full hover:bg-black/70 transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-start gap-2">
        <button
          onClick={() => document.getElementById("imageInput")?.click()}
          disabled={hasMedia}
          className={`p-1.5 ${
            hasMedia
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-zinc-700 bg-zinc-800 border border-zinc-700"
          } rounded-xl transition-all duration-200`}
        >
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
            disabled={hasMedia}
          />
          <ImagePlus size={18} className={hasMedia ? "opacity-50" : ""} />
        </button>
        <button
          onClick={() => document.getElementById("videoInput")?.click()}
          disabled={hasMedia}
          className={`p-1.5 ${
            hasMedia
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-zinc-700 bg-zinc-800 border border-zinc-700"
          } rounded-xl transition-all duration-200`}
        >
          <input
            id="videoInput"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoSelect}
            disabled={hasMedia}
          />
          <MdOutlineVideoCameraBack
            size={18}
            className={hasMedia ? "opacity-50" : ""}
          />
        </button>
        <div className="relative">
          <button
            ref={emojiButtonRef}
            onClick={toggleEmojiPicker}
            className={`p-1.5 ${
              showEmojiPicker
                ? "bg-zinc-800"
                : "hover:bg-zinc-700 bg-zinc-800 border border-zinc-700"
            } rounded-xl transition-all duration-200`}
          >
            <SmilePlus size={18} />
          </button>
          <EmojiPickerPortal
            isOpen={showEmojiPicker}
            onClose={() => setShowEmojiPicker(false)}
            onEmojiClick={onEmojiClick}
            buttonRef={emojiButtonRef}
            position={emojiPosition}
          />
        </div>
        <button className="p-1.5 bg-mainclr w-fit h-fit hover:bg-mainclr/80 rounded-xl transition-all duration-200">
          <ArrowUpFromDot size={20} />
        </button>
      </div>
    </div>
  )
}

export default CreateComment
