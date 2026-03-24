'use client';

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import Image from "next/image";
import styles from "./WeeklyPage.module.css";
import Link from "next/link";
import { FaFacebook, FaHome, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ContactUs from "../ContactUs/page";
import IncreaseImages from "../components/IncreaseImages";
import router from "next/router";

type NewsletterItem = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  by?: string;
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
      by: d.data().by || "",
      image: d.data().image || "",
      timestamp: d.data().timestamp || null,
    }));

    setItems(newsletters);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  if (loading) return <div className={styles.loader}>Loading...</div>;

  return (
    <div className={styles.container}>

      {/* NAVBAR */}
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <IncreaseImages src="/log.jpg" alt="Logo" />
          <span>Zannya Africa Foundation</span>
        </div>

        <div className={styles.navRight}>
          <FaHome onClick={() => router.push("/")} className={styles.icon} />
          <Link href="/Donates" className={styles.donateBtn}>Donate</Link>
        </div>
      </div>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.overlay}>
          <h1>Weekly Newsletter</h1>
          <p>Explore our latest updates, stories and impact.</p>
        </div>
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>

            {item.image && (
              <Link href={`/newsletter/${item.id}`}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt="Newsletter"
                    fill
                    className={styles.image}
                  />
                </div>
              </Link>
            )}

            <div className={styles.content}>
              <h2>{item.title}</h2>

              <p>
                {item.subtitle && item.subtitle.length > 120
                  ? `${item.subtitle.substring(0, 120)}...`
                  : item.subtitle}
              </p>

              <div className={styles.meta}>
                {item.by && <span>By {item.by}</span>}
                {item.timestamp && (
                  <span>{item.timestamp.toDate().toLocaleDateString()}</span>
                )}
              </div>

              <Link href={`/newsletter/${item.id}`} className={styles.readMore}>
                Read More →
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* SOCIAL */}
      <div className={styles.social}>
        <p>Follow us</p>
        <div className={styles.icons}>
          <a href="https://facebook.com/zannyaafricafoundation"><FaFacebook /></a>
          <a href="https://instagram.com/zannya_africa_foundation"><FaInstagram /></a>
          <a href="https://tiktok.com/@zannyaafricafdn"><FaTiktok /></a>
          <a href="https://x.com/zannyaafrica"><FaXTwitter /></a>
        </div>
      </div>

    </div>
  );
}