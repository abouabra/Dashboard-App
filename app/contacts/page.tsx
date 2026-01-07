"use client";

import { useState, useEffect } from "react";

import { Loader2 } from "lucide-react";
import ExpandableContactsTable from "@/components/expandable-contacts-table";
import Pagination from "@/components/pagination";

interface MinimalContact {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	title: string;
}

interface PaginationInfo {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export default function ContactsPage() {
	const [data, setData] = useState<MinimalContact[]>([]);
	const [loading, setLoading] = useState(true);
	const [pagination, setPagination] = useState<PaginationInfo | null>(null);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchMinimalContacts = async () => {
			try {
				const response = await fetch(`/api/contacts?page=${currentPage}`);
				const result = await response.json();
				setData(result.data);
				setPagination(result.pagination);
			} catch (error) {
				console.error("Error fetching agencies:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMinimalContacts();
	}, [currentPage]);

	const handlePreviousPage = () => {
		setCurrentPage((prev) => Math.max(1, prev - 1));
	};

	const handleNextPage = () => {
		if (pagination?.hasNextPage) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	return (
		<main className="min-h-screen bg-background p-8">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-foreground">Contacts</h1>
					<p className="mt-2 text-muted-foreground">Click on a row to view detailed information about an contact.</p>
				</div>

				{loading ? (
					<div className="flex items-center justify-center py-12">
						<Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
					</div>
				) : (
					<>
						<ExpandableContactsTable data={data} />
						{pagination && <Pagination pagination={pagination} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} setCurrentPage={setCurrentPage} />}
					</>
				)}
			</div>
		</main>
	);
}
