"use client"
import Input from "@/components/Input"
import { useLogin } from "@/hooks/useLogin"
import Footer from "@/layout/Footer"
import { Eye, EyeOff, LoaderCircle, LockKeyhole, UserRound } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const LogIn = () => {
  const [identifier, setIdentifier] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [identifierError, setIdentifierError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const { mutate: login, isPending: isLoggingIn } = useLogin()

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (identifier == "") {
      setIdentifierError(true)
      setTimeout(() => {
        setIdentifierError(false)
      }, 5000)
    }
    if (password == "") {
      setPasswordError(true)
      setTimeout(() => {
        setPasswordError(false)
      }, 5000)
    }
    login({ identifier, password })
  }

  return (
    <section className="flex flex-col py-4 h-screen">
      <div className="flex-grow sin-screen ">
        <form className=" flex flex-col gap-6" onSubmit={handleLogin}>
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
              error={identifierError}
              onChange={(e) => setIdentifier(e.target.value)}
              ficon={<UserRound strokeWidth={1.5} />}
            />
            <Input
              text="Password"
              type="password"
              value={password}
              error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              ficon={<LockKeyhole strokeWidth={1.5} />}
              licon1={<Eye strokeWidth={1.5} />}
              licon2={<EyeOff strokeWidth={1.5} />}
            />
          </div>
          <div className=" flex flex-col gap-4">
            <button
              disabled={isLoggingIn}
              className="blue-btn"
              type="submit"
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center gap-2">
                  <LoaderCircle className="animate-spin" />
                </div>
              ) : (
                "Log in"
              )}
            </button>
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
