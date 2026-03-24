'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../lib/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import Image from "next/image";
import styles from "./NewsletterDetail.module.css";

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
    <div className={styles.page}>

      {/* NAV */}
      <div className={styles.nav}>
        <IncreaseImages src="/log.jpg" alt="Logo" />
        <div className={styles.navRight}>
          <FaHome onClick={() => router.push("/")} />
          <Link href="/Donates">Donate</Link>
        </div>
      </div>

      {/* HERO TITLE OVER IMAGE */}
      {item.image && (
        <div className={styles.hero}>
          <Image src={item.image} fill alt={item.title} className={styles.heroImg}/>
          <div className={styles.heroOverlay}>
            <h1>{item.title}</h1>
            {item.by && <p>By {item.by}</p>}
          </div>
        </div>
      )}

      {/* ARTICLE BODY */}
      <div className={styles.article}>

        <p className={styles.date}>
          {item.timestamp?.toDate().toLocaleDateString()}
        </p>

        {/* SUBTITLE */}
        <p className={styles.subtitle}>
          <Linkify options={{ target: "_blank" }}>
            {item.subtitle}
          </Linkify>
        </p>

        {/* INLINE IMAGE (INSIDE TEXT FLOW) */}
        {item.image && (
          <div className={styles.inlineImage}>
            <Image src={item.image} width={900} height={500} alt={item.title}/>
          </div>
        )}

        {/* DESCRIPTION */}
        <div className={styles.text}>
          <Linkify options={{ target: "_blank" }}>
            {item.description}
          </Linkify>
        </div>

      </div>

      {/* SOCIAL */}
      <div className={styles.social}>
        <FaFacebook />
        <FaInstagram />
        <FaTiktok />
        <FaXTwitter />
      </div>

    </div>
  );
}