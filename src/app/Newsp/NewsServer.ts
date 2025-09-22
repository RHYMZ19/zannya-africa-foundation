// app/Newsp/NewsServer.ts
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { NewsItem } from "./types";

export async function getNews(): Promise<NewsItem[]> {
  const q = query(collection(db, "newsUpdates"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      timestamp: data.timestamp instanceof Timestamp ? data.timestamp.toDate().toISOString() : null
    } as NewsItem;
  });
}