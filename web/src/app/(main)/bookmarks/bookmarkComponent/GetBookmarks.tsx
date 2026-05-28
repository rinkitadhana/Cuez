"use client"

import React from "react"
import { useGetBookmarkedPosts } from "@/hooks/usePost"
import PostStructure from "@/components/pageComponents/PostStructure"
import NoBookmark from "./NoBookmark"
import PostSkeleton from "@/components/skeletons/PostSkeleton"
const GetBookmarks = () => {
  const { data: bookmarks, isLoading } = useGetBookmarkedPosts()
  return (
    <div>
      {isLoading ? (
        <div>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      ) : bookmarks?.posts?.length === 0 ? (
        <NoBookmark />
      ) : (
        bookmarks?.posts.map((post) => (
          <PostStructure key={post._id} post={post} />
        ))
      )}
    </div>
  )
}

export default GetBookmarks
