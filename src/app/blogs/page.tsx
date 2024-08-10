// 必要なモジュールとコンポーネントをインポート
import Link from "next/link";
import { getBlogs } from "@/../libs/client";
import {
  formatDate,
  trimBody,
  sortBlogsByDate,
  ExtendedBlog,
} from "@/lib/utils";
import PaginationControls from "@/components/PaginationControls";

// 1ページあたりの記事数を定義
const ITEMS_PER_PAGE = 24;

// 静的生成のためのパラメータを生成する関数
export async function generateStaticParams() {
  const { contents } = await getBlogs(); // すべてのブログ記事を取得
  const totalPages = Math.ceil(contents.length / ITEMS_PER_PAGE); // 総ページ数を計算
  // 各ページに対応するパラメータオブジェクトの配列を返す
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

// メインのホームページコンポーネント
export default async function HomePage({
  params,
}: {
  params: { page: string };
}) {
  const page = Number(params.page) || 1; // 現在のページ番号（デフォルトは1）
  const { contents } = await getBlogs(); // すべてのブログ記事を取得

  // ブログ記事がない場合のフォールバック表示
  if (!contents || contents.length === 0) {
    return <h1 className="text-3xl font-bold text-center mt-20">虚無がある</h1>;
  }

  // ブログ記事を日付順にソート
  const sortedContents = sortBlogsByDate(contents as ExtendedBlog[]);
  const totalItems = sortedContents.length; // 総記事数
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE); // 総ページ数
  // 現在のページに表示する記事を抽出
  const paginatedContents = sortedContents.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      {/* ブログ記事のグリッド表示 */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {paginatedContents.map((blog) => (
          <div
            key={blog.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">{blog.title}</h2>
              <p className="mb-4 text-base-content/70">
                {formatDate(blog.day)} {/* 日付をフォーマット */}
              </p>
              <p className="mb-4 text-base-content/70">{trimBody(blog.body)}</p>{" "}
              {/* 本文を短縮 */}
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
      {/* ページネーションコントロール */}
      <PaginationControls
        hasNextPage={page < totalPages}
        hasPrevPage={page > 1}
        totalPages={totalPages}
      />
    </>
  );
}
