import Link from "next/link";

export default function PaginationControls({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center my-8">
      <div className="join">
        <Link
          href={hasPrevPage ? `${basePath}/${currentPage - 1}` : "#"}
          passHref
        >
          <button className="join-item btn secondary" disabled={!hasPrevPage}>
            «
          </button>
        </Link>
        <button className="join-item btn">Page {currentPage}</button>
        <Link
          href={hasNextPage ? `${basePath}/${currentPage + 1}` : "#"}
          passHref
        >
          <button className="join-item btn secondary" disabled={!hasNextPage}>
            »
          </button>
        </Link>
      </div>
    </div>
  );
}
