"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Modal } from "@/components/ui/modal"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Check, Users, Settings, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

interface CustomRoomModalProps {
  isOpen: boolean
  onClose: () => void
}

const ratingBrackets = [
  {
    label: "Beginner",
    range: "800-1200",
    color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  },
  {
    label: "Intermediate",
    range: "1200-1600",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  },
  {
    label: "Advanced",
    range: "1600-2000",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  },
  { label: "Expert", range: "2000+", color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" },
]

const questionTypes = [
  "Dynamic Programming",
  "Greedy Algorithms",
  "Graph Theory",
  "Tree Algorithms",
  "String Algorithms",
  "Number Theory",
  "Combinatorics",
  "Data Structures",
]

export function CustomRoomModal({ isOpen, onClose }: CustomRoomModalProps) {
  const [selectedRating, setSelectedRating] = useState<string>("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [roomCode, setRoomCode] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const handleCreateRoom = async () => {
    if (!selectedRating || selectedTypes.length === 0) return

    setIsCreating(true)

    // Simulate room creation
    setTimeout(() => {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      setRoomCode(code)
      setIsCreating(false)
    }, 2000)
  }

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(roomCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleStartRoom = () => {
    // Simulate waiting for opponent and then redirect to room
    setTimeout(() => {
      router.push(`/room?custom=true&code=${roomCode}`)
      onClose()
    }, 1000)
  }

  const toggleQuestionType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const resetModal = () => {
    setSelectedRating("")
    setSelectedTypes([])
    setIsCreating(false)
    setRoomCode("")
    setCopied(false)
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  if (roomCode) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Room Created!" className="max-w-lg">
        <div className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Your room is ready!</h3>
              <p className="text-muted-foreground text-sm">Share this code with your opponent to start the battle</p>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Room Code</Label>
                    <div className="text-2xl font-mono font-bold tracking-wider">{roomCode}</div>
                  </div>
                  <Button variant="outline" size="icon" onClick={handleCopyCode} className="shrink-0">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rating:</span>
                <Badge className={ratingBrackets.find((b) => b.label === selectedRating)?.color}>
                  {selectedRating}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Topics:</span>
                <span className="text-right">{selectedTypes.join(", ")}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Close
            </Button>
            <Button onClick={handleStartRoom} className="flex-1">
              <Users className="mr-2 h-4 w-4" />
              Start Room
            </Button>
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Custom Room" className="max-w-2xl">
      <div className="p-6 space-y-6">
        {/* Rating Bracket Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Select Rating Bracket</Label>
          <div className="grid grid-cols-2 gap-3">
            {ratingBrackets.map((bracket) => (
              <Card
                key={bracket.label}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedRating === bracket.label ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
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
            <span className="text-sm text-muted-foreground ml-2">({selectedTypes.length} selected)</span>
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
  )
}
