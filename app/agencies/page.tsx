import React from "react";
import ClerkProfile from "@/components/clerk-profile";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AgenciesPage = async () => {
	const agencies = await prisma.agency.findMany({
		select: { id: true, name: true, population: true },
		take: 10,
	});

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-8xl font-bold">Agencies Page</h1>
			<div className="max-w-3xl w-full mt-10">
				<ClerkProfile />
			</div>
			<Button variant="default" asChild>
				<Link href="/contacts">Go to Contacts Page</Link>
			</Button>
			<ul>
				{agencies.map((a) => (
					<li key={a.id}>
						{a.name} - {a.population ?? "N/A"}
					</li>
				))}
			</ul>
		</div>
	);
};

export default AgenciesPage;
