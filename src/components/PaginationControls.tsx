"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationControls({
  hasNextPage,
  hasPrevPage,
  totalPages,
}: {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");
  const per_page = searchParams.get("per_page") ?? "24";

  const handlePageChange = (newPage: number) => {
    router.push(`/blogs?page=${newPage}&per_page=${per_page}`);
  };

  return (
    <div className="flex items-center justify-center my-8">
      <div className="join">
        <button
          className="join-item btn"
          disabled={!hasPrevPage}
          onClick={() => handlePageChange(page - 1)}
        >
          «
        </button>
        <button className="join-item btn">Page {page}</button>
        <button
          className="join-item btn"
          disabled={!hasNextPage}
          onClick={() => handlePageChange(page + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
}
