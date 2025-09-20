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
  const [news, setNews] = useState<NewsItem[]>([]);
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

      setNews(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (news.length === 0) return <p className={styles.nonews}>No news available.</p>;

  return (
    <div className={styles.newslistcontainer}>
      {news.map(({ id, title, type, description, images, video, timestamp }) => (
        <div key={id} className={styles.card}>
          {images && images.length > 0 && (
            <Image
              src={images[0]}
              alt={title}
              width={400}
              height={220}
              className={styles.cardImage}
              style={{ cursor: 'pointer' }}
            />
          )}

          <div className={styles.cardContent}>
            <span className={styles.newstype}>{type}</span>
            <h3 className={styles.headings}>{title}</h3>
            <p>{description}</p>

            {video && (
              <video controls className={styles.newsvideo}>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            <small className={styles.newsdate}>
              {timestamp ? timestamp.toDate().toLocaleDateString() : "Just uploaded"}
            </small>

            <Link href={`/Newsp/${id}`} className={styles.arrowButton}>
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}