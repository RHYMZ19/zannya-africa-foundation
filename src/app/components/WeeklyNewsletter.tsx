// src/components/WeeklyNewsletter.tsx
import React from "react";
import styles from "./WeeklyNewsletter.module.css";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, limit, query, } from "firebase/firestore";
import Image from "next/image";

type NewsletterItem = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  timestamp?: string;
};

export default async function WeeklyNewsletter() {
  // Fetch latest 4 newsletters at build/render time
  const q = query(
    collection(db, "weeklyNewsletter"),
    orderBy("timestamp", "desc"),
    limit(4)
  );

  const snap = await getDocs(q);

  const newsletters: NewsletterItem[] = snap.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "No Title",         // required
      subtitle: data.subtitle || "",
      image: data.image || "",
      timestamp: data.timestamp || null,
    };
  });

  return (
    <div className={styles.newsletterWrapper}>
      <div className={styles.simpleNewsletterList}>
        {newsletters.length === 0 && <p>No newsletters yet.</p>}

        {newsletters.map(item => (
          <div key={item.id} className={styles.newsItemCard}>
            {item.image && <Image src={item.image} className={styles.newsImg} alt="Newsletter" />}
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
            <p style={{ opacity: 0.7 }}>
              {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : ""}
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