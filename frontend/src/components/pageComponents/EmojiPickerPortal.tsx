import React, { useRef } from "react"
import { createPortal } from "react-dom"
import EmojiPicker from "emoji-picker-react"
import { Theme, EmojiStyle } from "emoji-picker-react"

interface EmojiPickerPortalProps {
  isOpen: boolean
  onClose: () => void
  onEmojiClick: (emojiObject: { emoji: string }) => void
  buttonRef: React.RefObject<HTMLButtonElement | null>
  position: "top" | "bottom"
  pickerRef?: React.RefObject<HTMLDivElement | null>
}

const EmojiPickerPortal: React.FC<EmojiPickerPortalProps> = ({
  isOpen,
  onEmojiClick,
  buttonRef,
  position,
  pickerRef,
}) => {
  const localPickerRef = useRef<HTMLDivElement>(null)
  const usedPickerRef = pickerRef || localPickerRef

  if (!isOpen) return null

  const buttonRect = buttonRef.current?.getBoundingClientRect()
  if (!buttonRect) return null

  const style = {
    position: "fixed" as const,
    top:
      position === "bottom"
        ? `${buttonRect.bottom + 8}px`
        : `${buttonRect.top - 408}px`,
    left: `${buttonRect.left}px`,
    zIndex: 50,
  }

  return createPortal(
    <div
      ref={usedPickerRef}
      style={style}
      onClick={(e) => e.stopPropagation()}
      data-name="emoji-picker"
    >
      <EmojiPicker
        onEmojiClick={onEmojiClick}
        theme={Theme.DARK}
        searchPlaceholder="Search emoji..."
        width={350}
        height={400}
        emojiStyle={EmojiStyle.NATIVE}
      />
    </div>,
    document.body
  )
}

export default EmojiPickerPortal
