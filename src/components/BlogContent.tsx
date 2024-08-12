import React, { FC } from "react";
import parse, {
  Element,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";

interface BlogContentProps {
  content: string;
}

const BlogContent: FC<BlogContentProps> = ({ content }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        if (domNode.name === "iframe") {
          const { src, ...props } = domNode.attribs;
          return <iframe src={src} {...props} />;
        }
      }
    },
  };

  const parsedContent = parse(content, options);

  return <div>{parsedContent}</div>;
};

export default BlogContent;
