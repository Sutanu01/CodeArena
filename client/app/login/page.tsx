// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { Mail, Lock, Code2, ArrowLeft } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// export default function LoginPage() {
//   const [isLogin, setIsLogin] = useState(true)
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     // Simulate authentication
//     setTimeout(() => {
//       setIsLoading(false)
//       router.push("/home")
//     }, 1500)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

//       {/* Header */}
//       <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
//         <Link
//           href="/home"
//           className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           <span className="text-sm">Back to home</span>
//         </Link>
//         <ThemeToggle />
//       </div>

//       <div className="relative z-10 w-full max-w-md">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <Link href="/" className="inline-flex items-center space-x-2">
//             <Code2 className="h-8 w-8 text-primary" />
//             <span className="text-2xl font-bold">Code Arena</span>
//           </Link>
//           <p className="text-muted-foreground mt-2">
//             {isLogin ? "Welcome back to the arena" : "Join the coding battlefield"}
//           </p>
//         </div>

//         <Card className="shadow-lg border-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl">{isLogin ? "Sign In" : "Create Account"}</CardTitle>
//             <CardDescription>
//               {isLogin ? "Enter your credentials to access your account" : "Create a new account to start competing"}
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10"
//                     required
//                   />
//                 </div>
//               </div>

//               {!isLogin && (
//                 <div className="space-y-2">
//                   <Label htmlFor="confirmPassword">Confirm Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       id="confirmPassword"
//                       type="password"
//                       placeholder="Confirm your password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>
//               )}

//               {isLogin && (
//                 <div className="flex items-center justify-between text-sm">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input type="checkbox" className="rounded border-input" />
//                     <span className="text-muted-foreground">Remember me</span>
//                   </label>
//                   <Link href="#" className="text-primary hover:underline">
//                     Forgot password?
//                   </Link>
//                 </div>
//               )}

//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? (
//                   <div className="flex items-center space-x-2">
//                     <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
//                     <span>{isLogin ? "Signing in..." : "Creating account..."}</span>
//                   </div>
//                 ) : isLogin ? (
//                   "Sign In"
//                 ) : (
//                   "Create Account"
//                 )}
//               </Button>

//               <div className="text-center">
//                 <button
//                   type="button"
//                   onClick={() => setIsLogin(!isLogin)}
//                   className="text-sm text-muted-foreground hover:text-primary transition-colors"
//                 >
//                   {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
//                 </button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>

//         {/* Features */}
//         <div className="mt-8 text-center">
//           <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 bg-green-500 rounded-full" />
//               <span>Real-time battles</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 bg-blue-500 rounded-full" />
//               <span>Global rankings</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <div className="w-2 h-2 bg-purple-500 rounded-full" />
//               <span>Multiple languages</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn routing="hash" afterSignOutUrl="/" signUpUrl="/signup" />
    </div>
  );
};

export default SignInComponent;
