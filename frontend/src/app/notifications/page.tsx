import MainWrapper from "@/layout/MainWrapper"
import Header from "./notificationComponent/Header"
import NoNotification from "./notificationComponent/NoNotification"

const page = () => {
  return (
    <MainWrapper>
      <Header />
      <NoNotification />
    </MainWrapper>
  )
}

export default page
