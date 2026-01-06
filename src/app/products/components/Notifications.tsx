import { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { AuthContext } from "../context/AuthContext";
import { AppNotification } from "../types/Notification";

const Notifications: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid)
    );

    getDocs(q).then((snap) =>
      setNotifications(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as AppNotification),
        }))
      )
    );
  }, [user]);

  const markRead = async (id: string) => {
    await updateDoc(doc(db, "notifications", id), { read: true });
  };

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.map((n) => (
        <div
          key={n.id}
          style={{
            background: n.read ? "#eee" : "#dff0ff",
            padding: 10,
            marginBottom: 5,
          }}
          onClick={() => markRead(n.id!)}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
