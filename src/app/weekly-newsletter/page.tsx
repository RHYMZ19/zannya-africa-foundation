'use client';

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import styles from "./WeeklyPage.module.css";

export default function WeeklyNewsletterPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNewsletters = async () => {
    const q = query(
      collection(db, "weeklyNewsletter"),
      orderBy("timestamp", "desc")
    );

    const snap = await getDocs(q);

    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
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
            <img src={item.image} className={styles.banner} alt="Newsletter" />
          )}

          <h2 className={styles.cardTitle}>{item.title}</h2>
          <p className={styles.cardSubtitle}>{item.subtitle}</p>

          <p className={styles.date}>
            {item.timestamp?.toDate().toLocaleDateString()}
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
}