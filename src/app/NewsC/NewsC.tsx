'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from './NewsC.module.css';
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import db from "../lib/firebase";

export type NewsItem = {
  id: string;
  title: string;
  type: string;
  description: string;
  images?: string[];
  video?: string;
  timestamp?: Timestamp | null;
};

export default function NewsList() {
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "newsUpdates"), (snapshot) => {
      const items: NewsItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<NewsItem, "id">),
      }));

      // Sort newest first
      items.sort((a, b) => {
        const aTime = a.timestamp ? a.timestamp.toMillis() : 0;
        const bTime = b.timestamp ? b.timestamp.toMillis() : 0;
        return bTime - aTime;
      });

      // ✅ Only take the latest one
      setNews(items[0] || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!news) return <p className={styles.nonews}>No news available.</p>;

  return (
    <div className={styles.newslistcontainer}>
      <div className={styles.card}>
        {news.images && news.images.length > 0 && (
          <Image
            src={news.images[0]}
            alt={news.title}
            width={400}
            height={220}
            className={styles.cardImage}
            style={{ cursor: 'pointer' }}
          />
        )}

        <div className={styles.cardContent}>
          <span className={styles.newstype}>{news.type}</span>
          <h3 className={styles.headings}>{news.title}</h3>
          <p>{news.description}</p>

          {news.video && (
            <video controls className={styles.newsvideo}>
              <source src={news.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          <small className={styles.newsdate}>
            {news.timestamp ? news.timestamp.toDate().toLocaleDateString() : "Just uploaded"}
          </small>

          <Link href={`/Newsp/${news.id}`} className={styles.arrowButton}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}