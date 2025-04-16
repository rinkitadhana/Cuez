"use client"

import { useState, useRef, FormEvent, ChangeEvent, useEffect } from "react"
import { useGetMe } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import Input from "@/components/Input"
import axios from "axios"
import config from "@/config/config"
import {
  ArrowLeft,
  Camera,
  Link as LinkIcon,
  Loader2,
  MapPin,
  User,
} from "lucide-react"
import MainWrapper from "@/layout/MainWrapper"
import { useUpdateUserProfile } from "@/hooks/useUser"

interface UpdateProfileData {
  fullName: string
  username: string
  bio: string
  link: string
  location: string
  profileImg?: string
  coverImg?: string
}

const ProfilePage = () => {
  const router = useRouter()
  const { data: authUser, isLoading } = useGetMe()
  const { mutate: updateUserProfile, isPending: isUpdating } =
    useUpdateUserProfile()
  const [formData, setFormData] = useState<UpdateProfileData>({
    fullName: "",
    username: "",
    bio: "",
    link: "",
    location: "",
  })

  const [profileImgPreview, setProfileImgPreview] = useState<string | null>(
    null
  )
  const [coverImgPreview, setCoverImgPreview] = useState<string | null>(null)

  const profileImgRef = useRef<HTMLInputElement>(null)
  const coverImgRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (authUser?.user) {
      setFormData({
        fullName: authUser.user.fullName,
        username: authUser.user.username,
        bio: authUser.user.bio,
        link: authUser.user.link,
        location: authUser.user.location,
      })
    }
  }, [authUser])

  const updateProfile = () => {
    updateUserProfile(formData, {
      onSuccess: () => {
        router.push(`/${formData.username}`)
      },
    })
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "profileImg" | "coverImg"
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      if (type === "profileImg") {
        setProfileImgPreview(base64String)
        setFormData((prev) => ({ ...prev, profileImg: base64String }))
      } else {
        setCoverImgPreview(base64String)
        setFormData((prev) => ({ ...prev, coverImg: base64String }))
      }
    }
    reader.readAsDataURL(file)
  }

  if (isLoading) {
    return (
      <MainWrapper>
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-mainclr border-t-transparent"></div>
        </div>
      </MainWrapper>
    )
  }

  return (
    <MainWrapper>
      <div className="flex flex-col min-h-screen">
        <div className="flex sticky top-0 z-50 bg-bgClr items-center justify-between border-b border-zinc-700 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-zinc-800 rounded-xl w-fit cursor-pointer opacity-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-semibold">Edit Profile</h1>
          </div>
          <button
            onClick={updateProfile}
            disabled={isUpdating}
            className="px-4 py-1 bg-mainclr hover:bg-mainclr/80 disabled:bg-mainclr/50 disabled:cursor-not-allowed rounded-xl font-semibold transition-colors duration-200"
          >
            {isUpdating ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "Save"
            )}
          </button>
        </div>

        <div className="relative mb-[80px]">
          <div className="relative h-[200px] w-full">
            <Image
              src={
                coverImgPreview ||
                authUser?.user.coverImg ||
                "/img/default-cover.jpg"
              }
              alt="Cover"
              fill
              className="object-cover"
            />
            <button
              onClick={() => coverImgRef.current?.click()}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 rounded-xl transition-colors duration-200"
            >
              <Camera size={26} />
            </button>
            <input
              ref={coverImgRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, "coverImg")}
            />
          </div>

          <div className="absolute -bottom-[60px] left-5">
            <div className="relative h-[120px] w-[120px]">
              <Image
                src={
                  profileImgPreview ||
                  authUser?.user.profileImg ||
                  "/img/default-avatar.jpg"
                }
                alt="Profile"
                width={120}
                height={120}
                className="rounded-xl size-[120px] object-cover shadow-lg border-4 border-bgClr"
              />
              <button
                onClick={() => profileImgRef.current?.click()}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 rounded-xl transition-colors duration-200"
              >
                <Camera size={26} />
              </button>
              <input
                ref={profileImgRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, "profileImg")}
              />
            </div>
          </div>
        </div>

        <form className="flex flex-col px-6 pt-20 pb-10 space-y-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="fullName"
                text="Full Name"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                ficon={<User strokeWidth={1.5} />}
              />

              <Input
                name="username"
                text="Username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                ficon={<User strokeWidth={1.5} />}
              />
            </div>
            <div className="flex flex-col border rounded-[10px] gap-3 py-3 px-4 border-zinc-500 focus-within:border-mainclr transition-colors duration-200 hover:border-zinc-400">
              <label className="text-zinc-400 text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full placeholder:text-zinc-500 bg-transparent outline-none placeholder:select-none resize-none"
                placeholder="Tell us about yourself"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-row border rounded-[10px] gap-3 py-3 px-4 border-zinc-500 focus-within:border-mainclr transition-colors duration-200 hover:border-zinc-400">
                <div className="text-zinc-500">
                  <MapPin strokeWidth={1.5} />
                </div>
                <input
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full placeholder:text-zinc-500 bg-transparent outline-none placeholder:select-none"
                  placeholder="Location"
                />
              </div>

              <div className="flex flex-row border rounded-[10px] gap-3 py-3 px-4 border-zinc-500 focus-within:border-mainclr transition-colors duration-200 hover:border-zinc-400">
                <div className="text-zinc-500">
                  <LinkIcon strokeWidth={1.5} />
                </div>
                <input
                  name="link"
                  type="text"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full placeholder:text-zinc-500 bg-transparent outline-none placeholder:select-none"
                  placeholder="Website"
                />
              </div>
            </div>

            <div className="pt-4 md:hidden">
              <button
                type="button"
                onClick={updateProfile}
                disabled={isUpdating}
                className="w-full py-2.5 bg-mainclr hover:bg-mainclr/90 disabled:bg-mainclr/50 disabled:cursor-not-allowed rounded-full font-medium transition-colors duration-200"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </MainWrapper>
  )
}

export default ProfilePage
