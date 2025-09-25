import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import { MyEvent } from "./events";

export function useEvents() {
  const [events, setEvents] = useState<MyEvent[]>([]);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newEvents: MyEvent[] = snapshot.docs.map((doc) => {
        const data = doc.data();

        let dateStr = "";
        if (data.date) {
          if (typeof data.date.toDate === "function") {
            dateStr = data.date.toDate().toISOString();
          } else if (data.date.seconds) {
            dateStr = new Date(data.date.seconds * 1000).toISOString();
          } else if (typeof data.date === "string") {
            dateStr = data.date;
          }
        }

        return {
          id: doc.id,
          title: data.title || "",
          description: data.description || "",
          date: dateStr,
          image: Array.isArray(data.images) && data.images.length > 0 ? data.images[0] : "",
        } as MyEvent;
      });

      setEvents(newEvents);
    });

    return () => unsubscribe();
  }, []);

  return events;
}