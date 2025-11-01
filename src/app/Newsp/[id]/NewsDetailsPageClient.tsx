'use client';

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Image from "next/image";
import styles from "../Newsp.module.css";

interface NewsItem {
  id: string;
  title: string;
  description?: string;
  moreDetails?: string;
  images?: string[];
  video?: string;
  timestamp?: { toDate: () => Date };
}

interface Props {
  id: string;
}

export default function NewsDetailsPageClient({ id }: Props) {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const ref = doc(db, "newsUpdates", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setNewsItem({ id: snap.id, ...snap.data() } as NewsItem);
        } else {
          console.warn("Document not found:", id);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id]);

  if (!newsItem)
    return <p className={styles.loading}>Loading article...</p>;

  return (
    <div className={styles.newsdetails}>
      {newsItem.images?.length ? (
        newsItem.images.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={newsItem.title}
            className={styles.newsimage}
            width={600}
            height={400}
          />
        ))
      ) : (
        <p>No image available</p>
      )}

      <h1>{newsItem.title}</h1>

      {newsItem.description && (
        <p className={styles.description}>{newsItem.description}</p>
      )}

      {newsItem.moreDetails && (
        <div className={styles.details}>
          <p>{newsItem.moreDetails}</p>
        </div>
      )}

      {newsItem.video && (
        <video controls className={styles.newsvideo}>
          <source src={newsItem.video} type="video/mp4" />
        </video>
      )}

      {newsItem.timestamp?.toDate && (
        <p className={styles.date}>
          {newsItem.timestamp.toDate().toLocaleDateString()}
        </p>
      )}
    </div>
  );
}