"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { deleteMatch, setMatch } from "@/redux/reducers/match";
import { CustomRoomModalProps, JoinCodeModalProps, MatchSpecificationsProps, PlayerCardProps, QuestionTypeSelectorProps, RatingBracketSelectorProps, RoomCodeDisplayProps } from "@/redux/reducers/schemas";
import { CANT_MATCHMAKE, CREATE_ROOM, JOIN_ROOM, LEFT_ROOM, OPPONENT_LEFT_ROOM, OPPONENT_READY, ROOM_DISBAND, START_CONTEST } from "@/socket/event";
import { useSocket } from "@/socket/socket";
import {
  Check,
  Clock,
  Copy,
  Settings,
  Target,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


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
  "dp",
  "greedy",
  "graphs",
  "binary search",
  "dfs and similar",
  "trees",
  "strings",
  "number theory",
  "combinatorics",
  "data structures",
];
function RatingBracketSelector({
  selectedRating,
  onRatingSelect,
}: RatingBracketSelectorProps) {
  return (
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
            onClick={() => onRatingSelect(bracket.label)}
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
  );
}
function QuestionTypeSelector({
  selectedTypes,
  onTypeToggle,
}: QuestionTypeSelectorProps) {
  return (
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
            onClick={() => onTypeToggle(type)}
            className="justify-start h-auto py-2 px-3"
          >
            {type}
          </Button>
        ))}
      </div>
    </div>
  );
}
function PlayerCard({
  isUser,
  isJoined,
  isReady,
  User
}: PlayerCardProps) {
  const opponentRating = "1523";
  const {UserData} = useSelector((state: any) => state.user);
  return (
    <div className="text-center space-y-2">
      <div className="relative">
        {isUser || isJoined ? (
          <div
            className={`w-16 h-16 mx-auto ${
              isUser
                ? "bg-gradient-to-br from-blue-500 to-purple-600"
                : "bg-gradient-to-br from-green-500 to-emerald-600"
            } rounded-full flex items-center justify-center shadow-lg`}
          >
            <Users className="h-6 w-6 text-white" />
          </div>
        ) : (
          <div className="w-16 h-16 mx-auto bg-muted/20 border-2 border-dashed border-muted-foreground/30 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-muted-foreground/50" />
          </div>
        )}
      </div>
      <div>
        <h4 className="font-semibold text-base">
          {isUser ? UserData?.username : isJoined ? User?.username : "Waiting..."}
        </h4>
        <p className="text-muted-foreground text-xs">
          {isUser || isJoined ? "Ready to battle" : "Share room code"}
        </p>
      </div>
      <div className="bg-muted/30 rounded-lg p-2 space-y-1">
        <div className="flex justify-evenly text-xs text-muted-foreground">
          <div className="flex flex-col items-center">
            <span>Current Rating</span>
            <span className="font-mono font-bold text-sm text-black">
              {isUser ? UserData?.codeforces_info.rating : isJoined ? User?.codeforces_info.rating : "---"}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>Status</span>
            <span
              className={`font-mono font-bold text-sm ${
                isReady ? "text-green-600" : "text-black"
              }`}
            >
              {isUser
                ? isReady
                  ? "Ready"
                  : "Not Ready"
                : isJoined
                ? isReady
                  ? "Ready"
                  : "Not Ready"
                : "---"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
function RoomCodeDisplay({
  roomCode,
  onCopyCode,
  copied,
}: RoomCodeDisplayProps) {
  return (
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
            onClick={onCopyCode}
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
  );
}
function MatchSpecifications({
  selectedRating,
  selectedTypes,
}: MatchSpecificationsProps) {
  const mode = selectedRating === "Beginner" ? "10" : selectedRating === "Intermediate" ? "25" : "40";
  const bracket = ratingBrackets.find((b) => b.label === selectedRating);

  return (
    <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl p-4 space-y-3">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
          <Target className="h-3 w-3 text-primary" />
        </div>
        <h3 className="font-semibold text-sm">Match Specifications</h3>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">Rating Bracket:</span>
          <Badge
            variant="secondary"
            className={`${bracket ? bracket.color : ""} font-medium text-xs`}
          >
            {bracket
              ? `${bracket.label} (${bracket.range})`
              : "Not selected"}
          </Badge>
        </div>

        <div className="flex items-start justify-between">
          <span className="text-muted-foreground text-xs">Topics:</span>
          <div className="text-right max-w-xs">
            {selectedTypes && selectedTypes.length > 0 ? (
              <div className="flex flex-wrap gap-1 justify-end">
                {selectedTypes.map((type: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
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
            {mode} minutes
          </Badge>
        </div>
      </div>
    </div>
  );
}
function JoinCodeModal({ isOpen, onClose, onJoinRoom }: JoinCodeModalProps) {
  const [joinCode, setJoinCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinRoom = async () => {
    if (!joinCode.trim()) return;

    setIsJoining(true);
    setTimeout(() => {
      onJoinRoom(joinCode.toUpperCase());
      setJoinCode("");
      setIsJoining(false);
    }, 1000);
  };

  const handleClose = () => {
    setJoinCode("");
    setIsJoining(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Join Room with Code"
      className="max-w-md"
    >
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="join-code" className="text-base font-medium">
            Enter Room Code
          </Label>
          <Input
            id="join-code"
            type="text"
            placeholder="Enter room code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            className="text-center font-mono text-lg tracking-wider"
          />
          <p className="text-xs text-muted-foreground text-center">
            Ask your friend for the 6-digit room code
          </p>
        </div>

        <div className="flex space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleJoinRoom}
            disabled={!joinCode.trim() || joinCode.length < 6 || isJoining}
            className="flex-1"
          >
            {isJoining ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Join Room
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export function CustomRoomModal({ isOpen, onClose }: CustomRoomModalProps) {
  const [mode, setMode] = useState<"initial" | "create" | "join">("initial");
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [roomCode, setRoomCode] = useState<string>("");
  const [opponentJoined, setOpponentJoined] = useState(false);
  const [userReady, setUserReady] = useState(false);
  const [bothPlayersReady, setBothPlayersReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const {roomId,opponentSocketId,you,opponent}=useSelector((state: any) => state.match);
  const router = useRouter();
  const { socket } = useSocket();
  const dispatch = useDispatch();
  let range = { lower: 800, upper: 3500 };

  const handleCreateRoom = () => {
    if (!selectedRating || selectedTypes.length === 0) return;
    setIsCreating(true);

    switch (selectedRating) {
      case "Beginner":
        range = { lower: 800, upper: 1200 };
        break;
      case "Intermediate":
        range = { lower: 1200, upper: 1600 };
        break;
      case "Advanced":
        range = { lower: 1600, upper: 2000 };
        break;
      case "Expert":
        range = { lower: 2000, upper: 3500 };
        break;
    }
   
    socket?.emit(CREATE_ROOM, {
      lowerRating: range.lower,
      upperRating: range.upper,
      tags: selectedTypes,
    });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(CREATE_ROOM, (data: { roomId: string }) => {
      setRoomCode(data.roomId);
      setIsCreating(false);
      setMode("create");
      setOpponentJoined(false);
      setUserReady(false);
      setOpponentReady(false);
    });
    socket.on(CANT_MATCHMAKE, (data: { error: string }) => {
      handleClose();
      router.push("/home");
      alert(data.error);
    });
    socket.on(START_CONTEST, ({ roomId, you, opponent, lowerRating,upperRating,tags,opponentSocketId, question }) => {
      dispatch(setMatch({
        roomId,
        you,
        opponent,
        opponentSocketId,
        question,
        matchType: {
          lowerRating,
          upperRating,
          tags,
          mode:lowerRating==800 ? "10" : lowerRating===1200 ? "25" : "40"
        }
      }))
      setOpponentJoined(true);
      setMode("join");
      if(lowerRating === 800){
        setSelectedRating("Beginner");
      }else if(lowerRating === 1200){
        setSelectedRating("Intermediate");
      }
      else if(lowerRating === 1600){
        setSelectedRating("Advanced");
      }
      else if(lowerRating === 2000){
        setSelectedRating("Expert");
      }
      setSelectedTypes(tags);
      setRoomCode(roomId);
    });
    
    socket.on(OPPONENT_READY,()=>{
      setOpponentReady(true);
    })
    
    socket.on(OPPONENT_LEFT_ROOM,()=>{
      setOpponentJoined(false);
      setUserReady(false);
      setOpponentReady(false);
      setCountdown(5);
      dispatch(deleteMatch());
    })

    socket.on(ROOM_DISBAND,()=>{
      handleClose();
      dispatch(deleteMatch());
    })

    return () => {
      socket.off(CREATE_ROOM);
      socket.off(START_CONTEST);
    };
  }, [socket]);

  const handleJoinRoom = (code: string) => {
    socket?.emit(JOIN_ROOM, { roomId: code });
    setMode("join");
    setRoomCode(code);
    setShowJoinModal(false);
    setOpponentJoined(true);
    setUserReady(false);
    setOpponentReady(false);
    setCountdown(5);
  };
  const handleUserReady = () =>{
    setUserReady(true);
    socket?.emit(OPPONENT_READY, { to: opponentSocketId });
  }
  const handleStartMatch = () => {
    router.push(`/room?custom=true&roomId=${roomId}`);
    handleClose();
  };
  const handleClose = () => {
    socket?.emit(LEFT_ROOM)
    setMode("initial");
    setSelectedRating("");
    setSelectedTypes([]);
    setIsCreating(false);
    setRoomCode("");
    setOpponentJoined(false);
    setUserReady(false);
    setOpponentReady(false);
    setCountdown(5);
    setShowJoinModal(false);
    onClose();
  };
  const toggleQuestionType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    setBothPlayersReady( userReady && opponentReady && opponentJoined);
    if(!bothPlayersReady)return;
    if (bothPlayersReady && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (bothPlayersReady && countdown === 0) {
      handleStartMatch();
    }
    return () => clearTimeout(timer);
  }, [userReady,opponentReady,bothPlayersReady, countdown]);

  // ------------------- Render Logic -------------------

  if (mode === "create" || mode === "join") {
    return (
      <>
        <Modal isOpen={isOpen} onClose={handleClose} title="Battle Arena" className="max-w-[40rem] max-h-[90vh] overflow-y-auto">
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4 relative">
              <PlayerCard isUser={true} isJoined={true} isReady={userReady} User={you}/>
              <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-white font-bold text-xs">VS</span>
                </div>
              </div>
              <PlayerCard isUser={false} isJoined={opponentJoined} isReady={opponentReady} User={opponent}/>
            </div>

            {mode === "create" && !opponentJoined && (
              <RoomCodeDisplay
                roomCode={roomCode}
                onCopyCode={() => {
                  navigator.clipboard.writeText(roomCode);
                  setCopied(true);
                }}
                copied={copied}
              />
            )}
            {bothPlayersReady && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 animate-pulse">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                  <span className="text-green-600 font-medium text-sm">
                    Both players ready! Match starting in {countdown}s...
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.5s" }} />
                </div>
              </div>
            )}

            {opponentJoined && userReady && !opponentReady && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-4 w-4 text-yellow-600 animate-spin" />
                  <span className="text-yellow-600 font-medium text-sm">Waiting for opponent to ready up...</span>
                </div>
              </div>
            )}

            <MatchSpecifications selectedRating={selectedRating} selectedTypes={selectedTypes} />

            <div className="flex space-x-2 pt-2">
              <Button variant="outline" onClick={handleClose} className="flex-1 text-xs py-2">
                Cancel Match
              </Button>
              <Button
                onClick={handleUserReady}
                className="flex-1 text-xs py-2 bg-gradient-to-r from-green-600 to-emerald-600"
                disabled={userReady}
              >
                {bothPlayersReady ? (
                  <>
                  <Zap className="mr-1 h-3 w-3" />
                  Match is Starting..
                  </>
                ) : userReady ? (
                  <>
                  <Check className="mr-1 h-3 w-3" />
                  You're Ready!
                  </>
                ) : (
                  <>
                  <Clock className="mr-1 h-3 w-3 animate-spin" />
                  I'm Ready
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal>

        <JoinCodeModal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} onJoinRoom={handleJoinRoom} />
      </>
    );
  }

  // ------------------- Initial View -------------------
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} title="Create Custom Room" className="max-w-2xl">
        <div className="p-6 space-y-6">
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto mb-2 border border-primary/40 rounded-lg"
            onClick={() => setShowJoinModal(true)}
          >
            <UserPlus className="mr-1 h-4 w-4" />
            Join Room with Code
          </Button>

          <RatingBracketSelector selectedRating={selectedRating} onRatingSelect={setSelectedRating} />
          <QuestionTypeSelector selectedTypes={selectedTypes} onTypeToggle={toggleQuestionType} />

          <div className="flex space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleCreateRoom}
              disabled={!selectedRating || selectedTypes.length === 0 || isCreating}
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

      <JoinCodeModal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} onJoinRoom={handleJoinRoom} />
    </>
  );
}
