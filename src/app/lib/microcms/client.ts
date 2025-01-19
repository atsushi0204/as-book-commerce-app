import { BookType } from "@/app/types/types";
import { createClient } from "microcms-js-sdk";

const client = createClient({
  // 末尾に!は、 「|| ""」　と同義
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
  });
  return allBooks;
};

export const getDetailBook = async (contentId: string) => {
  const detailBook = await client.getListDetail<BookType>({
    endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    contentId,
  });
  return detailBook;
};
