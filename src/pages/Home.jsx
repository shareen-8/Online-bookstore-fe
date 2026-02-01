import { useEffect, useState } from "react";
import { getBooks } from "@/services/bookService";
import BookCard from "@/components/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Book Store</h1>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

        {books.map(book => (
          <BookCard
            key={book._id}
            book={book}
            onRefresh={fetchBooks}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
