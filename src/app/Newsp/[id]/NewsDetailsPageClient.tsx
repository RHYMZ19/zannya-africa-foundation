'use client';

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Image from "next/image";
import styles from "../Newsp.module.css";
import Link from "next/link";
import router from "next/router";
import { FaHome, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import IncreaseImages from "@/app/components/IncreaseImages";
import ContactUs from "@/app/ContactUs/page";

interface NewsItem {
  id: string;
  title: string;
  description?: string;
  moreDetails?: string;
  images?: string[];
  video?: string;
  timestamp?: { toDate: () => Date };
}

interface Props {
  id: string;
}

export default function NewsDetailsPageClient({ id }: Props) {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const ref = doc(db, "newsUpdates", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setNewsItem({ id: snap.id, ...snap.data() } as NewsItem);
        } else {
          console.warn("Document not found:", id);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id]);

  if (!newsItem)
    return <p className={styles.loading}>Loading article...</p>;

  return (
    <div className={styles.wrapper}>

      {/* HEADER ICONS + LOGO */}
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div className={styles.headerBox}>
          <div className={styles.headerRow}>
            <FaHome
              style={{ width: "30px", height: "30px" }}
              color="black"
              cursor="pointer"
              onClick={() => router.push("/")}
            />

            <Link href="/Donates" className={styles.donateBtn}>
              Donate
            </Link>

            <IncreaseImages src="/log.jpg" alt="Logo" />
          </div>

          <p className={styles.foundationText}>Zannya Africa Foundation</p>
        </div>
      </div>

      {/* DATE */}
      {newsItem.timestamp?.toDate && (
        <p className={styles.date}>
          {newsItem.timestamp.toDate().toLocaleDateString()}
        </p>
      )}

      {/* TITLE */}
      <h1 className={styles.title}>{newsItem.title}</h1>

      {/* IMAGES */}
      {newsItem.images?.length ? (
        newsItem.images.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={newsItem.title}
            className={styles.newsimage}
            width={600}
            height={400}
          />
        ))
      ) : (
        <p>No image available</p>
      )}

      {/* DESCRIPTION */}
      {newsItem.description && (
        <p className={styles.description}>{newsItem.description}</p>
      )}

      {/* MORE DETAILS */}
      {newsItem.moreDetails && (
        <div className={styles.details}>
          <p>{newsItem.moreDetails}</p>
        </div>
      )}

      {/* VIDEO */}
      {newsItem.video && (
        <video controls className={styles.newsvideo}>
          <source src={newsItem.video} type="video/mp4" />
        </video>
      )}

      {/* SOCIAL MEDIA */}
      <p className={styles.socialHeader}>
        <strong>You can follow us on our social platforms:</strong>
      </p>

      <div className={styles.socialIcons}>
        <a href="https://facebook.com/zannyaafricafoundation" target="_blank">
          <FaFacebook color="blue" />
        </a>
        <a href="https://instagram.com/zannya_africa_foundation" target="_blank">
          <FaInstagram color="pink" />
        </a>
        <a href="https://tiktok.com/@zannyaafricafdn" target="_blank">
          <FaTiktok color="black" />
        </a>
        <a href="https://x.com/zannyaafrica" target="_blank">
          <FaXTwitter color="black" />
        </a>
      </div>

      {/* EMAILS */}
      <p className={styles.emailHeader}><strong>Or you can email us for:</strong></p>

      <div className={styles.emailBox}>
        <ul>
          <li><a href="mailto: info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
          <li><a href="mailto: support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
        </ul>
      </div>

      <ContactUs />
    </div>
  );
}