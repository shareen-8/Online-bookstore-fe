// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/context/AuthContext";
// import { useCart } from "@/context/CartContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { cart } = useCart();
//   const navigate = useNavigate();

//   const logoutHandler = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="border-b px-6 py-3 flex justify-between items-center">
//       {/* LEFT */}
//       <Link to="/" className="text-xl font-bold">
//         📚 BookStore
//       </Link>

//       {/* RIGHT */}
//       <div className="flex items-center gap-4">
//         {!user && (
//           <>
//             <Link to="/login">
//               <Button variant="ghost">Login</Button>
//             </Link>
//             <Link to="/register">
//               <Button>Register</Button>
//             </Link>
//           </>
//         )}

//         {user && (
//           <>
//             <span className="text-sm">
//               Hi, <b>{user.name}</b>
//               {user.role === "admin" && (
//                 <span className="ml-1 text-xs text-red-500">(Admin)</span>
//               )}
//             </span>

//             {user.role !== "admin" && (
//               <Link to="/cart">
//                 <Button variant="outline">
//                   Cart ({cart.length})
//                 </Button>
//               </Link>
//             )}
            
//             <Link to="/orders">
//               <Button variant="ghost">Orders</Button>
//             </Link>
            
            
//             {user.role === "admin" && (
//               <Link to="/admin">
//                 <Button variant="ghost">Admin</Button>
//               </Link>
//             )}

//             <Button variant="destructive" onClick={logoutHandler}>
//               Logout
//             </Button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b px-6 py-3 flex justify-between items-center">
      {/* LEFT */}
      <Link to="/" className="text-xl font-bold">
        📚 BookStore
      </Link>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {!user && (
          <>
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="text-sm">
              Hi, <b>{user.name}</b>
              {user.role === "admin" && (
                <span className="ml-1 text-xs text-red-500">(Admin)</span>
              )}
            </span>

            {/* CUSTOMER NAVIGATION */}
            {user.role !== "admin" && (
              <>
                <Link to="/cart">
                  <Button variant="outline">
                    Cart ({cart.length})
                  </Button>
                </Link>

                <Link to="/orders">
                  <Button variant="ghost">Orders</Button>
                </Link>
              </>
            )}

            {/* ADMIN NAVIGATION */}
            {user.role === "admin" && (
              <>
                <Link to="/admin/orders">
                  <Button variant="ghost">Orders</Button>
                </Link>

                <Link to="/admin">
                  <Button variant="ghost">Add Book</Button>
                </Link>
              </>
            )}

            <Button variant="destructive" onClick={logoutHandler}>
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
