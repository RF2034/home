// src/app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  const blogId = request.headers.get("x-blog-id");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (!blogId) {
    return NextResponse.json(
      { message: "BlogId is required" },
      { status: 400 }
    );
  }

  try {
    // ブログ一覧ページを再検証
    revalidatePath("/blogs");
    // 特定の記事ページを再検証
    revalidatePath(`/blogs/${blogId}`);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
