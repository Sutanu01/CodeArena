"use client"

import { useState } from "react"
import { UserButton } from "@clerk/nextjs"

export function ProfileDropdown() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from your auth state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="relative">
      <UserButton/>      
    </div>
  )
}
