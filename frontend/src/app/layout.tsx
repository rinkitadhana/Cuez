import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../styles/globals.css"
import { TanstackProvider } from "@/components/providers/tanstack-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Cuez",
  description: "Cuez - A social media app for programmers",
  icons: {
    icon: {
      url: "./img/icon/cuez-logo.png",
      type: "image/png",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider> {children}</TanstackProvider>
      </body>
    </html>
  )
}
