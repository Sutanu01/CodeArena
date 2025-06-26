import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Target, Users, Clock, Award, TrendingUp } from "lucide-react"
import Navbar from "@/components/navbar"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">John Doe</h1>
                <p className="text-muted-foreground mb-4">
                  Passionate competitive programmer | Python & JavaScript enthusiast
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">C++</Badge>
                  <Badge variant="secondary">Algorithms</Badge>
                </div>

                <div className="flex justify-center md:justify-start space-x-4">
                  <Button>Edit Profile</Button>
                  <Button variant="outline">Share Profile</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">1547</div>
              <p className="text-sm text-muted-foreground">Current Rating</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">23</div>
              <p className="text-sm text-muted-foreground">Wins</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">31</div>
              <p className="text-sm text-muted-foreground">Total Matches</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">12</div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest matches and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "match",
                    title: "Won against Alice_Dev",
                    description: "Two Sum problem • +15 rating",
                    time: "2 hours ago",
                    icon: Trophy,
                    color: "text-green-500",
                  },
                  {
                    type: "achievement",
                    title: 'Earned "Speed Demon" badge',
                    description: "Solved 5 problems in under 10 minutes",
                    time: "1 day ago",
                    icon: Award,
                    color: "text-yellow-500",
                  },
                  {
                    type: "match",
                    title: "Lost to CodeMaster",
                    description: "Binary Tree problem • -12 rating",
                    time: "1 day ago",
                    icon: Target,
                    color: "text-red-500",
                  },
                  {
                    type: "match",
                    title: "Won against PyThon_Pro",
                    description: "Dynamic Programming • +18 rating",
                    time: "2 days ago",
                    icon: Trophy,
                    color: "text-green-500",
                  },
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-muted-foreground">{activity.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements & Stats */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "First Win", icon: "🏆", earned: true },
                    { name: "Speed Demon", icon: "⚡", earned: true },
                    { name: "Streak Master", icon: "🔥", earned: true },
                    { name: "Problem Solver", icon: "🧩", earned: false },
                    { name: "Code Warrior", icon: "⚔️", earned: false },
                    { name: "Algorithm Master", icon: "🎯", earned: false },
                  ].map((achievement, i) => (
                    <div
                      key={i}
                      className={`text-center p-3 rounded-lg border ${
                        achievement.earned
                          ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                          : "bg-muted/50 border-muted opacity-50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <div className="text-xs font-medium">{achievement.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rating Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Rating Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Rating</span>
                      <span className="font-medium">1547</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1200</span>
                      <span>Next: 1600</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">+53</div>
                    <div className="text-sm text-muted-foreground">This month</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Win Rate</span>
                  <span className="font-medium">74%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Avg. Solve Time</span>
                  <span className="font-medium">12:34</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Favorite Language</span>
                  <span className="font-medium">Python</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Problems Solved</span>
                  <span className="font-medium">156</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
