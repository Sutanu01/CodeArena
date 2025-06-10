"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Settings, LogOut, Trophy } from "lucide-react"
import Link from "next/link"
import { UserButton, UserProfile } from "@clerk/nextjs"

export function ProfileDropdown() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from your auth state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="relative">
      <UserButton/>      
    </div>
  )
}
