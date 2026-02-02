import { Button } from "@/src/components/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/src/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationProps) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#E5E7EB]">
      {/* Page Status */}
      <div className="text-sm text-[#4B5565]">
        Page {currentPage} of {totalPages}
      </div>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {renderPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={cn(
              "size-8 rounded-full text-sm font-medium transition-colors",
              currentPage === page
                ? "bg-primary text-white"
                : "bg-white text-[#4B5565] border border-[#E5E7EB] hover:bg-[#F9FAFB]",
            )}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="size-8 rounded-full border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconChevronLeft className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="size-8 rounded-full border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
