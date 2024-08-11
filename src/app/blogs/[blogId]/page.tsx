import { notFound } from "next/navigation";
import { getDetail, getBlogs } from "@/../libs/client";
import { formatDate } from "@/lib/utils";
import OptimizedImage from "@/components/OptimizedImage";

export async function generateStaticParams() {
  const { contents } = await getBlogs();
  return contents.map((blog) => ({
    blogId: blog.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}) {
  const blog = await getDetail(params.blogId);
  if (!blog) {
    return {
      title: "ブログ記事が見つかりません",
    };
  }
  return {
    title: blog.title,
    description: blog.body.substring(0, 160),
  };
}

export default async function StaticDetailPage({
  params: { blogId },
}: {
  params: { blogId: string };
}) {
  const blog = await getDetail(blogId);
  if (!blog) {
    notFound();
  }

  return (
    <article className="prose lg:prose-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-base-content/70 mb-4">{formatDate(blog.day)}</p>
      {blog.image && (
        <OptimizedImage
          src={blog.image.url}
          alt={blog.image.alt || blog.title}
          className="w-full h-auto mb-4"
        />
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: blog.body,
        }}
      />
    </article>
  );
}
