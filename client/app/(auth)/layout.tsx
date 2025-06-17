import { ThemeProvider } from "@/components/theme-provider";
import SignInComponent from "@/components/ui/SignIn";
import { Toaster } from "@/components/ui/sonner";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import type { Metadata } from "next";
import type React from "react";
import "../globals.css";

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
      <SignedIn>
        {children}
        <Toaster position="bottom-right" expand={true} richColors/>
      </SignedIn>
    </ThemeProvider>
  );
}
