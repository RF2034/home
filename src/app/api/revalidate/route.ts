import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  console.log("WebHook received:", new Date().toISOString());

  const secret = request.nextUrl.searchParams.get("secret");
  console.log("Received secret:", secret);

  if (secret !== process.env.REVALIDATE_SECRET) {
    console.log("Invalid secret");
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    console.log("Revalidating paths");
    revalidatePath("/blogs");
    revalidatePath("/blogs/[blogId]");
    console.log("Revalidation complete");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
