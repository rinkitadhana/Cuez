import React from "react"
import CreatePost from "./postComponents/CreatePost"
import Header from "./postComponents/Header"
const page = () => {
  return (
    <div>
      <Header title="Create Post" />
      <CreatePost />
    </div>
  )
}

export default page
