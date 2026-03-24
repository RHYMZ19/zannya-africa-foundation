'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../lib/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import Image from "next/image";
import styles from "./NewsletterDetail.module.css";
import ContactUs from "@/app/ContactUs/page";
import { FaFacebook, FaHome, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import IncreaseImages from "@/app/components/IncreaseImages";
import Link from "next/link";
import router from "next/router";
import Linkify from "linkify-react";

type NewsletterItem = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  by?: string;
  image?: string;
  timestamp?: Timestamp | null;
};

export default function NewsletterDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [item, setItem] = useState<NewsletterItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchNewsletter = async () => {
      const docRef = doc(db, "weeklyNewsletter", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data() as Omit<NewsletterItem, "id">;
        setItem({ id: docSnap.id, ...docData });
      } else {
        setItem(null);
      }

      setLoading(false);
    };

    fetchNewsletter();
  }, [id]);

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (!item) return <div className={styles.loader}>Newsletter not found.</div>;

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

      {/* HERO IMAGE */}
      {item.image && (
        <div className={styles.hero}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className={styles.heroImage}
          />
          <div className={styles.overlay} />
        </div>
      )}

      {/* CONTENT */}
      <div className={styles.contentWrapper}>

        <p className={styles.date}>
          {item.timestamp?.toDate().toLocaleDateString()}
        </p>

        <h1 className={styles.title}>{item.title}</h1>

        {item.by && <p className={styles.by}>By {item.by}</p>}

        {/* SUBTITLE */}
        <p className={styles.subtitle}>
          <Linkify options={{ target: "_blank" }}>
            {item.subtitle}
          </Linkify>
        </p>

        {/* DESCRIPTION */}
        <div className={styles.description}>
          <Linkify options={{ target: "_blank" }}>
            {item.description}
          </Linkify>
        </div>

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