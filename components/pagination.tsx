import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
	pagination: {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
	};
	handlePreviousPage: () => void;
	handleNextPage: () => void;
	setCurrentPage: (page: number) => void;
}

const Pagination = ({ pagination, handlePreviousPage, handleNextPage, setCurrentPage }: PaginationProps) => {
	return (
		<div className="mt-8 flex items-center justify-between border-t border-border pt-6">
			<div className="text-sm text-muted-foreground">
				Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalItems} total)
			</div>

			<div className="flex gap-2">
				<Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={!pagination.hasPreviousPage} className="flex items-center gap-2 bg-transparent">
					<ChevronLeft className="h-4 w-4" />
					Previous
				</Button>

				<div className="flex items-center gap-1">
					{Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, i) => {
						let pageNum: number;
						if (pagination.totalPages <= 5) {
							pageNum = i + 1;
						} else if (pagination.currentPage <= 3) {
							pageNum = i + 1;
						} else if (pagination.currentPage >= pagination.totalPages - 2) {
							pageNum = pagination.totalPages - 4 + i;
						} else {
							pageNum = pagination.currentPage - 2 + i;
						}

						return (
							<Button key={pageNum} variant={pageNum === pagination.currentPage ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(pageNum)} className="h-8 w-8 p-0">
								{pageNum}
							</Button>
						);
					})}
				</div>

				<Button variant="outline" size="sm" onClick={handleNextPage} disabled={!pagination.hasNextPage} className="flex items-center gap-2 bg-transparent">
					Next
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default Pagination;
