import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export type MyEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
};

export async function fetchEvents(): Promise<MyEvent[]> {
  const snapshot = await getDocs(collection(db, "events"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as MyEvent[];
}