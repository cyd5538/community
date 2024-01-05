import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useNavigate, useSearchParams } from "react-router-dom"

interface SearchPageProps {
  onPageChange: (currentPage: number) => void
  totalPages: number
  currentPage: number
}

const SearchPage: React.FC<SearchPageProps> = ({ onPageChange, totalPages, currentPage }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams?.get("query");
  const searchQuery = query?.[0] || '';

  const navigateToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      navigate(`/search?query=${searchQuery}?page=${page}`);
    }
  };

  return (
    <Pagination className="pt-4 pb-4">
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={() => navigateToPage(currentPage - 1)} />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page} className={`cursor-pointer`}>
            <PaginationLink
              onClick={() => navigateToPage(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={() => navigateToPage(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default SearchPage;
