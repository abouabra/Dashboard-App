import { prisma } from "@/lib/prisma";


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;

        const agency = await prisma.agency.findUnique({
            where: { id },
        });

		if (!agency) {
			return Response.json({ error: "Agency not found" }, { status: 404 });
		}

		return Response.json(agency);
	} catch (error) {
		console.error("Error fetching agency:", error);
		return Response.json({ error: "Failed to fetch agency details" }, { status: 500 });
	}
}
