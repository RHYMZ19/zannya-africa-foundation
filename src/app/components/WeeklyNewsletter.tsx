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
  by?: string;    
  image?: string;
  timestamp?: string | null;
};

export default function WeeklyNewsletter() {
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

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
          tsString = "toDate" in docData.timestamp
            ? docData.timestamp.toDate().toISOString()
            : new Date(docData.timestamp).toISOString();
        }
        return {
          id: doc.id,
          title: docData.title || "No Title",
          subtitle: docData.subtitle || "",
          image: docData.image || "",
          by: docData.by || "",  
          timestamp: tsString,
        };
      });

      setNewsletters(data);
      setLoading(false);
    };

    fetchNewsletters();
  }, []);

  const formatDate = (ts?: string | null) => ts ? new Date(ts).toLocaleDateString() : "";

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.querySelector("input[type='email']") as HTMLInputElement;
    const email = emailInput.value;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMsg(data.success ? data.message : data.error);
      if (data.success) form.reset();
    } catch (err) {
      console.error(err);
      setMsg("Subscription failed. Please try again.");
    }
  };

  if (loading) return <p>Loading newsletters...</p>;

  return (
    <div className={styles.newsletterWrapper}>
      <div className={styles.simpleNewsletterList}>
        {newsletters.length === 0 && <p>No newsletters yet.</p>}
        {newsletters.map(item => (
          <div key={item.id} className={styles.newsItemCard}>
            <Link href={`/newsletter/${item.id}`}>
              {item.image && <Image src={item.image} className={styles.newsImg} alt={item.title} width={400} height={200} />}
            </Link>
            {item.by && <p className={styles.by}><em>By: {item.by}</em></p>}
            <Link href={`/newsletter/${item.id}`}><h3><strong>{item.title}</strong></h3></Link>
            <p className={styles.subtitle}>
              {item.subtitle && item.subtitle.length > 70
                ? `${item.subtitle.substring(0, 70)}... `
                : item.subtitle}
              {item.subtitle && item.subtitle.length > 70 && <a href={`/newsletter/${item.id}`} className={styles.more}>more</a>}
            </p>
            <p style={{ opacity: '0.7', fontSize: '14px', marginTop: '10px' }}>{formatDate(item.timestamp)}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <a href="/weekly-newsletter" className={styles.viewAllBtn}>View All Newsletters →</a>

        <form className={styles.form} style={{ marginTop: "15px" }} onSubmit={handleSubscribe}>
          <input type="email" placeholder="Enter your email" className={styles.input} required />
          <button type="submit" className={styles.button}>Subscribe</button>
        </form>

        {msg && <p className={styles.success} style={{ color: 'green', marginTop: '10px' }}>{msg}</p>}
      </div>

      <Link href="/shop" className={styles.ctaButton}>Visit Shop</Link>
    </div>
  );
}
