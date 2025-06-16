"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Code2, Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Code Arena</span>
          </Link>
        </div>

        <Card className="shadow-lg border-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90">
          <CardContent className="p-8 text-center space-y-6">
            {/* 404 Animation */}
            <div className="relative">
              <div className="text-8xl font-bold text-muted-foreground/20 select-none">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="h-16 w-16 text-muted-foreground animate-pulse" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Page Not Found</h1>
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist or has been moved to another location.
              </p>
            </div>

            {/* Suggestions */}
            <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
              <h3 className="font-medium text-sm">You might want to:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check the URL for typos</li>
                <li>• Go back to the previous page</li>
                <li>• Visit our homepage</li>
                <li>• Start a new coding battle</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Link href="/home" className="flex-1">
                <Button className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">Quick Links</p>
              <div className="flex justify-center space-x-4 text-sm">
                <Link href="/home" className="text-primary hover:underline">
                  Dashboard
                </Link>
                <Link href="/profile" className="text-primary hover:underline">
                  Profile
                </Link>
                <Link href="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
