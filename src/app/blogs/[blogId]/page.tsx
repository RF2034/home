import { notFound } from "next/navigation";
import { getDetail, getBlogs } from "@/../libs/client";
import { formatDate } from "@/lib/utils";
import { optimizeImages } from "@/lib/OptimizedImage";

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

  const optimizedBody = optimizeImages(blog.body);

  return (
    <article className="prose lg:prose-xl mx-auto max-w-4xl px-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-base-content/70 mb-4">{formatDate(blog.day)}</p>
      <div
        className="w-full [&_img]:my-4 [&_img]:max-w-full [&_img]:object-contain"
        dangerouslySetInnerHTML={{
          __html: optimizedBody,
        }}
      />
    </article>
  );
}
