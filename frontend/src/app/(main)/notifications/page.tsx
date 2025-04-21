import MainWrapper from "@/layout/MainWrapper"
import Header from "./notificationComponent/Header"
import GetNotification from "./notificationComponent/GetNotification"

const page = () => {
  return (
    <MainWrapper>
      <Header />
      <GetNotification />
    </MainWrapper>
  )
}

export default page
