'use client';

import React, { useState, useEffect } from "react";
import styles from "./WeeklyNewsletter.module.css";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, limit, query } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

type NewsletterItem = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  timestamp?: string | null; // Only string or null now
};

export default function WeeklyNewsletter() {
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsletters = async () => {
      const q = query(
        collection(db, "weeklyNewsletter"),
        orderBy("timestamp", "desc"),
        limit(4)
      );
      const snap = await getDocs(q);

      const data: NewsletterItem[] = snap.docs.map(doc => {
        const docData = doc.data();
        let tsString: string | null = null;
        if (docData.timestamp) {
          // Convert Firestore Timestamp to string
          tsString = "toDate" in docData.timestamp
            ? docData.timestamp.toDate().toISOString()
            : new Date(docData.timestamp).toISOString();
        }

        return {
          id: doc.id,
          title: docData.title || "No Title",
          subtitle: docData.subtitle || "",
          image: docData.image || "",
          timestamp: tsString,
        };
      });

      setNewsletters(data);
      setLoading(false);
    };

    fetchNewsletters();
  }, []);

  const formatDate = (ts?: string | null) => {
    if (!ts) return "";
    return new Date(ts).toLocaleDateString();
  };

  if (loading) return <p>Loading newsletters...</p>;

  return (
    <div className={styles.newsletterWrapper}>
      <div className={styles.simpleNewsletterList}>
        {newsletters.length === 0 && <p>No newsletters yet.</p>}

        {newsletters.map(item => (
  <div key={item.id} className={styles.newsItemCard}>
    <Link href={`/newsletter/${item.id}`}>
    {item.image && (
      <Image
        src={item.image}
        className={styles.newsImg}
        alt={item.title}
        width={400}
        height={200}
      />
    )}
    </Link>
    <Link href={`/newsletter/${item.id}`}>
    <h3>{item.title}</h3>
    </Link>

    <p className={styles.subtitle}>
      {item.subtitle && item.subtitle.length > 50
        ? `${item.subtitle.substring(0, 50)}... `
        : item.subtitle}

      {/* show "more" if subtitle is trimmed */}
      {item.subtitle && item.subtitle.length > 50 && (
        <a href={`/newsletter/${item.id}`} className={styles.more}>
          more
        </a>
      )}
    </p>

    <p style={{ opacity: 0.7 }}>
      {formatDate(item.timestamp)}
    </p>
  </div>
))}
      </div>

      <a href="/weekly-newsletter" className={styles.viewAllBtn}>
        View All Newsletters →
      </a>

      <form className={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Subscribe
        </button>
      </form>
    </div>
  );
}