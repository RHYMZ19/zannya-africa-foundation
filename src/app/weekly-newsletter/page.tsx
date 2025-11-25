'use client';

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import Image from "next/image";
import styles from "./WeeklyPage.module.css";

// Type for newsletter items
type NewsletterItem = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  timestamp?: Timestamp | null;
};

export default function WeeklyNewsletterPage() {
  const [items, setItems] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNewsletters = async () => {
    const q = query(
      collection(db, "weeklyNewsletter"),
      orderBy("timestamp", "desc")
    );

    const snap = await getDocs(q);

    const newsletters: NewsletterItem[] = snap.docs.map(d => ({
      id: d.id,
      title: d.data().title || "No Title",
      subtitle: d.data().subtitle || "",
      image: d.data().image || "",
      timestamp: d.data().timestamp || null,
    }));

    setItems(newsletters);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Weekly Newsletter</h1>

      {items.length === 0 && <p>No newsletters posted yet.</p>}

      {items.map((item) => (
        <div key={item.id} className={styles.card}>
          {item.image && (
            <Image
              src={item.image}
              alt="Newsletter Banner"
              width={600}
              height={300}
              className={styles.banner}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          )}

          <h2 className={styles.cardTitle}>{item.title}</h2>
          <p className={styles.cardSubtitle}>{item.subtitle}</p>

          {item.timestamp && (
            <p className={styles.date}>
              {item.timestamp.toDate().toLocaleDateString()}
            </p>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}