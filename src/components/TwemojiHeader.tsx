"use client";

import React, { useEffect, useRef } from "react";
import twemoji from "twemoji";

export default function TwemojiHeader() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (h1Ref.current) {
      twemoji.parse(h1Ref.current);
    }
  }, []);

  return (
    <h1 ref={h1Ref} className="text-6xl mb-4">
      🐈️
    </h1>
  );
}
