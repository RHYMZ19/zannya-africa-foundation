'use client';

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Image from "next/image";
import { useParams } from "next/navigation";
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

export default function NewsDetailsPage() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return;
      const ref = doc(db, "newsUpdates", id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setNewsItem({ id: snap.id, ...snap.data() } as NewsItem);
      }
    };
    fetchNews();
  }, [id]);

  if (!newsItem) return <p className={styles.loading}>Loading article...</p>;

  return (
    <div className={styles.newsdetails}>
      {newsItem.images?.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt={newsItem.title}
          className={styles.newsimage}
          width={600}
          height={400}
        />
      ))}
      <h1>{newsItem.title}</h1>
      <p>{newsItem.description}</p>
      <div className={styles.details}>
        <p>{newsItem.moreDetails}</p>
      </div>
      {newsItem.video && (
        <video controls className={styles.newsvideo}>
          <source src={newsItem.video} type="video/mp4" />
        </video>
      )}
      <p className={styles.date}>
        {newsItem.timestamp?.toDate ? newsItem.timestamp.toDate().toLocaleDateString() : ""}
      </p>
    </div>
  );
}