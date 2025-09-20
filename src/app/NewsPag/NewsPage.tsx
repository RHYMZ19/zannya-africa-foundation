'use client';

import { useEffect, useState } from "react";
import { collection, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import db from "../lib/firebase";
import NewsList, { NewsItem } from "../NewsC/NewsC"; // your NewsList component

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to real-time updates
    const unsubscribe = onSnapshot(
      collection(db, "newsUpdates"),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const items: NewsItem[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "",
            type: data.type || "",
            description: data.description || "",
            images: data.images || [],
            video: data.video || "",
            timestamp: data.timestamp || null, // keep null if not yet set
          };
        });

        // Sort by timestamp if exists, else newest first
        const sorted = [...items].sort((a, b) => {
          const aTime = a.timestamp?.toMillis() || 0;
          const bTime = b.timestamp?.toMillis() || 0;
          return bTime - aTime;
        });

        setNews(sorted);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return <NewsList news={news} loading={loading} />;
}
