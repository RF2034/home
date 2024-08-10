import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 日付文字列を人間が読みやすい形式に整形する。
 *
 * @param {string} dateString - 整形する日付文字列。
 * @return {string} "YYYY/MM/DD"形式の整形済み日付文字列。
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

/**
 * 本文からhtmlタグを除去し、先頭50文字と末尾に...を加えたものを返す。
 *
 * @param {string} body - 本文
 * @return {string} 本文からhtmlタグを除去したもの
 */
export const trimBody = (body: string): string => {
  const trimmedBody = body.replace(/<[^>]*>?/gm, "");
  return trimmedBody.slice(0, 50) + "...";
};

// Blog型を更新
export interface Blog {
  title: string;
  body: string;
  day: string;
}

// MicroCMSの型を含む拡張されたBlog型
export type ExtendedBlog = Blog & MicroCMSContentId & MicroCMSDate;

// Date型に変換する関数（必要に応じて調整）
const parseDate = (blog: ExtendedBlog): Date => new Date(blog.day);

export const sortBlogsByDate = (blogs: ExtendedBlog[]): ExtendedBlog[] => {
  return [...blogs].sort(
    (a, b) => parseDate(b).getTime() - parseDate(a).getTime()
  );
};
