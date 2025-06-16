"use client"

import { Button } from "@/components/ui/button"
import { Code2, Trophy, Users, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Floating Icons */}
      <div className="absolute top-20 left-20 animate-bounce delay-1000">
        <Code2 className="h-8 w-8 text-purple-400 opacity-60" />
      </div>
      <div className="absolute top-40 right-32 animate-bounce delay-2000">
        <Zap className="h-6 w-6 text-blue-400 opacity-60" />
      </div>
      <div className="absolute bottom-32 left-32 animate-bounce delay-3000">
        <Users className="h-7 w-7 text-green-400 opacity-60" />
      </div>
      <div className="absolute bottom-20 right-20 animate-bounce delay-500">
        <Trophy className="h-8 w-8 text-yellow-400 opacity-60" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Code
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Arena</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Challenge developers worldwide in real-time coding battles.
            <br />
            <span className="text-purple-400 font-semibold">1v1. Fast. Competitive.</span>
          </p>
        </div>

        <Button
          onClick={() => router.push("/home")}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group"
        >
          Get Started
          <Zap className="ml-2 h-5 w-5 group-hover:animate-pulse" />
        </Button>

        <div className="mt-12 flex justify-center space-x-8 text-gray-400 text-sm">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Trusted by Many
          </div>
          <div className="flex items-center">
            <Trophy className="h-4 w-4 mr-2" />
            Real-time Battles
          </div>
          <div className="flex items-center">
            <Code2 className="h-4 w-4 mr-2" />
            Multiple Languages
          </div>
        </div>
      </div>
    </div>
  )
}
