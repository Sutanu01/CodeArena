"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Code2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavbarLinks from "./Navbar-Links";
import { ProfileDropdown } from "./profile-dropdown";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNav = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <button
          onClick={() => router.push("/home")}
          className="flex items-center space-x-2"
        >
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Code Arena</span>
        </button>

        {/* Desktop Navigation */}
        <NavbarLinks />

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 space-y-4">
            <button
              onClick={() => handleNav("/home")}
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNav("/leaderboard")}
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Leaderboard
            </button>
            <button
              onClick={() => handleNav("/practice")}
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Practice
            </button>
            <div className="pt-4 border-t">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
