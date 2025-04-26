import React from "react"
import CreatePost from "./postComponents/CreatePost"
import Header from "./postComponents/Header"
import MainWrapper from "@/layout/MainWrapper"
const page = () => {
  return (
    <MainWrapper>
      <Header title="Create Post" />
      <CreatePost />
    </MainWrapper>
  )
}

export default page
