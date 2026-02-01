

import { useEffect, useState } from "react";
import api, { API_BASE_URL } from "@/services/api";
import { Badge } from "@/components/ui/badge";

const getImageUrl = (img) => {
  if (!img) return "/placeholder.png";
  if (img.startsWith("http")) return img;
  return `${API_BASE_URL}${img}`;
};

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">📦 My Orders</h1>

      {orders.length === 0 && (
        <p className="text-muted-foreground">
          You haven’t placed any orders yet.
        </p>
      )}

      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-mono">{order._id}</p>
              <Badge>{order.status.toUpperCase()}</Badge>
            </div>

            <div className="space-y-4">
              {order.items.map(item => (
                <div key={item._id} className="flex gap-4 border p-4 rounded-lg">
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
                    <p className="text-sm mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{item.quantity * item.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4 border-t pt-4">
              <span className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span className="font-bold">
                Total: ₹{order.totalAmount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
