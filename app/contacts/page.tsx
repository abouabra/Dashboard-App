import React from "react";
import ClerkProfile from "@/components/clerk-profile";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ContactsPage = async () => {
	const contacts = await prisma.contact.findMany({
		select: { id: true, first_name: true, last_name: true, email: true },
		take: 10,
	});

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-8xl font-bold">Contacts Page</h1>
			<div className="max-w-3xl w-full mt-10">
				<ClerkProfile />
			</div>
			<Button variant="default" asChild>
				<Link href="/agencies">Go to Agencies Page</Link>
			</Button>
			<ul>
				{contacts.map((a) => (
					<li key={a.id}>
						{a.first_name ?? "N/A"} - {a.last_name ?? "N/A"}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ContactsPage;
