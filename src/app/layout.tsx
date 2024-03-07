"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import NavBar from "@/components/core/Navbar";
import { EdgeStoreProvider } from '../lib/edgestore';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <EdgeStoreProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem >
        <SessionProvider>
                <main className="flex min-h-screen flex-col items-center max-w-screen relative">
      <NavBar/>
      <div className="w-full flex flex-col items-center relative justify-center pt-32">
          {children}
          </div>
          </main>
        </SessionProvider>
        <Toaster />
      </ThemeProvider>
      </EdgeStoreProvider>
      </body>
    </html>
  );
}
