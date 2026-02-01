import { useEffect, useState } from "react";
import api from "@/services/api";

const LowStock = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books/low-stock").then(res => setBooks(res.data));
  }, []);

  if (books.length === 0) return null;

  return (
    <div className="border p-4 rounded bg-red-50">
      <h2 className="font-bold text-red-600 mb-2">⚠ Low Stock</h2>
      {books.map(book => (
        <p key={book._id}>
          {book.title} — <b>{book.stock}</b> left
        </p>
      ))}
    </div>
  );
};

export default LowStock;
