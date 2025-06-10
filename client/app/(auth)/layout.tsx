import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import SignInComponent from "@/components/ui/SignIn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Arena - 1v1 Competitive Programming",
  description: "Challenge developers worldwide in real-time coding battles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="Code Arena-theme"
    >
      <SignedOut>
        <SignInComponent />
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </ThemeProvider>
  );
}
