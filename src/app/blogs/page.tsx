import Link from "next/link";
import { getBlogs } from "@/../libs/client";
import {
  formatDate,
  trimBody,
  sortBlogsByDate,
  ExtendedBlog,
} from "@/lib/utils";
import PaginationControls from "@/components/PaginationControls";

const ITEMS_PER_PAGE = 12;

export async function generateStaticParams() {
  const { contents } = await getBlogs();
  const totalPages = Math.ceil(contents.length / ITEMS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function HomePage({
  params,
}: {
  params: { page: string };
}) {
  const page = Number(params.page) || 1;
  const { contents } = await getBlogs();

  if (!contents || contents.length === 0) {
    return <h1 className="text-3xl font-bold text-center mt-20">虚無がある</h1>;
  }

  const sortedContents = sortBlogsByDate(contents as ExtendedBlog[]);
  const totalItems = sortedContents.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedContents = sortedContents.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {paginatedContents.map((blog) => (
          <div
            key={blog.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">{blog.title}</h2>
              <p className="mb-4 text-base-content/70">
                {formatDate(blog.day)}
              </p>
              <p className="mb-4 text-base-content/70">{trimBody(blog.body)}</p>
              <div className="card-actions justify-end">
                <Link href={`/blogs/${blog.id}`}>
                  <button className="btn btn-outline btn-secondary">
                    続きを読む
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        basePath="/blogs"
      />
    </>
  );
}

export const dynamic = "error";
export const dynamicParams = false;
export const revalidate = false;
