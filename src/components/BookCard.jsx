

// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/context/AuthContext";
// import { deleteBook } from "@/services/bookService";
// import { useCart } from "@/context/CartContext";
// import EditBookDialog from "@/components/EditBookDialog";
// import { toast } from "sonner";
// import BookImageSlider from "@/components/BookImageSlider";

// const BookCard = ({ book, onRefresh }) => {
//   const { user } = useAuth();
//   const { addToCart } = useCart();

//   const isLowStock = book.stock < 5;

//   const handleDelete = async () => {
//     await deleteBook(book._id);
//     onRefresh();
//   };

//   // ✅ ADD THIS FUNCTION
//   const handleAddToCart = () => {
//     if (!user) {
//       toast.error("Login required", {
//         description: "Please login to continue",
//       });
//       return;
//     }

//     addToCart(book);
//     toast.success("Added to cart", {
//       description: book.title,
//     });
//   };

//   return (
//     <Card className="relative">
//       {isLowStock && (
//         <span className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded">
//           Low Stock
//         </span>
//       )}
//       <BookImageSlider images={book.images} />
//       <CardHeader className="font-bold text-lg">{book.title}</CardHeader>

//       <CardContent className="space-y-2">
//         <p className="text-sm text-muted-foreground">
//           {book.description?.slice(0, 100)}...
//         </p>
//         <p>Author: {book.author}</p>
//         <p>Price: ₹{book.price}</p>
//         <p className={isLowStock ? "text-red-500" : ""}>Stock: {book.stock}</p>

//         {/* ADMIN ACTIONS */}
//         {user?.role === "admin" && (
//           <div className="flex gap-2 pt-2">
//             <EditBookDialog book={book} onRefresh={onRefresh} />
//             <Button variant="destructive" onClick={handleDelete}>
//               Delete
//             </Button>
//           </div>
//         )}

//         {/* CUSTOMER / GUEST ACTION */}
//         {user?.role !== "admin" && (
//           <Button onClick={handleAddToCart} className="w-full mt-2">
//             Add to Cart
//           </Button>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default BookCard;



import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { deleteBook } from "@/services/bookService";
import { useCart } from "@/context/CartContext";
import EditBookDialog from "@/components/EditBookDialog";
import { toast } from "sonner";
import BookImageSlider from "@/components/BookImageSlider";

const BookCard = ({ book, onRefresh }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const isLowStock = book.stock < 5;

  const handleDelete = async () => {
    await deleteBook(book._id);
    onRefresh();
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Login required", {
        description: "Please login to continue",
      });
      return;
    }

    addToCart(book);
    toast.success("Added to cart", {
      description: book.title,
    });
  };

  return (
    <Card className="group overflow-hidden rounded-xl border hover:shadow-lg transition">
      {/* IMAGE */}
      <div className="relative h-44 bg-muted">
        {isLowStock && (
          <span className="absolute top-2 right-2 z-10 text-xs bg-red-500 text-white px-2 py-1 rounded">
            Low Stock
          </span>
        )}

        <BookImageSlider images={book.images} />
      </div>

      {/* CONTENT */}
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-sm line-clamp-1">
          {book.title}
        </h3>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {book.description || "No description available"}
        </p>

        <div className="flex justify-between items-center text-sm">
          <span className="font-medium">₹{book.price}</span>
          <span
            className={`text-xs ${
              isLowStock ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            Stock: {book.stock}
          </span>
        </div>

        {/* ACTIONS */}
        {user?.role === "admin" ? (
          <div className="flex gap-2 pt-2">
            <EditBookDialog book={book} onRefresh={onRefresh} />
            <Button size="sm" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            className="w-full mt-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard;
