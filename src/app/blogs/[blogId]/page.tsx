import { notFound } from "next/navigation";
import { getDetail, getBlogs } from "@/../libs/client";
import { formatDate } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// daisyUIのスピナーを使用したローディングコンポーネント
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
);

// 動的インポートを使用してBlogContentコンポーネントを遅延ロード
const BlogContent = dynamic(() => import("@/components/BlogContent"), {
  loading: () => <LoadingSpinner />,
});

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
  try {
    const blog = await getDetail(blogId);
    if (!blog) {
      notFound();
    }

    return (
      <article className="prose lg:prose-xl mx-auto max-w-4xl px-4">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-base-content/70 mb-4">{formatDate(blog.day)}</p>
        <Suspense fallback={<LoadingSpinner />}>
          <BlogContent content={blog.body} />
        </Suspense>
      </article>
    );
  } catch (error) {
    console.error("Error fetching blog details:", error);
    notFound();
  }
}
