'use client';

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import Image from "next/image";
import styles from "./WeeklyPage.module.css";
import Link from "next/link";

// Type for newsletter items
type NewsletterItem = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  by?: string; // new field
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
      description: d.data().description || "",
      by: d.data().by || "", // include 'by'
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

   <div className={styles.cardsGrid}> {/* new grid wrapper */}
    {items.map((item) => (
      <div key={item.id} className={styles.card}>
        {item.image && (
          <Link href={`/newsletter/${item.id}`}>
          <Image
            src={item.image}
            alt="Newsletter Banner"
            width={600}
            height={300}
            className={styles.banner}
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
          </Link>
        )}

        <h2 className={styles.cardTitle}>{item.title}</h2>
        <p className={styles.cardSubtitle}>{item.subtitle}</p>
        <Link href={`/newsletter/${item.id}`}>
        <p className={styles.cardDescription}>
          {item.description && item.description.length > 150
            ? `${item.description.substring(0, 150)}... `
            : item.description}
  
          {item.description && item.description.length > 150 && (
            <Link href={`/newsletter/${item.id}`} className={styles.more}>
              more
            </Link>
          )}
        </p>
        </Link>
        {item.by && <p className={styles.by}><em>By: {item.by}</em></p>}
        {item.timestamp && (
          <p className={styles.date}>
            {item.timestamp.toDate().toLocaleDateString()}
          </p>
        )}

        <hr />
      </div>
     ))}
    </div>
   </div>

  );
}