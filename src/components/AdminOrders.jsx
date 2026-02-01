import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllOrders, updateOrderStatus } from "@/services/orderService";
import { API_BASE_URL } from "@/services/api";

const getImageUrl = (img) => {
  if (!img) return "/placeholder.png";
  if (img.startsWith("http")) return img;
  return `${API_BASE_URL}${img}`;
};

const statusColor = {
  pending: "secondary",
  shipped: "outline",
  delivered: "default",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getAllOrders();
    console.log(data);
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changeStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    fetchOrders();
  };

  // ⏳ Loading
  if (loading) {
    return <p className="text-muted-foreground">Loading orders...</p>;
  }

  // 📭 Empty state
  if (orders.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg bg-muted">
        <p className="text-lg font-semibold">📭 No orders yet</p>
        <p className="text-sm text-muted-foreground">
          Orders will appear here once customers place them.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">📦 Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="border rounded-xl p-6 shadow-sm">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono text-sm">{order._id}</p>
              <p className="text-sm mt-1">
                <b>User:</b> {order.userId?.email}
              </p>
            </div>

            <Badge variant={statusColor[order.status]}>
              {order.status.toUpperCase()}
            </Badge>
          </div>

          {/* ITEMS */}
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item._id} className="flex gap-4 border rounded-lg p-4">
                <img
                  src={getImageUrl(item.bookId.images?.[0])}
                  alt={item.bookId.title}
                  className="h-24 w-16 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-semibold">{item.bookId.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.bookId.description}
                  </p>
                  <p className="text-sm mt-1">Qty: {item.quantity}</p>
                </div>

                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="font-bold">Total: ₹{order.totalAmount}</p>

            <div className="flex gap-2">
              {["pending", "shipped", "delivered"].map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={order.status === s ? "default" : "outline"}
                  onClick={() => changeStatus(order._id, s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
