"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Trophy,
  Play,
  CheckCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { Timer } from "@/components/Timer";

export default function RoomPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [activeTab, setActiveTab] = useState("problem");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      {/* Header */}
      <div className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm flex-shrink-0">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              1v1 Battle Room
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-sm border">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span
                  className={`font-mono text-lg font-semibold ${
                    timeLeft < 300 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-4 pr-4">
                <ThemeToggle />
                <ProfileDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 flex-1 overflow-hidden">
        {/* Mobile Tabs */}
        <div className="lg:hidden h-full">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-2 bg-white dark:bg-slate-800 shadow-sm flex-shrink-0">
              <TabsTrigger
                value="problem"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Problem
              </TabsTrigger>
              <TabsTrigger
                value="players"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Players
              </TabsTrigger>
            </TabsList>

            <TabsContent value="problem" className="flex-1 mt-4 overflow-auto">
              <MainContent />
            </TabsContent>

            <TabsContent value="players" className="flex-1 mt-4 overflow-auto">
              <PlayersSection timeLeft={timeLeft} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout - Optimized for full screen visibility */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4 h-full">
          {/* Left Sidebar - Player Info */}
          <div className="space-y-3 overflow-auto">
            <PlayersSection timeLeft={timeLeft} />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-4 flex flex-col space-y-3 overflow-hidden">
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayersSection({ timeLeft }: { timeLeft: number }) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  return (
    <div className="space-y-3">
      {/* You - Person1 Info */}
      <Card className=" shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            YOU
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <Avatar className="ring-2 ring-green-500 ring-offset-1 w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                SP
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm text-slate-900 dark:text-slate-100">
                Satu ka Pakora
              </div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
                1547
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Status:</span>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs"
            >
              Coding
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Opponent - Person2 Info */}
      <Card className=" shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-red-600 dark:text-red-400 flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            OPPONENT
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <Avatar className="ring-2 ring-red-500 ring-offset-1 w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs">
                GS
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm text-slate-900 dark:text-slate-100">
                Gojo Satoru
              </div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
                16230
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Status:</span>
            <Badge
              variant="outline"
              className="border-red-200 text-red-600 dark:border-red-800 dark:text-red-400 text-xs"
            >
              Coding
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Match Info */}
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            MATCH INFO
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-xs">
          <div className="flex justify-between items-center">
            <span>Difficulty:</span>
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 text-xs"
            >
              Medium
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Language:</span>
            <span className="text-slate-600 dark:text-slate-400">Any</span>
          </div>
          <div className="flex justify-between">
            <span>Time Limit:</span>
            <span className="font-mono text-slate-600 dark:text-slate-400">
              30:00
            </span>
          </div>
        </CardContent>
      </Card>
      {/*<Timer initialSeconds={1800} /> */}
    </div>
  );
}

function MainContent() {
  const handleGotoQuestion = () => {
    const externalLink = "https://codeforces.com/problemset/problem/1903/A";
    window.open(externalLink, "_blank");
  };

  const handleCheckSubmission = () => {
    // This would check CodeForces for submission status
    console.log("Checking submission status...");
  };

  return (
    <div className="flex flex-col space-y-3 h-full">
      {/* Question Link Section */}
      <Card className="shadow-md  flex-shrink-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center">
              <ExternalLink className="h-4 w-4 mr-2 text-yellow-600" />
              CodeForces Problem
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGotoQuestion}
              className="bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-300"
            >
              <Play className="h-4 w-4 mr-2" />
              Go to Question
            </Button>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-sm text-muted-foreground">
            Click the button above to view the problem statement on CodeForces
            and submit your solution there.
          </p>
        </CardContent>
      </Card>

      {/* Status of Submissions Section */}
      <Card className="flex-1 shadow-md  min-h-0 flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Submission Status
            </CardTitle>
            <Button
              size="sm"
              onClick={handleCheckSubmission}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto">
          <div className="space-y-3">
            {/* Your Submission Status */}
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-green-800 dark:text-green-300 text-sm">
                  Your Submission
                </span>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                  Not Submitted
                </Badge>
              </div>
              <p className="text-xs text-green-700 dark:text-green-400">
                Waiting for your submission on CodeForces...
              </p>
            </div>

            {/* Opponent Submission Status */}
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-red-800 dark:text-red-300 text-sm">
                  Opponent's Submission
                </span>
                <Badge
                  variant="outline"
                  className="border-red-200 text-red-600 dark:border-red-800 dark:text-red-400 text-xs"
                >
                  Not Submitted
                </Badge>
              </div>
              <p className="text-xs text-red-700 dark:text-red-400">
                Opponent hasn't submitted yet...
              </p>
            </div>

            {/* Instructions */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2 text-sm">
                How it works:
              </h4>
              <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-decimal list-inside">
                <li>
                  Click "Go to Question" to view the problem on CodeForces
                </li>
                <li>Submit your solution on CodeForces platform</li>
                <li>
                  Click "Refresh Status" to check if your submission was
                  accepted
                </li>
                <li>First to get an accepted solution wins the round!</li>
              </ol>
            </div>
          </div>
        </CardContent>

        {/* Submit Button at Bottom */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
          <Button
            onClick={handleCheckSubmission}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-sm font-semibold"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Check CodeForces for My Submission
          </Button>
        </div>
      </Card>
    </div>
  );
}
