"use client";

import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetSubmissionInfo } from "@/hooks/api/contest-hooks";
import { matchType, SubmissionType } from "@/redux/reducers/schemas";
import { RootState } from "@/redux/store";
import {
  Clock,
  ExternalLink,
  LoaderCircle,
  Play,
  RefreshCw,
  Trophy,
  User2Icon,
} from "lucide-react";
import { useRouter,useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function RoomPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { you, opponent, question, matchType, opponentSocketId,roomId } = useSelector(
    (state: RootState) => state.match
  );
  const [timeLeft, setTimeLeft] = useState<number>(Number(matchType?.mode) * 60); //in seconds
  const [activeTab, setActiveTab] = useState("problem");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  
  useEffect(() => {
    if(params.get("roomId") !== roomId) {
      router.push("/not-found");
    }
    console.log(question);
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
  
  const handleLeaveMatch = () => {
    setShowLeaveModal(true);
  };
  
  const confirmLeave = () => {
    router.push("/home");
  };
  
  const cancelLeave = () => {
    setShowLeaveModal(false);
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
              <Button
                variant="outline"
                size="sm"
                onClick={handleLeaveMatch}
                className="bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                Leave Match
              </Button>

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
              <MainContent you={you} question={question} opponent={opponent} />
            </TabsContent>

            <TabsContent value="players" className="flex-1 mt-4 overflow-auto">
              <PlayersSection
                you={you}
                opponent={opponent}
                matchType={matchType || undefined}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout - Optimized for full screen visibility */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4 h-full">
          {/* Left Sidebar - Player Info */}
          <div className="space-y-3 overflow-auto">
            <PlayersSection
              you={you}
              opponent={opponent}
              matchType={matchType || undefined}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-4 flex flex-col space-y-3 overflow-hidden">
            <MainContent you={you} question={question} opponent={opponent} />
          </div>
        </div>
      </div>

      {/* Leave Match Confirmation Modal */}
      <Dialog open={showLeaveModal} onOpenChange={setShowLeaveModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Leave Match?</DialogTitle>
            <DialogDescription>
              Are you sure you want to leave this match? This action cannot be undone and you will forfeit the game.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelLeave}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmLeave}>
              Leave Match
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PlayersSection({
  you,
  opponent,
  matchType,
  timeLeft,
}: {
  you?: any;
  opponent?: any;
  matchType?: matchType;
  timeLeft?: number;
}) {
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
              <AvatarImage src={you?.avatar || undefined} />
              <AvatarFallback className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs flex items-center justify-center">
                <User2Icon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-extrabold text-xl text-slate-900 dark:text-slate-100">
                {you?.username || "Player 1"}
              </div>
              <div className="font-bold text-sm text-muted-foreground">
                {you?.codeforces_info.username || "Player 1"}
              </div>
              <div className="mt-1 text-xs text-muted-foreground flex items-center">
                <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
                {you?.codeforces_info?.rating || "N/A"}
              </div>
            </div>
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
          <div className="flex items-center space-x-2 space-y-1">
            <Avatar className="ring-2 ring-red-500 ring-offset-1 w-8 h-8">
              <AvatarImage src={you?.avatar || undefined} />
              <AvatarFallback className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs">
                <User2Icon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-extrabold text-xl text-slate-900 dark:text-slate-100">
                {opponent?.username || "Player 2"}
              </div>
              <div className="font-bold text-sm text-muted-foreground">
                {opponent?.codeforces_info.username || "Player 2"}
              </div>
              <div className="mt-1 text-xs text-muted-foreground flex items-center">
                <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
                {opponent?.codeforces_info?.rating || "N/A"}
              </div>
            </div>
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
              className={
                matchType?.mode == "10"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs"
                  : matchType?.mode == "25"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 text-xs"
                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs"
              }
            >
              {matchType?.mode == "10"
                ? "Easy"
                : matchType?.mode == "25"
                ? "Medium"
                : "Hard"}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Language:</span>
            <span className="text-slate-600 dark:text-slate-400">Any</span>
          </div>
          <div className="flex justify-between">
            <span>Time Limit:</span>
            <span className="font-mono text-slate-600 dark:text-slate-400">
              {matchType?.mode}:00
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MainContent({
  you,
  opponent,
  question,
}: {
  you?: any;
  question?: any;
  opponent?: any;
}) {
  const handleGotoQuestion = () => {
    const externalLink =
      question?.link || "https://codeforces.com/problemset/problem/1/A";
    window.open(externalLink, "_blank");
  };
  const { fetchSubmission, loading, error, data } = useGetSubmissionInfo();
  const [submissions, setSubmissions] = useState<SubmissionType[]>([]);
  const handleCheckSubmission = async () => {
    const resp = await fetchSubmission({
      userId1: you?._id,
      codeforcesId1: you?.codeforces_info?.username,
      userId2: opponent?._id,
      codeforcesId2: opponent?.codeforces_info?.username,
      contestId: question?.contestId,
      index: question?.index,
    });
    setSubmissions(resp.data || []);
    if (resp.error) {
      toast.error(resp.error);
      return;
    }
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
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Click the button above to view the problem statement on CodeForces
            and submit your solution there.
          </p>
        </CardContent>
      </Card>

      {/* Status of Submissions Section */}
      <Card className="flex-1 shadow-md  min-h-96 flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Submission Status
            </CardTitle>
            <Button
              size="sm"
              onClick={handleCheckSubmission}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm md:text-base transition-colors duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none flex items-center min-w-[170px]"
            >
              {loading ? (
                <LoaderCircle className="animate-spin mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2 group-hover:animate-spin transition-transform duration-200" />
              )}
              <span className="text-xs sm:text-sm md:text-base group-hover:underline transition-all duration-200">
                {loading ? "Loading..." : "Refresh Submissions"}
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto">
          <div className="space-y-3">
            {submissions.length > 0 ? (
              submissions.map((submission, index) => (
                <div
                  key={index}
                  className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor:
                            submission.userId === you?._id
                              ? "#bbf7d0"
                              : "#fecaca",
                          color:
                            submission.userId === you?._id
                              ? "#166534"
                              : "#991b1b",
                        }}
                      >
                        {submission.userId === you?._id ? "You" : "Opponent"}
                      </span>
                    </div>
                    <Badge
                      variant={
                        submission.verdict === "OK" ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      {submission.verdict}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    <span>
                      <span className="font-semibold">
                        {submission.programmingLanguage}
                      </span>{" "}
                    </span>
                    <span className="px-10">{submission.submission_time}</span>
                    <span>
                      <span className="font-semibold">Passed:</span>{" "}
                      {submission.passedTestCount}
                    </span>
                    <span>
                      <span className="font-semibold">ExecTime:</span>{" "}
                      {submission.timeTaken} ms
                    </span>
                    <span>
                      <span className="font-semibold">Mem:</span>{" "}
                      {submission.memoryUsed} KB
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground text-sm py-8">
                No submissions yet. Submit your solution on CodeForces and
                refresh to see status.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Instructions */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2 text-sm">
          How it works:
        </h4>
        <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-decimal list-inside">
          <li>Click "Go to Question" to view the problem on CodeForces</li>
          <li>Submit your solution on CodeForces platform</li>
          <li>
            Click "Refresh Status" to check if your submission was accepted
          </li>
          <li>First to get an accepted solution wins the round!</li>
        </ol>
      </div>
    </div>
  );
}