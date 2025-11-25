import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const roboto = Roboto({
  weight : ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dashboard - InfinitiveByte",
  description: "A secure dashboard application with authentication using Clerk and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} antialiased flex flex-col min-h-screen`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <ThemeToggle />
              <SignedOut>
                <SignInButton >
                  <Button>
                  Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button variant="secondary">
                  Sign Up
                  </Button>  
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
