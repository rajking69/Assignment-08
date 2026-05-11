import booksData from "../../../../public/data.json";
import BooksCatalog from "../../Components/BooksCatalog/BooksCatalog";

export const metadata = {
  title: "All Books | ReadVault",
  description: "Browse the full collection of Story, Tech, and Science books.",
};

const AllBooksPage = () => {
  const books = Array.isArray(booksData) ? booksData : [];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-10 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-950">All Books</h1>
          <p className="mt-1 text-sm text-slate-500">
            {books.length} titles across Story, Tech, and Science
          </p>
        </div>
        <BooksCatalog books={books} />
      </div>
    </main>
  );
};

export default AllBooksPage;
