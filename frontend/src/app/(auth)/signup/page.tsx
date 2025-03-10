"use client"
import Input from "@/components/Input"
import { useSendOtp } from "@/hooks/useSendOTP"
import { useRegister } from "@/hooks/useSignup"
import Footer from "@/layout/Footer"
import useMessageStore from "@/store/messageStore"
import {
  Eye,
  EyeOff,
  Hash,
  LoaderCircle,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const SignUp = () => {
  const { setMessage } = useMessageStore()
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)
  const [otp, setOtp] = useState<string>("")
  const [timer, setTimer] = useState<number>(0)
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [usernameError, setUsernameError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [otpError, setOtpError] = useState<boolean>(false)
  const { mutate: sendOtp } = useSendOtp()
  const { mutate: register, isPending: isRegistering } = useRegister()

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
    sendOtp(email)
  }

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (username == "") {
      setUsernameError(true)
      setTimeout(() => {
        setUsernameError(false)
      }, 5000)
    }
    if (email == "") {
      setEmailError(true)
      setTimeout(() => {
        setEmailError(false)
      }, 5000)
    }
    if (password == "") {
      setPasswordError(true)
      setTimeout(() => {
        setPasswordError(false)
      }, 5000)
    }
    if (confirmPassword == "") {
      setPasswordError(true)
      setTimeout(() => {
        setPasswordError(false)
      }, 5000)
    }
    if (otp == "") {
      setOtpError(true)
      setTimeout(() => {
        setOtpError(false)
      }, 5000)
    }
    if (!passwordsMatch) {
      setMessage("Password doesn't match!", "error")
      return
    }
    register({
      email,
      username,
      password,
      otp,
    })
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
    if (password) {
      if (confirmPassword) {
        setPasswordsMatch(password === confirmPassword)
      } else {
        setPasswordsMatch(false)
      }
    } else {
      setPasswordsMatch(true)
    }
  }, [password, confirmPassword])

  return (
    <section className="flex flex-col py-4 h-screen">
      <div className="flex-grow sin-screen ">
        <form className=" flex flex-col gap-6" onSubmit={handleSignup}>
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
              error={usernameError}
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
              error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              ficon={<LockKeyhole strokeWidth={1.5} />}
              licon1={<Eye strokeWidth={1.5} />}
              licon2={<EyeOff strokeWidth={1.5} />}
            />
            <Input
              text="Confirm password"
              type="password"
              value={confirmPassword}
              error={!passwordsMatch || passwordError}
              onChange={(e) => setConfirmPassword(e.target.value)}
              ficon={<LockKeyhole strokeWidth={1.5} />}
              licon1={<Eye strokeWidth={1.5} />}
              licon2={<EyeOff strokeWidth={1.5} />}
            />
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1">
                <Input
                  text="Code"
                  type="text"
                  value={otp}
                  error={otpError}
                  onChange={(e) => setOtp(e.target.value)}
                  ficon={<Hash strokeWidth={1.5} />}
                />
              </div>
              <button
                className={` ${
                  isButtonDisabled ? "trans-btn-n " : "trans-btn"
                }`}
                onClick={handleSendOTP}
                disabled={isButtonDisabled}
                type="button"
              >
                {isButtonDisabled
                  ? `Resend in ${formatTimer(timer)}s`
                  : "Send code"}
              </button>
            </div>
          </div>
          <div className=" flex flex-col gap-4">
            <button
              disabled={isRegistering}
              type="submit"
              className="blue-btn"
            >
              {isRegistering ? (
                <div className="flex items-center justify-center gap-2">
                  <LoaderCircle className="animate-spin" />
                  Loading
                </div>
              ) : (
                "Sign up"
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
