"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CustomRoomModal } from "@/components/custom-room-modal"
import { Swords, Plus, Calendar, Puzzle, Clock, Users, Trophy, Target } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isCustomRoomOpen, setIsCustomRoomOpen] = useState(false)

  // Generate consistent activity data
  const activityData = Array.from({ length: 35 }, (_, i) => {
    const seed = i * 7 + 42; // Use a consistent seed
    const value = (seed % 100) / 100;
    return value > 0.7 ? "high" : value > 0.5 ? "medium" : "low";
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Ready for your next coding challenge?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">1547</div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Wins</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">31</div>
              <p className="text-xs text-muted-foreground">Matches</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1v1 Match */}
          <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <Swords className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">1v1 Match</CardTitle>
                  <CardDescription>Find an opponent and battle</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/matching">
                <Button className="w-full group-hover:bg-red-600 transition-colors">Start Battle</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Create Custom Room */}
          <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Custom Room</CardTitle>
                  <CardDescription>Create a private match</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors"
                onClick={() => setIsCustomRoomOpen(true)}
              >
                Create Room
              </Button>
            </CardContent>
          </Card>

          {/* Daily Puzzle */}
          <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Puzzle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Daily Puzzle</CardTitle>
                  <CardDescription>Solve today's challenge</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors"
              >
                Solve Puzzle
              </Button>
            </CardContent>
          </Card>

          {/* Mini Calendar */}
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Activity</CardTitle>
                  <CardDescription>Your coding streak</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                <div className="font-medium text-muted-foreground">S</div>
                <div className="font-medium text-muted-foreground">M</div>
                <div className="font-medium text-muted-foreground">T</div>
                <div className="font-medium text-muted-foreground">W</div>
                <div className="font-medium text-muted-foreground">T</div>
                <div className="font-medium text-muted-foreground">F</div>
                <div className="font-medium text-muted-foreground">S</div>

                {activityData.map((activity, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${
                      activity === "high" 
                        ? "bg-green-500" 
                        : activity === "medium" 
                        ? "bg-green-300" 
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Matches */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Recent Matches</CardTitle>
              <CardDescription>Your latest battles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { opponent: "Alice_Dev", result: "Win", time: "2 hours ago", rating: "+15" },
                  { opponent: "CodeMaster", result: "Loss", time: "1 day ago", rating: "-12" },
                  { opponent: "PyThon_Pro", result: "Win", time: "2 days ago", rating: "+18" },
                ].map((match, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${match.result === "Win" ? "bg-green-500" : "bg-red-500"}`}
                      />
                      <div>
                        <div className="font-medium">{match.opponent}</div>
                        <div className="text-sm text-muted-foreground">{match.time}</div>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium ${match.result === "Win" ? "text-green-600" : "text-red-600"}`}
                    >
                      {match.rating}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <CustomRoomModal isOpen={isCustomRoomOpen} onClose={() => setIsCustomRoomOpen(false)} />
    </div>
  )
}