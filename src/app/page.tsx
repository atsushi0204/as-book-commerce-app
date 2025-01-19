"use client";

import Book from "./components/Book";
import { Suspense, useEffect, useState } from "react";
import { getAllBooks } from "./lib/microcms/client";
import { BookType, Purchase, User } from "./types/types";
import { useSession } from "next-auth/react";

export default function Home() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [purchasesData, setPurchasesData] = useState<Purchase[]>([]);

  // SSR時に、sessionを受け取る際は必要
  // const sesion = await getServerSession(nextAuthOptions);
  const { data: session } = useSession();
  const user = session?.user as User;

  useEffect(() => {
    const fetchMicroCMS = async () => {
      const { contents: _books } = await getAllBooks();
      setBooks(_books);
    };
    fetchMicroCMS();
  }, []);

  useEffect(() => {
    if (!user) return;

    const setSessionUser = async (_user: User) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/purchases/${_user.id}`
      );
      setPurchasesData(await res.json());
    };
    setSessionUser(user);
  }, [user]);

  const isBookPurchased = (bookId: string) => {
    const purchaseBookIds = purchasesData.map(
      (purchaseBook: Purchase) => purchaseBook.bookId
    );
    return purchaseBookIds.includes(bookId);
  };

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        <Suspense fallback={<p>Loading...</p>}>
          {books.map((book: BookType) => (
            <Book
              key={book.id}
              book={book}
              isPurchased={isBookPurchased(book.id)}
            />
          ))}
        </Suspense>
      </main>
    </>
  );
}
