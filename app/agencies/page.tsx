"use client";

import { useState, useEffect } from "react";
import ExpandableAgencyTable from "@/components/expandable-agency-table";
import { Loader2 } from "lucide-react";
import Pagination from "@/components/pagination";

interface MinimalAgency {
	id: string;
	name: string | null;
	state: string | null;
	population: number | null;
}

interface PaginationInfo {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export default function AgenciesPage() {
	const [data, setData] = useState<MinimalAgency[]>([]);
	const [loading, setLoading] = useState(true);
	const [pagination, setPagination] = useState<PaginationInfo | null>(null);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchMinimalAgencies = async () => {
			try {
				const response = await fetch(`/api/agencies?page=${currentPage}`);
				const result = await response.json();
				setData(result.data);
				setPagination(result.pagination);
			} catch (error) {
				console.error("Error fetching agencies:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMinimalAgencies();
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
					<h1 className="text-4xl font-bold text-foreground">Agencies</h1>
					<p className="mt-2 text-muted-foreground">Click on a row to view detailed information about an agency.</p>
				</div>

				{loading ? (
					<div className="flex items-center justify-center py-12">
						<Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
					</div>
				) : (
					<>
						<ExpandableAgencyTable data={data} />

						{pagination && <Pagination pagination={pagination} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} setCurrentPage={setCurrentPage} />}
					</>
				)}
			</div>
		</main>
	);
}
