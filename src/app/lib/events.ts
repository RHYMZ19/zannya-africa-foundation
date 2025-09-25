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

    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      // Convert Firestore Timestamp to ISO string
      date: data.date?.toDate().toISOString() || "",
      // Pick first image from the array
      image: Array.isArray(data.images) && data.images.length > 0 ? data.images[0] : "",
    } as MyEvent;
  });
}