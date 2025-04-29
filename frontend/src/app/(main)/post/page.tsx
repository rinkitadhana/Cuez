"use client"
import React from "react"
import CreatePost from "./postComponents/CreatePost"
import Header from "./postComponents/Header"
import MainWrapper from "@/layout/MainWrapper"
import PageHead from "@/components/pageComponents/PageHead"

const page = () => {
  return (
    <>
      <PageHead
        title="Create Post / Cuez"
        description="Create a new post on Cuez"
      />
      <MainWrapper>
        <Header title="Create Post" />
        <CreatePost />
      </MainWrapper>
    </>
  )
}

export default page
