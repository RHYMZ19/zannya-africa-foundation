'use client';

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../lib/firebase";
import NewsList, { NewsItem } from "../NewsC/NewsC"; // your NewsList component

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "newsUpdates"), snapshot => {
      const items: NewsItem[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<NewsItem, "id">),
      }));
      setNews(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <NewsList news={news} loading={loading} />;
}