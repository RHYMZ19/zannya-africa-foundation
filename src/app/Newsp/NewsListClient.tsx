'use client';

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import NewsItemClient from "./NewsItemClient";
import { NewsItem } from "./NewsList";
import styles from './Newsp.module.css';

interface NewsListClientProps {
  initialNews: NewsItem[];
}

export default function NewsListClient({ initialNews }: NewsListClientProps) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);

  useEffect(() => {
    const q = query(collection(db, "newsUpdates"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : new Date().toISOString(),
        } as NewsItem;
      });

      setNews(items);
    });

    return () => unsubscribe();
  }, []);

  if (news.length === 0) return <p className={styles.nonews}>No news available.</p>;

  return (
    <div className={styles.newslistcontainer}>
      {news.map(item => (
        <NewsItemClient key={item.id} newsItem={item} />
      ))}
    </div>
  );
}