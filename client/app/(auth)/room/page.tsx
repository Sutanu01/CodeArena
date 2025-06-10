"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Trophy, Play, CheckCircle, Router } from "lucide-react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">1v1 Battle Room</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span
                  className={`font-mono text-lg ${
                    timeLeft < 300 ? "text-red-500" : ""
                  }`}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Badge variant="secondary">Round 1</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Mobile Tabs */}
        <div className="lg:hidden mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="problem">Problem</TabsTrigger>
              <TabsTrigger value="players">Players</TabsTrigger>
            </TabsList>

            <TabsContent value="problem" className="mt-4">
              <ProblemSection />
            </TabsContent>

            <TabsContent value="players" className="mt-4">
              <PlayersSection timeLeft={timeLeft} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Player Info */}
          <div className="space-y-6">
            <PlayersSection timeLeft={timeLeft} />
          </div>

          {/* Main Content - Problem & Code Editor */}
          <div className="lg:col-span-3">
            <ProblemSection />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayersSection({ timeLeft }: { timeLeft: number }) {
  return (
    <div className="space-y-4">
      {/* You */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            YOU
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Satu ka Pakora</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Trophy className="h-3 w-3 mr-1" />
                1547
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Status:</span>
            <Badge variant="secondary">Coding</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Opponent */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            OPPONENT
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Gojo Satoru</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Trophy className="h-3 w-3 mr-1" />
                16230
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Status:</span>
            <Badge variant="outline">Coding</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Match Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            MATCH INFO
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Difficulty:</span>
            <Badge variant="secondary">Medium</Badge>
          </div>
          <div className="flex justify-between">
            <span>Language:</span>
            <span>Doesn't Matter</span>
          </div>
          <div className="flex justify-between">
            <span>Time Limit:</span>
            <span>30:00</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProblemSection() {
  const handleGotoQuestion = () => {
    //baad mai asli maal pani se replace karwa denege from db
    const externalLink = "https://codeforces.com/problemset/problem/1903/A";
    window.open(externalLink, "_blank");
  };
  return (
    <div className="space-y-6">
      {/* Problem Statement */}
      <Card>
        <CardHeader>
          <CardTitle>Two Sum</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Given an array of integers <code>nums</code> and an integer{" "}
              <code>target</code>, return indices of the two numbers such that
              they add up to <code>target</code>.
            </p>
            <p>
              You may assume that each input would have exactly one solution,
              and you may not use the same element twice.
            </p>

            <h4>Example 1:</h4>
            <pre className="bg-muted p-3 rounded-md text-sm">
              {`Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`}
            </pre>

            <h4>Constraints:</h4>
            <ul>
              <li>2 ≤ nums.length ≤ 10⁴</li>
              <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
              <li>-10⁹ ≤ target ≤ 10⁹</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Code Editor */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Code Forces Sumbission</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleGotoQuestion}>
                <Play className="h-4 w-4 mr-2" />
                Go to Question
              </Button>
              <Button size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
