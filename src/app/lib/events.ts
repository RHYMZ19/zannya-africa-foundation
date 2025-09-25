import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export type MyEvent = {
  id: string;
  title: string;
  description: string;
  date: string;   // ISO string
  image: string;  // just first image
};

export async function fetchEvents(): Promise<MyEvent[]> {
  const snapshot = await getDocs(collection(db, "events"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();

    let dateStr = "";
    if (data.date) {
      if (typeof data.date.toDate === "function") {
        // Firestore Timestamp
        dateStr = data.date.toDate().toISOString();
      } else if (data.date.seconds) {
        // Plain object from Firestore snapshot
        dateStr = new Date(data.date.seconds * 1000).toISOString();
      } else if (typeof data.date === "string") {
        // Already a string
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
}