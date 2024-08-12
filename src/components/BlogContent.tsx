"use client";

import { FC, useEffect } from "react";
import parse, {
  domToReact,
  Element,
  attributesToProps,
  HTMLReactParserOptions,
} from "html-react-parser";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { isValidElement, ReactNode } from "react";

interface BlogContentProps {
  content: string;
}

const sanitizeAndOptimizeContent = (htmlContent: string): string => {
  return DOMPurify.sanitize(htmlContent, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    FORBID_ATTR: ["style"],
    FORBID_TAGS: ["script"],
  });
};

const BlogContent: FC<BlogContentProps> = ({ content }) => {
  const sanitizedContent = sanitizeAndOptimizeContent(content);

  useEffect(() => {
    // Twitter widgets
    const twitterScript = document.createElement("script");
    twitterScript.src = "https://platform.twitter.com/widgets.js";
    twitterScript.async = true;
    document.body.appendChild(twitterScript);

    // iframely
    const iframelyScript = document.createElement("script");
    iframelyScript.src = "https://cdn.iframe.ly/embed.js";
    iframelyScript.async = true;
    document.body.appendChild(iframelyScript);

    return () => {
      document.body.removeChild(twitterScript);
      document.body.removeChild(iframelyScript);
    };
  }, []);

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

  const renderContent = (): ReactNode => {
    if (isValidElement(parsedContent)) {
      return parsedContent;
    } else if (Array.isArray(parsedContent)) {
      return domToReact(parsedContent as unknown as Element[]);
    } else {
      return parsedContent as ReactNode;
    }
  };

  return <div className="blog-content">{renderContent()}</div>;
};

export default BlogContent;
