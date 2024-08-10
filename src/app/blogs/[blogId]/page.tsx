// 必要なモジュールと関数をインポート
import { notFound } from "next/navigation";
import { getDetail, getBlogs } from "@/../libs/client";
import { formatDate } from "@/lib/utils";

// 静的生成のためのパラメータを生成する関数
export async function generateStaticParams() {
  const { contents } = await getBlogs(); // すべてのブログ記事を取得
  // 各ブログ記事のIDをパラメータとして返す
  return contents.map((blog) => ({
    blogId: blog.id,
  }));
}

// メタデータを生成する関数
export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}) {
  const blog = await getDetail(params.blogId); // 特定のブログ記事の詳細を取得
  if (!blog) {
    // ブログ記事が見つからない場合のメタデータ
    return {
      title: "ブログ記事が見つかりません",
    };
  }
  // ブログ記事が見つかった場合のメタデータ
  return {
    title: blog.title,
    description: blog.body.substring(0, 160), // 本文の最初の160文字を説明文として使用
  };
}

// ブログ記事詳細ページのメインコンポーネント
export default async function StaticDetailPage({
  params: { blogId },
}: {
  params: { blogId: string };
}) {
  const blog = await getDetail(blogId); // 特定のブログ記事の詳細を取得
  if (!blog) {
    notFound(); // ブログ記事が見つからない場合は404ページを表示
  }

  return (
    <article className="prose lg:prose-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-base-content/70 mb-4">{formatDate(blog.day)}</p>
      {/* dangerouslySetInnerHTMLを使用して本文をHTMLとしてレンダリング */}
      <div
        dangerouslySetInnerHTML={{
          __html: blog.body,
        }}
      />
    </article>
  );
}
