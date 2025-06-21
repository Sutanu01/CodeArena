"use client";

import AlertMessageDialog from "@/components/AlertMessageDialog";
import { ScrambledTitle } from "@/components/Scrambled-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deleteMatch, setMatch } from "@/redux/reducers/match";
import { User } from "@/redux/reducers/schemas";
import {
  CANT_MATCHMAKE,
  END_MATCHMAKING,
  OPPONENT_LEFT,
  OPPONENT_READY,
  START_CONTEST,
  STARTED_MATCH,
} from "@/socket/event";
import { useSocket } from "@/socket/socket";
import { Check, Clock, Users, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const tips = [
  "💡 Always read the problem statement twice before coding",
  "🚀 Start with the simplest solution, then optimize",
  "🔍 Test your code with edge cases",
  "⏰ Time complexity matters in competitive programming",
  "🧠 Think about the algorithm before writing code",
  "📝 Comment your code for better understanding",
  "🎯 Practice makes perfect - solve daily!",
];

export default function MatchingPage() {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const mode = params.get("mode") ?? "10";
  const router = useRouter();
  const [currentTip, setCurrentTip] = useState(0);
  const [matchTime, setMatchTime] = useState(0);
  const [waitingRoom, setWaitingRoom] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);
  const [bothReady, setBothReady] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(false);
  const [opponent, setOpponent] = useState<User | null>(null);
  const [you, setYou] = useState<User | null>(null);
  const [isalertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { socket } = useSocket();
  const { opponentSocketId, roomId } = useSelector((state: any) => state.match);
  const intervalRefs = useRef<{
    tip?: NodeJS.Timeout;
    time?: NodeJS.Timeout;
    countdown?: NodeJS.Timeout;
  }>({});
  const cleanUp = () => {
    setWaitingRoom(false);
    setYou(null);
    setOpponent(null);
    dispatch(deleteMatch());
    setIsReady(false);
    setOpponentReady(false);
    setBothReady(false);
    setCountdown(3);
    setShowCountdown(false);
  };
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);

    const timeInterval = setInterval(() => {
      setMatchTime((prev) => prev + 1);
    }, 1000);

    intervalRefs.current.tip = tipInterval;
    intervalRefs.current.time = timeInterval;

    if (socket) {
      socket.on(
        START_CONTEST,
        ({ roomId, you, opponent, opponentSocketId, question }) => {
          setWaitingRoom(true);
          setYou(you);
          setOpponent(opponent);
          dispatch(
            setMatch({
              roomId,
              you,
              opponent,
              opponentSocketId,
              matchType: {
                mode: mode as "10" | "25" | "40",
              },
              question,
            })
          );
        }
      );

      socket.on(CANT_MATCHMAKE, (data: { error: string }) => {
        cleanUp();
        router.push("/home");
        setIsAlertOpen(true);
        setAlertMessage(data.error || "Unable to matchmake. Please try again later.");
      });

      socket.on(OPPONENT_READY, () => {
        setOpponentReady(true);
      });

      socket.on(OPPONENT_LEFT, () => {
        setAlertMessage("Your opponent has left the match.");
        setIsAlertOpen(true);
        cleanUp();
      });
    }

    return () => {
      clearInterval(tipInterval);
      clearInterval(timeInterval);
      if (socket) {
        socket.off(START_CONTEST);
        socket.off(OPPONENT_READY);
        socket.off(CANT_MATCHMAKE);
        socket.off(OPPONENT_LEFT);
      }
    };
  }, [socket, mode, dispatch, router]);

  useEffect(() => {
    const ready = isReady && opponentReady;
    setBothReady(ready);

    if (ready) {
      setShowCountdown(true);

      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            socket?.emit(STARTED_MATCH, { opponentSocketId });
            setRedirect(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      intervalRefs.current.countdown = countdownInterval;
    }
  }, [isReady, opponentReady]);

  useEffect(() => {
    if (redirect) {
      router.push(`/room?roomId=${roomId}&mode=${mode}`);
    }
  }, [redirect, router]);

  const handleCancel = useCallback(() => {
    Object.values(intervalRefs.current).forEach((ref) => {
      if (ref) {
        clearInterval(ref);
        clearTimeout(ref);
      }
    });
    router.push("/home");
    cleanUp();
    socket?.emit(END_MATCHMAKING, { mode });
  }, [router]);

  const handleLeave = () => {
    Object.values(intervalRefs.current).forEach((ref) => {
      if (ref) {
        clearInterval(ref);
        clearTimeout(ref);
      }
    });
    router.push("/home");
    cleanUp();
    socket?.emit(OPPONENT_LEFT, { to: opponentSocketId, mode: mode });
  };

  const handleReady = () => {
    setIsReady(true);
    if (socket && opponentSocketId) {
      socket.emit(OPPONENT_READY, { to: opponentSocketId });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (waitingRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-[40rem] bg-white z-50 relative shadow-2xl">
          <CardContent className="p-4 space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold mb-2">Battle Arena</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 relative">
              {/* You */}
              <div className="text-center space-y-2">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-black">You</h4>
                  <p className="text-muted-foreground text-xs">
                    {isReady ? "Ready to battle" : "Preparing..."}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-2">
                  <div className="flex justify-evenly text-xs text-muted-foreground">
                    <div className="flex flex-col items-center">
                      <span className="text-white font-bold">
                        Current Rating
                      </span>
                      <span className="font-mono font-bold text-sm text-black">
                        {you?.codeforces_info.rating}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-white font-bold">Status</span>
                      <span className="font-mono font-bold text-sm text-black">
                        {isReady ? "Ready" : "Waiting"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* VS Icon */}
              <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-white font-bold text-xs">VS</span>
                </div>
              </div>

              {/* Opponent */}
              <div className="text-center space-y-2">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-black">
                    {opponent?.username}
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    {opponentReady ? "Ready to battle" : "Preparing..."}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-2">
                  <div className="flex justify-evenly text-xs text-muted-foreground">
                    <div className="flex flex-col items-center">
                      <span className="text-white font-bold">
                        Current Rating
                      </span>
                      <span className="font-mono font-bold text-sm text-black">
                        {opponent?.codeforces_info.rating}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-white font-bold">Status</span>
                      <span className="font-mono font-bold text-sm text-black">
                        {opponentReady ? "Ready" : "Waiting"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showCountdown && bothReady && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 animate-pulse">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                    Both players ready! Match starting in {countdown}s...
                  </span>
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>
              </div>
            )}

            {!bothReady && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400 animate-spin" />
                  <span className="text-yellow-600 dark:text-yellow-400 font-medium text-sm">
                    {!isReady || !opponentReady
                      ? "Waiting for players to get ready..."
                      : "Preparing battle arena..."}
                  </span>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Battle Information</h3>
              </div>

              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isReady ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="text-xs text-slate-200 font-bold">
                      You
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        opponentReady ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="text-xs text-slate-200 font-bold">
                      Opponent
                    </span>
                  </div>
                </div>
                <p className="text-xs text-white font-bold">
                  Both players must be ready to start the match
                </p>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={handleLeave}
                className="flex-1 hover:bg-destructive hover:text-destructive-foreground text-xs py-2"
              >
                <X className="mr-1 h-3 w-3" />
                Leave Match
              </Button>

              {!isReady ? (
                <Button
                  onClick={handleReady}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-xs py-2"
                >
                  <Check className="mr-1 h-3 w-3" />
                  I'm Ready!
                </Button>
              ) : (
                <Button disabled className="flex-1 bg-green-600 text-xs py-2">
                  <Check className="mr-1 h-3 w-3" />
                  Ready ✓
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <AlertMessageDialog
        open={isalertOpen}
        setOpen={setIsAlertOpen}
        message={alertMessage}
      />
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[30rem] bg-white z-50 relative shadow-2xl">
        <CardContent className="p-4 sm:p-6 md:p-8 text-center space-y-4 sm:space-y-6">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 relative">
              <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-muted"></div>
              <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-primary border-t-transparent animate-spin"></div>
              <Users className="absolute inset-0 m-auto h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
          </div>

          <div className="space-y-5 min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] flex flex-col justify-center">
            <ScrambledTitle />
            <div className="text-xs sm:text-sm text-muted-foreground">
              Time elapsed: {formatTime(matchTime)}
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-3 sm:p-4 min-h-[50px] sm:min-h-[60px] flex items-center justify-center">
            <p
              key={currentTip}
              className="text-xs sm:text-sm animate-in fade-in-0 slide-in-from-bottom-2 duration-500 leading-relaxed"
            >
              {tips[currentTip]}
            </p>
          </div>

          <div className="flex justify-center space-x-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i <= matchTime % 5 ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full text-sm sm:text-base"
          >
            <X className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Cancel Search
          </Button>
        </CardContent>
      </Card>
      <style jsx global>{`
        .dud {
          color: #ee31ff;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}
