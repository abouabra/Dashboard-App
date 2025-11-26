import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

const roboto = Roboto({
	weight: ["400", "700"],
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
				<body className={`${roboto.variable} antialiased min-h-screen`}>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<header className="flex items-center justify-between h-16 px-6 shadow-sm bg-background/80 backdrop-blur-md">
							{/* Left Navigation */}
							<nav className="flex items-center gap-3">
								<Button asChild variant="ghost" className="text-base font-medium px-4 py-2 rounded-xl hover:bg-accent">
									<Link href="/agencies">Agencies</Link>
								</Button>
								<Button asChild variant="ghost" className="text-base font-medium px-4 py-2 rounded-xl hover:bg-accent">
									<Link href="/contacts">Contacts</Link>
								</Button>
							</nav>

							
							{/* Right Auth Buttons */}
							<div className="flex items-center gap-3">
								<ThemeToggle />
								<SignedOut>
									<SignInButton>
										<Button variant="outline" className="rounded-xl px-4">
											Sign In
										</Button>
									</SignInButton>
									<SignUpButton>
										<Button variant="default" className="rounded-xl px-4">
											Sign Up
										</Button>
									</SignUpButton>
								</SignedOut>

								<SignedIn>
									<UserButton />
								</SignedIn>
							</div>
						</header>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
