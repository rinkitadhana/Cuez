"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

interface PageHeadProps {
  title: string
  description?: string
}

export default function PageHead({ title, description }: PageHeadProps) {
  const pathname = usePathname()

  useEffect(() => {
    document.title = title

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute("content", description)
      } else {
        const meta = document.createElement("meta")
        meta.name = "description"
        meta.content = description
        document.head.appendChild(meta)
      }
    }
  }, [title, description, pathname])

  return null
}
