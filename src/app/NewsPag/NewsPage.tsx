'use client';

import { useEffect, useState } from "react";
import { collection, onSnapshot, DocumentData, QuerySnapshot } from "firebase/firestore";
import { db } from "../lib/firebase"; // make sure this is correct
import NewsList, { NewsItem } from "../NewsC/NewsC";

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Setting up Firestore listener...");

    const unsubscribe = onSnapshot(
      collection(db, "newsUpdates"),
      (snapshot: QuerySnapshot<DocumentData>) => {
        console.log("Snapshot received:", snapshot);

        if (snapshot.empty) {
          console.log("No documents found in newsUpdates collection.");
        } else {
          const items: NewsItem[] = snapshot.docs.map(doc => {
            const data = doc.data();
            console.log("Document data:", data);

            return {
              id: doc.id,
              ...(data as Omit<NewsItem, "id">),
            };
          });

          // Sort newest first, safely handle null timestamps
          items.sort((a, b) => {
            const aTime = a.timestamp ? a.timestamp.toMillis() : 0;
            const bTime = b.timestamp ? b.timestamp.toMillis() : 0;
            return bTime - aTime;
          });

          console.log("Final news array:", items);
          setNews(items);
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