'use client';

import { useEffect, useState } from "react";
import { collection, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import db from "../lib/firebase"; // make sure this matches your export
import NewsList, { NewsItem } from "../NewsC/NewsC";

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "newsUpdates"),
      (snapshot: QuerySnapshot<DocumentData>) => {
        if (!snapshot.empty) {
          const items: NewsItem[] = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || "",
              type: data.type || "",
              description: data.description || "",
              images: data.images || [],
              video: data.video || "",
              timestamp: data.timestamp || null, // null if serverTimestamp not yet available
            };
          });

          // Sort by timestamp (newest first) or fallback to Firestore order
          const sorted = [...items].sort((a, b) => {
            const aTime = a.timestamp?.toMillis() || 0;
            const bTime = b.timestamp?.toMillis() || 0;
            return bTime - aTime;
          });

          setNews(sorted);
        } else {
          setNews([]);
        }

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