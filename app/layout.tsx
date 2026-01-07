import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

const roboto = Roboto({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--font-roboto",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Dashboard",
	description: "A secure dashboard application with authentication using Clerk and Next.js.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { userId } = await auth();

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${roboto.variable} antialiased min-h-screen flex flex-col`}>
				<ClerkProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<header className="flex items-center justify-between h-16 px-6 shadow-sm bg-background/80 backdrop-blur-md">
							{/* Left Navigation */}
							{userId && (
								<nav className="flex items-center gap-3">
									<Button asChild variant="ghost" className="text-base font-medium px-4 py-2 rounded-xl hover:bg-accent">
										<Link href="/agencies">Agencies</Link>
									</Button>
									<Button asChild variant="ghost" className="text-base font-medium px-4 py-2 rounded-xl hover:bg-accent">
										<Link href="/contacts">Contacts</Link>
									</Button>
								</nav>
							)}

							{/* Right Auth Buttons */}
							<div className="flex items-center gap-3 ml-auto">
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
						<main className="flex flex-1 flex-col">{children}</main>
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
