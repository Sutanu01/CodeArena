import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { SocketProvider } from "@/socket/socket";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';
import StoreProvider from "@/redux/StoreProvider";
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
    
    <StoreProvider>
      <SocketProvider>
        <ClerkProvider>
          <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange={true}
                storageKey="Code Arena-theme"
              >
                {children}
                <Analytics />
                <SpeedInsights />
              </ThemeProvider>
            </body>
          </html>
        </ClerkProvider>
      </SocketProvider>
    </StoreProvider>
  );
}
