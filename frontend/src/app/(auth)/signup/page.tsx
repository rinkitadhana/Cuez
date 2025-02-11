import ButtonBlue from "@/components/ButtonBlue"
import ButtonTrans from "@/components/ButtonTrans"
import Input from "@/components/Input"
import Footer from "@/layout/Footer"
import { Eye, EyeOff, Hash, LockKeyhole, Mail, UserRound } from "lucide-react"
import Link from "next/link"

const page = () => {
  return (
    <section className="flex flex-col py-4 h-screen">
      <div className="flex-grow sin-screen ">
        <div className=" flex flex-col gap-6">
          <div className=" flex flex-col gap-2">
            <h1 className=" text-mainclr text-5xl font-bold">Cuez</h1>
            <p>
              Please enter all required credentials and a valid email address.
            </p>
          </div>
          <div className=" flex flex-col gap-4">
            <Input
              text="Full name"
              type="text"
              ficon={<UserRound strokeWidth={1.5} />}
            />
            <Input
              text="Email address"
              type="email"
              ficon={<Mail strokeWidth={1.5} />}
            />
            <Input
              text="Password"
              type="password"
              ficon={<LockKeyhole strokeWidth={1.5} />}
              licon1={<Eye strokeWidth={1.5} />}
              licon2={<EyeOff strokeWidth={1.5} />}
            />
            <Input
              text="Confirm password"
              type="password"
              ficon={<LockKeyhole strokeWidth={1.5} />}
              licon1={<Eye strokeWidth={1.5} />}
              licon2={<EyeOff strokeWidth={1.5} />}
            />
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1">
                <Input
                  text="Code"
                  type="text"
                  ficon={<Hash strokeWidth={1.5} />}
                />
              </div>
              <ButtonTrans text="Send Code" />
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
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default page
