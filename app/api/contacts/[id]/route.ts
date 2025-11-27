import { prisma } from "@/lib/prisma";


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;

        const contact = await prisma.contact.findUnique({
            where: { id },
        });

		if (!contact) {
			return Response.json({ error: "Contact not found" }, { status: 404 });
		}

		return Response.json(contact);
	} catch (error) {
		console.error("Error fetching contact:", error);
		return Response.json({ error: "Failed to fetch contact details" }, { status: 500 });
	}
}
