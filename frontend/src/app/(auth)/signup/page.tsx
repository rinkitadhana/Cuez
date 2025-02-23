"use client"
import ButtonBlue from "@/components/ButtonBlue"
import Error from "@/components/Error"
import Input from "@/components/Input"
import Footer from "@/layout/Footer"
import { Eye, EyeOff, Hash, LockKeyhole, Mail, UserRound } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const SignUp = () => {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)
  const [code, setCode] = useState<string>("")
  const [timer, setTimer] = useState<number>(0)
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)

  const handleSendOTP = () => {
    if (email == "") {
      setEmailError(true)
      setTimeout(() => {
        setEmailError(false)
      }, 5000)
    } else {
      setEmailError(false)
      setIsButtonDisabled(true)
      setTimer(30)
    }
  }

  const formatTimer = (time: number): string => {
    return time < 10 ? `0${time}` : `${time}`
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1
          return newTimer
        })
      }, 1000)
    } else {
      setIsButtonDisabled(false)
    }

    return () => clearInterval(interval)
  }, [timer])

  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordsMatch(password === confirmPassword)
    } else {
      setPasswordsMatch(true)
    }
  }, [password, confirmPassword])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Username:", username)
    console.log("Email:", email)
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
            <p>
              Please enter all required credentials and a valid email address.
            </p>
          </div>
          <div className=" flex flex-col gap-4">
            <Input
              text="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ficon={<UserRound strokeWidth={1.5} />}
            />
            <Input
              text="Email address"
              type="email"
              value={email}
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
              ficon={<Mail strokeWidth={1.5} />}
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
            <Input
              text="Confirm password"
              type="password"
              value={confirmPassword}
              error={!passwordsMatch}
              onChange={(e) => setConfirmPassword(e.target.value)}
              ficon={<LockKeyhole strokeWidth={1.5} />}
              licon1={<Eye strokeWidth={1.5} />}
              licon2={<EyeOff strokeWidth={1.5} />}
            />
            {!passwordsMatch && <Error text="Password doesn't match!" />}
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1">
                <Input
                  text="Code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  ficon={<Hash strokeWidth={1.5} />}
                />
              </div>
              <button
                className={` ${
                  isButtonDisabled ? "trans-btn-n " : "trans-btn"
                }`}
                onClick={handleSendOTP}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled
                  ? `Resend in ${formatTimer(timer)}s`
                  : "Send code"}
              </button>
            </div>
          </div>
          <div className=" flex flex-col gap-4">
            <ButtonBlue text="Sign up" />
            <div className="  flex justify-between">
              <Link
                href="forgot-password"
                className=" text-mainclr hover:text-mainclr/80 transition duration-200 cursor-pointer"
              >
                forgot password?
              </Link>
              <Link
                href="/login"
                className=" text-mainclr hover:text-mainclr/80 transition duration-200 cursor-pointer"
              >
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </section>
  )
}

export default SignUp
