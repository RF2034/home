import { FC } from "react";
import Script from "next/script";
import parse, {
  domToReact,
  Element,
  attributesToProps,
  HTMLReactParserOptions,
} from "html-react-parser";
import Image from "next/image";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

interface BlogContentProps {
  content: string;
}

const sanitizeAndOptimizeContent = (htmlContent: string): string => {
  const window = new JSDOM("").window as unknown as Window;
  const purify = DOMPurify(window);

  // カスタムのDOMPurify設定
  const clean = purify.sanitize(htmlContent, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    FORBID_ATTR: ["style"], // style属性を禁止
    FORBID_TAGS: ["script"], // scriptタグを禁止
  });

  const dom = new JSDOM(clean);
  const document = dom.window.document;

  // iframeの処理
  const iframes = document.getElementsByTagName("iframe");
  Array.from(iframes).forEach((iframe) => {
    iframe.removeAttribute("style");
    iframe.setAttribute("class", "w-full h-full absolute top-0 left-0");
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "relative w-full pt-[56.25%]"); // 16:9のアスペクト比
    iframe.parentNode?.insertBefore(wrapper, iframe);
    wrapper.appendChild(iframe);
  });

  // 画像の処理
  const images = document.getElementsByTagName("img");
  Array.from(images).forEach((img) => {
    img.removeAttribute("style");
    img.setAttribute("class", "max-w-full h-auto rounded-lg shadow-lg");
    img.setAttribute("loading", "lazy");
  });

  return document.body.innerHTML;
};

const BlogContent: FC<BlogContentProps> = ({ content }) => {
  const sanitizedContent = sanitizeAndOptimizeContent(content);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        if (domNode.name === "iframe") {
          const { src, ...props } = domNode.attribs;
          return (
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="w-full h-full absolute top-0 left-0"
                src={src}
                {...props}
              />
            </div>
          );
        }
        if (domNode.name === "img") {
          const { src, alt, width, height, ...rest } = domNode.attribs;
          return (
            <Image
              src={src}
              alt={alt || ""}
              width={width ? parseInt(width, 10) : 800}
              height={height ? parseInt(height, 10) : 600}
              {...attributesToProps(rest)}
            />
          );
        }
      }
    },
  };

  const parsedContent = parse(sanitizedContent, options);

  return (
    <>
      <div className="blog-content">{parsedContent}</div>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
      <Script src="https://cdn.iframe.ly/embed.js" strategy="lazyOnload" />
    </>
  );
};

export default BlogContent;
