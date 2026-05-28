import MainWrapper from "@/layout/MainWrapper"
import Header from "./notificationComponent/Header"
import GetNotification from "./notificationComponent/GetNotification"
import PageHead from "@/components/pageComponents/PageHead"

const page = () => {
  return (
    <MainWrapper>
      <PageHead title="Notifications / Cuez" />
      <Header />
      <GetNotification />
    </MainWrapper>
  )
}

export default page
