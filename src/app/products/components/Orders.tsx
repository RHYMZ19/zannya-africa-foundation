import { useEffect, useState, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { AuthContext } from "../context/AuthContext";
import { Order } from "../types/Order";

const Orders: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid)
    );

    getDocs(q).then((snap) =>
      setOrders(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Order) }))
      )
    );
  }, [user]);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((o) => (
        <div key={o.id}>
          <p>Status: {o.status}</p>
          <p>Total: ${o.total}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;