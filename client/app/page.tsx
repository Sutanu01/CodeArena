"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Terminal, ArrowRight, Clock } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";

const ALGORITHMS = [
  {
    title: "hello_world.py",
    code: `# 1. Print Hello World
def greet_world():
    message = "Hello, World!"
    print(message)

greet_world()`,
    lang: "python"
  },
  {
    title: "binary_search.py",
    code: `# 2. Binary Search
while low <= high:
    mid = (low + high) // 2
    if array[mid] == target:
        return mid
    elif array[mid] < target:
        low = mid + 1
    else:
        high = mid - 1`,
    lang: "python"
  },
  {
    title: "fibonacci.py",
    code: `# 3. Fibonacci Recursion
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Get 10th fibonacci number
result = fibonacci(10)`,
    lang: "python"
  },
  {
    title: "dfs.py",
    code: `# 4. Depth First Search
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    for next_node in graph[start] - visited:
        dfs(graph, next_node, visited)
    return visited`,
    lang: "python"
  }
];

function CodeBlock({ code, title, isOffset }: { code: string; title: string; isOffset?: boolean }) {
  const [typedCode, setTypedCode] = useState("");
  const [triggerReset, setTriggerReset] = useState(0);

  useEffect(() => {
    setTypedCode("");
    let index = 0;
    const timer = setInterval(() => {
      setTypedCode((prev) => {
        if (index < code.length) {
          index++;
          return code.slice(0, index);
        }
        clearInterval(timer);
        // Completed typing! Wait 2 seconds, then trigger reset.
        setTimeout(() => {
          setTriggerReset((prev) => prev + 1);
        }, 2000);
        return code;
      });
    }, 15);
    return () => clearInterval(timer);
  }, [code, triggerReset]);

  const highlightToken = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      if (line.trim().startsWith("#")) {
        return (
          <div key={lineIdx} className="text-muted-foreground/60 min-h-[1.2rem]">
            {line}
          </div>
        );
      }

      const keywords = ["def", "while", "if", "elif", "else", "return", "in", "and", "or", "not", "None"];
      const regex = /("[^"]*"|'[^']*'|\b\d+\b|\b\w+\b|[^\s\w])/g;
      
      let lastIndex = 0;
      const elements: React.ReactNode[] = [];
      
      let match;
      regex.lastIndex = 0;
      while ((match = regex.exec(line)) !== null) {
        const token = match[0];
        const tokenIndex = match.index;
        
        if (tokenIndex > lastIndex) {
          elements.push(line.slice(lastIndex, tokenIndex));
        }
        
        if (token.startsWith('"') || token.startsWith("'")) {
          elements.push(<span key={tokenIndex} className="text-emerald-500 dark:text-emerald-400 font-medium">{token}</span>);
        } else if (/^\d+$/.test(token)) {
          elements.push(<span key={tokenIndex} className="text-amber-500 dark:text-amber-400">{token}</span>);
        } else if (keywords.includes(token)) {
          elements.push(<span key={tokenIndex} className="text-pink-600 dark:text-pink-400 font-bold">{token}</span>);
        } else if (token === "print" || token === "greet_world" || token === "fibonacci" || token === "dfs") {
          elements.push(<span key={tokenIndex} className="text-blue-600 dark:text-blue-400">{token}</span>);
        } else {
          elements.push(token);
        }
        
        lastIndex = regex.lastIndex;
      }
      
      if (lastIndex < line.length) {
        elements.push(line.slice(lastIndex));
      }

      return (
        <div key={lineIdx} className="min-h-[1.2rem] whitespace-pre">
          {elements.length > 0 ? elements : line}
        </div>
      );
    });
  };

  return (
    <div
      className={`w-full rounded-xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden font-mono text-[11px] sm:text-xs transition-all duration-300 ${
        isOffset 
          ? "scale-95 select-none" 
          : ""
      }`}
    >
      <div className="bg-muted px-4 py-2.5 border-b border-border flex items-center justify-between text-[10px] text-muted-foreground select-none">
        <div className="flex space-x-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500/80" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/80" />
          <div className="h-2 w-2 rounded-full bg-green-500/80" />
        </div>
        <span className="font-mono text-[9px] opacity-75">{title}</span>
        <div className="w-8" />
      </div>

      <div className="p-5 overflow-x-auto min-h-[12rem] flex flex-col justify-start">
        <pre className="text-foreground leading-relaxed font-mono">
          {highlightToken(typedCode)}
        </pre>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const [algo1, setAlgo1] = useState<typeof ALGORITHMS[0] | null>(null);
  const [algo2, setAlgo2] = useState<typeof ALGORITHMS[0] | null>(null);

  useEffect(() => {
    // Pick 2 random algorithms
    const shuffled = [...ALGORITHMS].sort(() => 0.5 - Math.random());
    setAlgo1(shuffled[0]);
    setAlgo2(shuffled[1]);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-background text-foreground font-mono flex flex-col justify-between overflow-hidden p-8 md:p-16 selection:bg-cyan-500/20">
      
      <div className="flex flex-col justify-between min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-8rem)] w-full max-w-5xl mx-auto space-y-12">
        
        <header className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="font-bold text-sm tracking-tight text-foreground">codearena.io</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={() => router.push(isSignedIn ? "/home" : "/login")}
              variant="outline"
              className="border-border text-foreground hover:bg-muted text-xs font-mono px-4 py-2"
              disabled={!isLoaded}
            >
              {!isLoaded ? "Loading..." : isSignedIn ? "Dashboard" : "Sign In"}
            </Button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full my-auto">
          
          <section className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                1v1 coding battles.
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                Match instantly with opponents. Solve the algorithmic challenge first to claim the win and climb the ladder.
              </p>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => router.push("/home")}
                className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs rounded-none px-6 py-5 flex items-center transition-all"
              >
                ENTER ARENA
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </div>
          </section>

          <section className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md h-[25rem] mt-6 sm:mt-0">
              {/* Back Card */}
              <div className="absolute top-0 right-0 w-[72%] transition-all hover:scale-[1.02] duration-300 z-0">
                {algo1 && <CodeBlock code={algo1.code} title={algo1.title} isOffset={true} />}
              </div>
              {/* Front Card */}
              <div className="absolute top-44 left-0 w-[72%] transition-all hover:scale-[1.02] duration-300 z-10">
                {algo2 && <CodeBlock code={algo2.code} title={algo2.title} isOffset={false} />}
              </div>
            </div>
          </section>

        </main>

        <footer className="flex justify-between text-[10px] text-muted-foreground/60 w-full border-t border-border pt-4">
          <span>© {new Date().getFullYear()} CodeArena</span>
        </footer>

      </div>

    </div>
  );
}
