// import { Button } from "@/components/ui/button";
// import { useCart } from "@/context/CartContext";
// import api from "@/services/api";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const { cart, removeFromCart, clearCart } = useCart();
//   const navigate = useNavigate();

//   const total = cart.reduce(
//     (sum, item) => sum + item.book.price * item.qty,
//     0
//   );

//   const checkoutHandler = async () => {
//     await api.post("/orders", {
//       items: cart.map(item => ({
//         bookId: item.book._id,
//         quantity: item.qty,
//         price: item.book.price,

//       }))
//     });

//     clearCart();
//     navigate("/orders");
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🛒 Cart</h1>

//       {cart.length === 0 && <p>Your cart is empty</p>}

//       {cart.map(item => (
//         <div
//           key={item.book._id}
//           className="flex justify-between border-b py-3"
//         >
//           <div>
//             <p className="font-semibold">{item.book.title}</p>
//             <p>Qty: {item.qty}</p>
//           </div>

//           <div className="flex items-center gap-2">
//             <p>₹{item.book.price * item.qty}</p>
//             <Button
//               variant="destructive"
//               onClick={() => removeFromCart(item.book._id)}
//             >
//               Remove
//             </Button>
//           </div>
//         </div>
//       ))}

//       {cart.length > 0 && (
//         <div className="mt-6">
//           <h2 className="text-xl font-bold">Total: ₹{total}</h2>
//           <Button className="mt-4 w-full" onClick={checkoutHandler}>
//             Checkout
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import api, { API_BASE_URL } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.book.price * item.qty,
    0
  );

  const checkoutHandler = async () => {
    try {
      await api.post("/orders", {
        items: cart.map(item => ({
          bookId: item.book._id,
          quantity: item.qty,
          price: item.book.price,
        })),
      });

      toast.success("Order placed 🎉", {
        description: "Thank you for shopping with us",
      });

      clearCart();
      navigate("/orders");
    } catch (err) {
      toast.error("Checkout failed", {
        description: "Please try again",
      });
    }
  };
 
  
  const getImageUrl = (img) => {
  if (img.startsWith("http")) return img;
  return `${API_BASE_URL}${img}`;
};
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 && (
        <p className="text-muted-foreground">Your cart is empty</p>
      )}

      <div className="space-y-4">
        {cart.map(item => (
          <div
            key={item.book._id}
            className="flex gap-4 border rounded-lg p-4"
          >
            {/* Book Image */}
            <img
              src={
                item.book.images?.length
                  ? getImageUrl(item.book.images[0])
                  : "/placeholder.png"
              }
              alt={item.book.title}
              className="h-24 w-16 object-cover rounded"
            />

            {/* Book Info */}
            <div className="flex-1">
              <p className="font-semibold">{item.book.title}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.book.description}
              </p>
              <p className="mt-1 font-medium">₹{item.book.price}</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateQuantity(item.book._id, item.qty - 1)
                  }
                  disabled={item.qty <= 1}
                >
                  −
                </Button>

                <span className="font-medium">{item.qty}</span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateQuantity(item.book._id, item.qty + 1)
                  }
                >
                  +
                </Button>
              </div>
            </div>

            {/* Price + Remove */}
            <div className="flex flex-col justify-between items-end">
              <p className="font-semibold">
                ₹{item.book.price * item.qty}
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeFromCart(item.book._id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Total</h2>
            <h2 className="text-xl font-bold">₹{total}</h2>
          </div>

          <Button
            className="mt-4 w-full text-lg"
            onClick={checkoutHandler}
          >
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
