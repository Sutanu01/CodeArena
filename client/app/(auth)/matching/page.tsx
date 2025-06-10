"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, X } from "lucide-react";
import { useRouter } from "next/navigation";

const tips = [
  "💡 Always read the problem statement twice before coding",
  "🚀 Start with the simplest solution, then optimize",
  "🔍 Test your code with edge cases",
  "⏰ Time complexity matters in competitive programming",
  "🧠 Think about the algorithm before writing code",
  "📝 Comment your code for better understanding",
  "🎯 Practice makes perfect - solve daily!",
];

interface Character {
  char: string;
  x: number;
  y: number;
  speed: number;
}

class TextScramble {
  el: HTMLElement;
  chars: string;
  queue: Array<{
    from: string;
    to: string;
    start: number;
    end: number;
    char?: string;
  }>;
  frame: number;
  frameRequest: number;
  resolve: (value: void | PromiseLike<void>) => void;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#";
    this.queue = [];
    this.frame = 0;
    this.frameRequest = 0;
    this.resolve = () => {};
    this.update = this.update.bind(this);
  }

  setText(newText: string) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

const ScrambledTitle: React.FC = () => {
  const elementRef = useRef<HTMLHeadingElement>(null);
  const scramblerRef = useRef<TextScramble | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (elementRef.current && !scramblerRef.current) {
      scramblerRef.current = new TextScramble(elementRef.current);
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (mounted && scramblerRef.current) {
      const phrases = [
        "Finding Opponents...",
        "Someone Worthy Enough",
        "Someone Who can Code in Binary ?",
        "Someone Who has touched Grass ?",
        "I ran out of ideas what to write here ;-;",
        "Hmm..It's really taking time",
      ];

      let counter = 0;
      const next = () => {
        if (scramblerRef.current) {
          scramblerRef.current.setText(phrases[counter]).then(() => {
            setTimeout(next, 2000);
          });
          counter = (counter + 1) % phrases.length;
        }
      };

      next();
    }
  }, [mounted]);

  return (
    <div
      ref={elementRef}
      className="text-black text-3xl font-bold tracking-wider justify-center"
      style={{ fontFamily: "monospace" }}
    >
      Assembling 1s and 0s
    </div>
  );
};

export default function MatchingPage() {
  const [currentTip, setCurrentTip] = useState(0);
  const [matchTime, setMatchTime] = useState(0);
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const intervalRefs = useRef<{
    tip?: NodeJS.Timeout;
    time?: NodeJS.Timeout;
    match?: NodeJS.Timeout;
    flicker?: NodeJS.Timeout;
  }>({});

  const createCharacters = useCallback(() => {
    const allChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const charCount = 300;
    const newCharacters: Character[] = [];

    for (let i = 0; i < charCount; i++) {
      newCharacters.push({
        char: allChars[Math.floor(Math.random() * allChars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.3,
      });
    }

    return newCharacters;
  }, []);

  useEffect(() => {
    setCharacters(createCharacters());
  }, [createCharacters]);

  useEffect(() => {
    const updateActiveIndices = () => {
      const newActiveIndices = new Set<number>();
      const numActive = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < numActive; i++) {
        newActiveIndices.add(Math.floor(Math.random() * characters.length));
      }
      setActiveIndices(newActiveIndices);
    };

    const flickerInterval = setInterval(updateActiveIndices, 50);
    return () => clearInterval(flickerInterval);
  }, [characters.length]);

  useEffect(() => {
    let animationFrameId: number;

    const updatePositions = () => {
      setCharacters((prevChars) =>
        prevChars.map((char) => ({
          ...char,
          y: char.y + char.speed,
          ...(char.y >= 100 && {
            y: -5,
            x: Math.random() * 100,
            char: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"[
              Math.floor(
                Math.random() *
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
                    .length
              )
            ],
          }),
        }))
      );
      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);

    const timeInterval = setInterval(() => {
      setMatchTime((prev) => prev + 1);
    }, 1000);

    // Simulate finding a match after 5-10 seconds
    const matchTimeout = setTimeout(() => {
      router.push("/room");
    }, Math.random() * 5000 + 5000);

    return () => {
      clearInterval(tipInterval);
      clearInterval(timeInterval);
      clearTimeout(matchTimeout);
    };
  }, [router]);

  const handleCancel = useCallback(() => {
    // Clean up all intervals before navigation
    Object.values(intervalRefs.current).forEach(ref => {
      if (ref) {
        clearInterval(ref)
        clearTimeout(ref)
      }
    })
    router.push("/home")
  }, [router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white z-50 relative shadow-2xl">
        <CardContent className="p-4 sm:p-6 md:p-8 text-center space-y-4 sm:space-y-6">
          {/* Loading Animation */}
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 relative">
              <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-muted"></div>
              <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-primary border-t-transparent animate-spin"></div>
              <Users className="absolute inset-0 m-auto h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-5 min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] flex flex-col justify-center">
            <ScrambledTitle />
            <div className="text-xs sm:text-sm text-muted-foreground">
              Time elapsed: {formatTime(matchTime)}
            </div>
          </div>

          {/* Animated Tip */}
          <div className="bg-muted/50 rounded-lg p-3 sm:p-4 min-h-[50px] sm:min-h-[60px] flex items-center justify-center">
            <p
              key={currentTip}
              className="text-xs sm:text-sm animate-in fade-in-0 slide-in-from-bottom-2 duration-500 leading-relaxed"
            >
              {tips[currentTip]}
            </p>
          </div>

          {/* Progress Indicators */}
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

          {/* Cancel Button */}
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
      {/* Raining Characters
      {characters.map((char, index) => (
        <span
          key={index}
          className={`absolute text-xs transition-colors duration-100 ${
            activeIndices.has(index)
              ? "text-[#ee31ff] text-base scale-125 z-10 font-bold animate-pulse"
              : "text-slate-600 font-light"
          }`}
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
            transform: `translate(-50%, -50%) ${
              activeIndices.has(index) ? "scale(1.25)" : "scale(1)"
            }`,
            textShadow: activeIndices.has(index)
              ? "0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(255,255,255,0.4)"
              : "none",
            opacity: activeIndices.has(index) ? 1 : 0.4,
            transition: "color 0.1s, transform 0.1s, text-shadow 0.1s",
            willChange: "transform, top",
            fontSize: "1.8rem",
          }}
        >
          {char.char}
        </span>
      ))} */}
      <style jsx global>{`
        .dud {
          color: #ee31ff;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}
