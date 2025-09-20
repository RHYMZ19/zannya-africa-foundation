'use client';

import { useEffect, useState } from "react";
import { collection, onSnapshot, DocumentData, QuerySnapshot } from "firebase/firestore";
import { db } from "../lib/firebase"; // ensure named export matches
import NewsList, { NewsItem } from "../NewsC/NewsC";

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "newsUpdates"),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const items: NewsItem[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<NewsItem, "id">),
        }));

        // Sort newest first, handle null timestamps
        items.sort((a, b) => {
          const aTime = a.timestamp ? a.timestamp.toMillis() : 0;
          const bTime = b.timestamp ? b.timestamp.toMillis() : 0;
          return bTime - aTime;
        });

        setNews(items);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return <NewsList news={news} loading={loading} />;
}