import Input from "@/components/Input"
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react"

const page = () => {
  return (
    <section className="mid-screen">
      <div className=" flex flex-col gap-4">
        <div className=" flex flex-col gap-1">
          <h1 className=" text-mainclr text-5xl font-bold">Cuez</h1>
          <p>Please Enter all the credentials and valid email address.</p>
        </div>
        <Input text="Username" type="text" />
        <Input text="Email" type="email" ficon={<Mail />} />
        <Input
          text="Password"
          type="password"
          ficon={<LockKeyhole />}
          licon1={<Eye />}
          licon2={<EyeOff />}
        />
      </div>
    </section>
  )
}

export default page
