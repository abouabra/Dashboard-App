import { prisma } from "@/lib/prisma";

export async function GET() {
    const agencies = await prisma.agency.findMany({
		select: {
            id: true,
            name: true,
            state: true,
            population: true,
        },
        take: 20,
	});

    try {
		return Response.json(agencies);
	} catch (error) {
		console.error("Error fetching agencies:", error);
		return Response.json({ error: "Failed to fetch agencies" }, { status: 500 });
	}
}
