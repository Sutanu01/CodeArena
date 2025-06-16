"use client"

import { UserButton } from "@clerk/nextjs"

export function ProfileDropdown() {
  return (
    <div className="relative">
      <UserButton/>      
    </div>
  )
}
