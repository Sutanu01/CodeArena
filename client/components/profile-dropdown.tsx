"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Settings, LogOut, Trophy } from "lucide-react"
import Link from "next/link"

export function ProfileDropdown() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from your auth state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  if (!isLoggedIn) {
    return (
      <Link href="/login">
        <Button size="sm">Login</Button>
      </Link>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="relative h-9 w-9 rounded-full"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </Button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md border bg-popover p-1 shadow-md animate-in slide-in-from-top-2 z-50">
          <div className="px-2 py-1.5 text-sm font-medium">
            <div>John Doe</div>
            <div className="text-xs text-muted-foreground">Rating: 1547</div>
          </div>
          <div className="h-px bg-border my-1" />

          <Link href="/profile">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>

          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Trophy className="mr-2 h-4 w-4" />
            Achievements
          </Button>

          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>

          <div className="h-px bg-border my-1" />

          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            size="sm"
            onClick={() => setIsLoggedIn(false)}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}
