// app/Newsp/NewsList.tsx
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";

export type NewsItem = {
  id: string;
  title: string;
  type: string;
  description: string;
  moreDetails?: string;
  images?: string[];
  video?: string;
  timestamp?: string;
};

// Server-side fetch
export async function fetchNews(): Promise<NewsItem[]> {
  const q = query(collection(db, "newsUpdates"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      timestamp:
        data.timestamp instanceof Timestamp ? data.timestamp.toDate().toISOString() : null,
    } as NewsItem;
  });
}
