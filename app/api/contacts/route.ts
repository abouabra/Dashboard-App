import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 30

export async function GET(request: Request) {
	try {
	const { searchParams } = new URL(request.url)
	const page = Number.parseInt(searchParams.get("page") || "1", 10)

    const totalItems = await prisma.contact.count()
    
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    const validPage = Math.max(1, Math.min(page, totalPages))
    const skip = (validPage - 1) * ITEMS_PER_PAGE

	const contacts = await prisma.contact.findMany({
		select: {
			id: true,
			first_name: true,
			last_name: true,
		},
		take: ITEMS_PER_PAGE,
		skip: skip,
	});

	
		return Response.json({
			data: contacts,
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
		console.error("Error fetching contacts:", error);
		return Response.json({ error: "Failed to fetch contacts" }, { status: 500 });
	}
}
