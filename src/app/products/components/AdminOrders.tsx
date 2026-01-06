import { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Order } from "../types/Order";
import { AuthContext } from "../context/AuthContext";
import { addDoc } from "firebase/firestore";

const AdminOrders: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user?.role !== "admin") return;

    getDocs(collection(db, "orders")).then((snap) => {
      setOrders(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Order),
        }))
      );
    });
  }, [user]);

  const updateStatus = async (
  orderId: string,
  status: Order["status"],
  userId: string
 ) => {
  await updateDoc(doc(db, "orders", orderId), { status });

  await addDoc(collection(db, "notifications"), {
    userId,
    message: `Your order is now ${status}`,
    read: false,
    createdAt: Date.now(),
  });

  alert("Order updated & user notified");
 };

  if (user?.role !== "admin") return null;

  return (
    <div>
      <h2>Admin Order Dashboard</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <p><b>User:</b> {order.userId}</p>
          <p><b>Total:</b> ${order.total}</p>
          <p><b>Status:</b> {order.status}</p>

          <select
            value={order.status}
            onChange={(e) =>updateStatus(order.id!,e.target.value as Order["status"],order.userId)}
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;