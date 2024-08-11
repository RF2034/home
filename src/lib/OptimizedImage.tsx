import { JSDOM } from "jsdom";

export function optimizeImages(htmlContent: string): string {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  const images = document.getElementsByTagName("img");

  Array.from(images).forEach((img) => {
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt") || "";
    const width = img.getAttribute("width");
    const height = img.getAttribute("height");

    if (src) {
      // Tailwind クラスを使用して画像スタイルを定義
      const tailwindClasses = [
        "max-w-full",
        "max-h-[70vh]",
        "w-auto",
        "h-auto",
        "rounded-3xl",
        "shadow-2xl",
        "object-contain",
        "object-center",
      ].join(" ");

      const optimizedImageTag = `
        <img
          src="${src}?auto=format,compress&fit=max"
          alt="${alt}"
          class="${tailwindClasses}"
          ${width ? `width="${width}"` : ""}
          ${height ? `height="${height}"` : ""}
          loading="lazy"
        />`;

      img.outerHTML = optimizedImageTag;
    }
  });

  return document.body.innerHTML;
}

// 画像のサイズを相対的に調整する関数 (Tailwind の動的クラス生成に使用可能)
export function calculateRelativeSize(
  actualSize: number,
  containerSize: number
): string {
  const percentage = Math.min((actualSize / containerSize) * 100, 100);
  // Tailwind の任意の値を使用
  return `w-[${percentage.toFixed(2)}%]`;
}

// 使用例
export function ExampleUsage() {
  const htmlContent = `
    <div>
      <img src="example1.jpg" width="800" height="600" alt="Example 1">
      <img src="example2.jpg" width="400" height="800" alt="Example 2">
    </div>
  `;

  const optimizedContent = optimizeImages(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: optimizedContent }} />;
}
