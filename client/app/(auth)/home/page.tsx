"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomRoomModal } from "@/components/custom-room-modal";
import {
  Swords,
  Plus,
  Calendar,
  Puzzle,
  Clock,
  Users,
  Trophy,
  Target,
  TrendingUp,
  ExternalLink,
  Star,
  Award,
  Code2,
} from "lucide-react";
import Link from "next/link";
import { OneVsOneModal } from "@/components/custom-1v1-modal";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  setCodeforcesVerified,
  resetUser,
} from "@/redux/reducers/user";
import type { RootState } from "@/redux/store";
import { CodeforcesVerificationCard } from "@/components/verification-card";

export default function HomePage() {
  const [isCustomRoomOpen, setIsCustomRoomOpen] = useState(false);
  const [is1v1Mode, set1v1Mode] = useState(false);

  // Generate consistent activity data
  const activityData = Array.from({ length: 35 }, (_, i) => {
    const seed = i * 7 + 42;
    const value = (seed % 100) / 100;
    return value > 0.7 ? "high" : value > 0.5 ? "medium" : "low";
  });

  // Rating progression data
  const ratingData = [
    { match: 1, rating: 1200, date: "Jan 15" },
    { match: 2, rating: 1215, date: "Jan 16" },
    { match: 3, rating: 1203, date: "Jan 17" },
    { match: 4, rating: 1228, date: "Jan 18" },
    { match: 5, rating: 1245, date: "Jan 19" },
    { match: 6, rating: 1233, date: "Jan 20" },
    { match: 7, rating: 1267, date: "Jan 21" },
    { match: 21, rating: 1547, date: "Feb 4" },
  ];

  const isVerified = useSelector(
    (state: RootState) => state.user.isCodeforcesVerified
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex flex-col space-y-2 mb-4">
                <h1 className="text-3xl font-bold">Welcome back, John!</h1>
              </div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Performance Overview
              </CardTitle>
              <CardDescription>
                Your competitive programming statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-3">
                    <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                    1547
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Current Rating
                  </p>
                  <div className="flex items-center justify-center">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">
                      +24 this week
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center h-full">
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full mb-3">
                    <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                    23
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Total Wins
                  </p>
                  <div className="text-xs text-muted-foreground">
                    74% win rate
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center h-full">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-3">
                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    31
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Total Matches
                  </p>
                  <div className="text-xs text-muted-foreground">8 losses</div>
                </div>

                <div className="flex flex-col items-center justify-center text-center h-full">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-3">
                    <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    12
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Win Streak
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Personal best: 15
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {isVerified ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-blue-500" />
                  Codeforces Profile
                </CardTitle>
                <CardDescription>External platform statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">john_coder</div>
                    <div className="text-sm text-muted-foreground">Handle</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Rating
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-blue-500"></div>
                      <span className="font-medium text-blue-600">1432</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Max Rating
                    </span>
                    <div className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="font-medium">1587</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Contests
                    </span>
                    <span className="font-medium">47</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Problems Solved
                    </span>
                    <span className="font-medium">234</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground mb-2">
                    Recent Achievement
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Award className="h-4 w-4 text-green-500" />
                    <div className="text-sm">
                      <div className="font-medium text-green-700 dark:text-green-400">
                        Specialist
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-500">
                        Achieved 2 days ago
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <CodeforcesVerificationCard/>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <Button
                variant="outline"
                className="w-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors"
                onClick={() => set1v1Mode(true)}
              >
                Start Battle
              </Button>
            </CardContent>
          </Card>
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
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Rating Progress
            </CardTitle>
            <CardDescription>
              Your rating evolution over the last 21 matches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ratingData}>
                  <defs>
                    <linearGradient
                      id="ratingGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="date"
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    domain={["dataMin - 20", "dataMax + 20"]}
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                    formatter={(value, name) => [`${value}`, "Rating"]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="rating"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#ratingGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t text-sm text-muted-foreground">
              <div>
                Peak Rating:{" "}
                <span className="font-medium text-foreground">1547</span>
              </div>
              <div>
                Rating Change:{" "}
                <span className="font-medium text-green-600">+347</span>
              </div>
              <div>
                Matches Played:{" "}
                <span className="font-medium text-foreground">21</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Recent Matches</CardTitle>
              <CardDescription>Your latest battles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    opponent: "Alice_Dev",
                    result: "Win",
                    time: "2 hours ago",
                    rating: "+15",
                  },
                  {
                    opponent: "CodeMaster",
                    result: "Loss",
                    time: "1 day ago",
                    rating: "-12",
                  },
                  {
                    opponent: "PyThon_Pro",
                    result: "Win",
                    time: "2 days ago",
                    rating: "+18",
                  },
                ].map((match, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          match.result === "Win" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{match.opponent}</div>
                        <div className="text-sm text-muted-foreground">
                          {match.time}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        match.result === "Win"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
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
      <OneVsOneModal isOpen={is1v1Mode} onClose={() => set1v1Mode(false)} />
      <CustomRoomModal
        isOpen={isCustomRoomOpen}
        onClose={() => setIsCustomRoomOpen(false)}
      />
    </div>
  );
}
