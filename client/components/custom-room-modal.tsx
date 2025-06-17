"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check, Users, Settings, Clock, Target, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

interface CustomRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ratingBrackets = [
  {
    label: "Beginner",
    range: "800-1200",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  },
  {
    label: "Intermediate",
    range: "1200-1600",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  },
  {
    label: "Advanced",
    range: "1600-2000",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  },
  {
    label: "Expert",
    range: "2000+",
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  },
];

const questionTypes = [
  "Dynamic Programming",
  "Greedy Algorithms",
  "Graph Theory",
  "Tree Algorithms",
  "String Algorithms",
  "Number Theory",
  "Combinatorics",
  "Data Structures",
];

export function CustomRoomModal({ isOpen, onClose }: CustomRoomModalProps) {
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [roomCode, setRoomCode] = useState<string>("");
  const [opponentJoined, setOpponentJoined] = useState(false);
  const [userReady, setUserReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);
  const [bothPlayersReady, setBothPlayersReady] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Dummy simulation functions
  const simulateOpponentJoining = () => {
    setTimeout(() => {
      setOpponentJoined(true);
    }, 3000); // Opponent joins after 3 seconds
  };

  const simulateOpponentReady = () => {
    // Simulate opponent getting ready after user is ready
    setTimeout(() => {
      setOpponentReady(true);
    }, Math.random() * 3000 + 1000); // Random delay between 1-4 seconds
  };

  const handleCreateRoom = async () => {
    if (!selectedRating || selectedTypes.length === 0) return;

    setIsCreating(true);

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    console.log("Room created with code:", code);
    setIsCreating(false);
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const handleUserReady = () => {
    setUserReady(true);
    // Simulate opponent getting ready after user clicks ready
    simulateOpponentReady();
  };

  const handleStartMatch = () => {
    router.push(`/room?custom=true&code=${roomCode}`);
    onClose();
  };

  const toggleQuestionType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const resetModal = () => {
    setSelectedRating("");
    setSelectedTypes([]);
    setIsCreating(false);
    setRoomCode("");
    setCopied(false);
    setOpponentJoined(false);
    setUserReady(false);
    setOpponentReady(false);
    setBothPlayersReady(false);
    setCountdown(5);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  // Effect to handle both players ready state
  useEffect(() => {
    if (userReady && opponentReady) {
      setBothPlayersReady(true);
    }
  }, [userReady, opponentReady]);

  // Effect to handle countdown when both players are ready
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (bothPlayersReady && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (bothPlayersReady && countdown === 0) {
      handleStartMatch();
    }
    return () => clearTimeout(timer);
  }, [bothPlayersReady, countdown]);

  if (roomCode) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Battle Arena"
        className="max-w-[40rem] max-h-[90vh] overflow-y-auto"
      >
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="text-center space-y-2">
              <div className="relative">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-base">You</h4>
                <p className="text-muted-foreground text-xs">Ready to battle</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-2 space-y-1">
                <div className="flex justify-evenly text-xs text-muted-foreground">
                  <div className="flex flex-col items-center">
                    <span>Current Rating</span>
                    <span className="font-mono font-bold text-sm text-black">
                      1450
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>Status</span>
                    <span className={`font-mono font-bold text-sm ${userReady ? 'text-green-600' : 'text-black'}`}>
                      {userReady ? "Ready" : "Not Ready"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white font-bold text-xs">VS</span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="relative">
                {opponentJoined ? (
                  <>
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="w-16 h-16 mx-auto bg-muted/20 border-2 border-dashed border-muted-foreground/30 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-base">
                  {opponentJoined ? "Challenger" : "Waiting..."}
                </h4>
                <p className="text-muted-foreground text-xs">
                  {opponentJoined ? "Ready to battle" : "Share room code"}
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-2 space-y-1">
                <div className="flex justify-evenly text-xs text-muted-foreground">
                  <div className="flex flex-col items-center">
                    <span>Current Rating</span>
                    <span className="font-mono font-bold text-sm text-black">
                      {opponentJoined ? "1523" : "---"}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>Status</span>
                    <span className={`font-mono font-bold text-sm ${opponentReady ? 'text-green-600' : 'text-black'}`}>
                      {opponentJoined ? (opponentReady ? "Ready" : "Not Ready") : "---"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!opponentJoined && (
            <Card className="border-dashed border-2 bg-muted/20">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">
                      Room Code
                    </Label>
                    <div className="text-lg font-mono font-bold tracking-wider">
                      {roomCode}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyCode}
                    className="shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {copied ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ready Button Section */}
          {opponentJoined && !bothPlayersReady && (
            <div className="flex justify-center">
              <Button
                onClick={handleUserReady}
                disabled={userReady}
                className={`px-6 py-3 transition-all duration-300 ${
                  userReady 
                    ? 'bg-green-600 hover:bg-green-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                {userReady ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    You're Ready!
                  </>
                ) : (
                  <>
                    <Target className="mr-2 h-4 w-4" />
                    I'm Ready
                  </>
                )}
              </Button>
            </div>
          )}

          {opponentJoined && bothPlayersReady && (
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

          {opponentJoined && !bothPlayersReady && userReady && !opponentReady && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400 animate-spin" />
                <span className="text-yellow-600 dark:text-yellow-400 font-medium text-sm">
                  Waiting for opponent to ready up...
                </span>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="h-3 w-3 text-primary" />
              </div>
              <h3 className="font-semibold text-sm">Match Specifications</h3>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">
                  Rating Bracket:
                </span>
                <Badge
                  variant="secondary"
                  className={`${
                    ratingBrackets.find((b) => b.label === selectedRating)
                      ?.color
                  } font-medium text-xs`}
                >
                  {selectedRating || "Not selected"}
                </Badge>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-muted-foreground text-xs">Topics:</span>
                <div className="text-right max-w-xs">
                  {selectedTypes.length > 0 ? (
                    <div className="flex flex-wrap gap-1 justify-end">
                      {selectedTypes.map((type, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-xs">
                      None selected
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">Duration:</span>
                <Badge variant="outline" className="text-xs">
                  45 minutes
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 hover:bg-destructive hover:text-destructive-foreground text-xs py-2"
            >
              Cancel Match
            </Button>
            <Button
              onClick={handleStartMatch}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-xs py-2"
              disabled={!opponentJoined || !bothPlayersReady}
            >
              {bothPlayersReady ? (
                <>
                  <Zap className="mr-1 h-3 w-3" />
                  Start Battle
                </>
              ) : opponentJoined ? (
                <>
                  <Clock className="mr-1 h-3 w-3 animate-spin" />
                  Preparing...
                </>
              ) : (
                <>
                  <Clock className="mr-1 h-3 w-3" />
                  Waiting for Opponent
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
  )}

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Custom Room"
      className="max-w-2xl"
    >
      <div className="p-6 space-y-6">
        {/* Rating Bracket Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Select Rating Bracket</Label>
          <div className="grid grid-cols-2 gap-3">
            {ratingBrackets.map((bracket) => (
              <Card
                key={bracket.label}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedRating === bracket.label
                    ? "ring-2 ring-primary bg-primary/5"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedRating(bracket.label)}
              >
                <CardContent className="p-4 text-center">
                  <div className="font-medium mb-1">{bracket.label}</div>
                  <Badge variant="secondary" className={bracket.color}>
                    {bracket.range}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Question Types Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
            Select Question Types
            <span className="text-sm text-muted-foreground ml-2">
              ({selectedTypes.length} selected)
            </span>
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {questionTypes.map((type) => (
              <Button
                key={type}
                variant={selectedTypes.includes(type) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleQuestionType(type)}
                className="justify-start h-auto py-2 px-3"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleCreateRoom}
            disabled={
              !selectedRating || selectedTypes.length === 0 || isCreating
            }
            className="flex-1"
          >
            {isCreating ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Settings className="mr-2 h-4 w-4" />
                Create Room
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
