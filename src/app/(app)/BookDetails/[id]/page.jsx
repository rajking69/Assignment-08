/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import booksData from "../../../../../public/data.json";
import BookDetailsClient from "./BookDetailsClient";

export async function generateMetadata({ params }) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const book = Array.isArray(booksData)
    ? booksData.find((b) => b.id === id)
    : null;

  return {
    title: book ? `${book.title} | ReadVault` : "Book | ReadVault",
    description: book?.description || "Book details on ReadVault.",
  };
}

const BookDetailsPage = async ({ params }) => {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) notFound();

  const books = Array.isArray(booksData) ? booksData : [];
  const book = books.find((b) => b.id === id);
  if (!book) notFound();

  return <BookDetailsClient book={book} />;
};

export default BookDetailsPage;
