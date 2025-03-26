"use client"

import Image from "next/image"
import { Rocket, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set target date to 30 days from now
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8 p-8 text-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-mainclr/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-mainclr/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="relative">
          <Image
            src="/img/icon/cuez-name.png"
            alt="Cuez Logo"
            width={200}
            height={200}
            className="select-none animate-float"
          />
          <div className="absolute -top-4 -right-4 bg-mainclr p-2 rounded-full animate-bounce">
            <Rocket className="text-white" size={24} />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-mainclr/20 p-2 rounded-full animate-pulse">
            <Sparkles className="text-mainclr" size={20} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 z-10">
        <h1 className="text-4xl font-bold bg-mainclr bg-clip-text text-transparent animate-fade-in">
          Coming Soon!
        </h1>
        <p className="text-zinc-400 max-w-md text-lg">
          We&apos;re crafting something extraordinary. Get ready for an amazing
          experience!
        </p>
      </div>

      {/* Countdown Timer */}
      <div className="flex gap-6 mt-4 z-10">
        <div className="flex flex-col items-center">
          <div className="bg-mainclr/10 px-4 py-2 rounded-lg">
            <span className="text-2xl font-bold text-mainclr">
              {timeLeft.days}
            </span>
          </div>
          <span className="text-sm text-zinc-500 mt-1">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-mainclr/10 px-4 py-2 rounded-lg">
            <span className="text-2xl font-bold text-mainclr">
              {timeLeft.hours}
            </span>
          </div>
          <span className="text-sm text-zinc-500 mt-1">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-mainclr/10 px-4 py-2 rounded-lg">
            <span className="text-2xl font-bold text-mainclr">
              {timeLeft.minutes}
            </span>
          </div>
          <span className="text-sm text-zinc-500 mt-1">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-mainclr/10 px-4 py-2 rounded-lg">
            <span className="text-2xl font-bold text-mainclr">
              {timeLeft.seconds}
            </span>
          </div>
          <span className="text-sm text-zinc-500 mt-1">Seconds</span>
        </div>
      </div>
      {/* Contact Section */}
      <div className="flex flex-col items-center mt-8 z-10">
        <h2 className="text-xl font-semibold text-zinc-200 mb-4">Contact Us</h2>
        <div className="flex gap-6">
          <a
            href="https://twitter.com/damnGruz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-mainclr/10 px-4 py-2 rounded-lg hover:bg-mainclr/20 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-mainclr"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
            <span className="text-zinc-300">Twitter</span>
          </a>
          <a
            href="mailto:therinkit@gmail.com"
            className="flex items-center gap-2 bg-mainclr/10 px-4 py-2 rounded-lg hover:bg-mainclr/20 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-mainclr"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="text-zinc-300">Email</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon
