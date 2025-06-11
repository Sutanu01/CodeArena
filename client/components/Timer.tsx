"use client"              // we’re using Framer Motion’s animations
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

interface TimerProps {
  /** starting seconds */
  initialSeconds: number
}

export function Timer({ initialSeconds }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)

  // decrement once per second
  useEffect(() => {
    if (timeLeft <= 0) return
    const id = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft])

  // format mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  const formatted = formatTime(timeLeft)
  const isWarning = timeLeft < 300

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="
        flex items-center space-x-4
        px-5 py-3
        bg-gradient-to-r from-indigo-500 to-purple-600
        rounded-2xl
        shadow-2xl
      "
    >
      <Clock
        className="h-7 w-7 text-white animate-pulse"
        aria-hidden="true"
      />
      <span
        className={`
          font-mono
          text-3xl font-extrabold
          transition-colors duration-200
          ${isWarning ? "text-red-300" : "text-green-200"}
        `}
      >
        {formatted}
      </span>
    </motion.div>
  )
}
