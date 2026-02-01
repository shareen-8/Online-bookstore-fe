import { useEffect, useState } from "react";
import { getBooks } from "@/services/bookService";
import BookCard from "@/components/BookCard";
import AddBookDialog from "@/components/AddBookDialog";
import AdminOrders from "@/components/AdminOrders";
import LowStock from "@/components/LowStock";


const AdminDashboard = () => {
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Books</h1>
        <AddBookDialog onRefresh={fetchBooks} />
      </div>
      <LowStock />
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {books.map(book => (
          <BookCard
            key={book._id}
            book={book}
            onRefresh={fetchBooks}
          />
        ))}
      </div>
      {/* <div className="mt-10">
        <AdminOrders />
      </div> */}
    </div>
  );
};

export default AdminDashboard;
