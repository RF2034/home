"use client";

import { FC, useEffect, useRef } from "react";
import parse, {
  domToReact,
  Element,
  attributesToProps,
  HTMLReactParserOptions,
  DOMNode,
} from "html-react-parser";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { isValidElement, ReactNode } from "react";

interface BlogContentProps {
  content: string;
}

const sanitizeAndOptimizeContent = (htmlContent: string): string => {
  return DOMPurify.sanitize(htmlContent, {
    ADD_TAGS: ["iframe", "script"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "style",
      "src",
      "class",
    ],
    FORBID_TAGS: [],
    // ALLOW_SCRIPT_CONTENT: trueを削除
  });
};

const BlogContent: FC<BlogContentProps> = ({ content }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const sanitizedContent = sanitizeAndOptimizeContent(content);

  useEffect(() => {
    if (contentRef.current) {
      const scripts = contentRef.current.getElementsByTagName("script");
      Array.from(scripts).forEach((script) => {
        const newScript = document.createElement("script");
        Array.from(script.attributes).forEach((attr) =>
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.appendChild(document.createTextNode(script.innerHTML));
        script.parentNode?.replaceChild(newScript, script);
      });
    }
  }, [sanitizedContent]);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        if (domNode.name === "iframe" || domNode.name === "script") {
          return domNode;
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
      return domToReact(parsedContent as unknown as DOMNode[]);
    } else {
      return parsedContent as ReactNode;
    }
  };

  return (
    <div
      className="blog-content"
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default BlogContent;
