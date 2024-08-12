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

interface BlogContentProps {
  content: string;
}

const optimizeImages = (htmlContent: string): string => {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  const images = document.getElementsByTagName("img");

  Array.from(images).forEach((img) => {
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt") || "";
    const width = img.getAttribute("width");
    const height = img.getAttribute("height");

    if (src) {
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

      img.className = tailwindClasses;
      img.src = `${src}?auto=format,compress&fit=max`;
      img.alt = alt;
      if (width) img.width = parseInt(width);
      if (height) img.height = parseInt(height);
      img.setAttribute("loading", "lazy");

      // Remove any inline styles
      img.removeAttribute("style");
    }
  });

  return document.body.innerHTML;
};

const BlogContent: FC<BlogContentProps> = ({ content }) => {
  const optimizedContent = optimizeImages(content);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        if (domNode.name === "iframe") {
          const { src, ...props } = domNode.attribs;
          return (
            <>
              <iframe {...props} src={src} />
              <Script src={src} />
            </>
          );
        }
        if (domNode.name === "img") {
          const { src, alt, width, height, ...rest } = domNode.attribs;
          return (
            <Image
              src={src}
              alt={alt || ""}
              width={width ? parseInt(width, 10) : undefined}
              height={height ? parseInt(height, 10) : undefined}
              {...attributesToProps(rest)}
            />
          );
        }
        // Remove any inline styles from all elements
        if (domNode.attribs && domNode.attribs.style) {
          delete domNode.attribs.style;
        }
      }
    },
  };

  const parsedContent = parse(optimizedContent, options);

  return <div>{parsedContent}</div>;
};

export default BlogContent;
