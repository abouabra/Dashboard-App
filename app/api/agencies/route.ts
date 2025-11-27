import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 30

export async function GET(request: Request) {
	try {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1", 10)

    const totalItems = await prisma.agency.count()
    
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    const validPage = Math.max(1, Math.min(page, totalPages))
    const skip = (validPage - 1) * ITEMS_PER_PAGE

	const agencies = await prisma.agency.findMany({
		select: {
			id: true,
			name: true,
			state: true,
			population: true,
		},
		take: ITEMS_PER_PAGE,
		skip: skip,
	});

	
		return Response.json({
			data: agencies,
			pagination: {
			  currentPage: validPage,
			  totalPages,
			  totalItems,
			  itemsPerPage: ITEMS_PER_PAGE,
			  hasNextPage: validPage < totalPages,
			  hasPreviousPage: validPage > 1,
			},
		  })
	} catch (error) {
		console.error("Error fetching agencies:", error);
		return Response.json({ error: "Failed to fetch agencies" }, { status: 500 });
	}
}
