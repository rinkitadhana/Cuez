"use client"
import ButtonBlue from "@/components/ButtonBlue"
import Input from "@/components/Input"
import Footer from "@/layout/Footer"
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const LogIn = () => {
  const [identifier, setIdentifier] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Identifier:", identifier)
    console.log("Password:", password)
  }

  return (
    <section className="flex flex-col py-4 h-screen">
      <div className="flex-grow sin-screen ">
        <form className=" flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className=" flex flex-col gap-4">
            <Image
              className=" size-50 select-none"
              src="/img/icon/cuez-name.png"
              height={180}
              width={180}
              alt="company_logo"
            />
            {/* <h1 className=" text-mainclr text-5xl font-bold">Cuez</h1> */}
            <p>Please enter your email or username and your password.</p>
          </div>
          <div className=" flex flex-col gap-4">
            <Input
              text="Username / email address"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              ficon={<UserRound strokeWidth={1.5} />}
            />
            <Input
              text="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ficon={<LockKeyhole strokeWidth={1.5} />}
              licon1={<Eye strokeWidth={1.5} />}
              licon2={<EyeOff strokeWidth={1.5} />}
            />
          </div>
          <div className=" flex flex-col gap-4">
            <ButtonBlue text="Log in" />
            <div className="  flex justify-between">
              <Link
                href="forgot-password"
                className=" text-mainclr hover:text-mainclr/80 transition duration-200 cursor-pointer"
              >
                forgot password?
              </Link>
              <Link
                href="/signup"
                className=" text-mainclr hover:text-mainclr/80 transition duration-200 cursor-pointer"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </section>
  )
}

export default LogIn
