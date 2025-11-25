'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../lib/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import Image from "next/image";
import styles from "./NewsletterDetail.module.css";

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

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Newsletter not found.</p>;

  return (
    <div className={styles.wrapper}>
  {item.timestamp && <p className={styles.date}>{item.timestamp.toDate().toLocaleDateString()}</p>}

  <h1 className={styles.title}>{item.title}</h1>

  {item.by && <p className={styles.by}>By {item.by}</p>}

  <div className={styles.topRow}>
    {item.image && (
      <div className={styles.imageBox}>
        <Image
          src={item.image}
          width={400}
          height={300}
          alt={item.title}
          className={styles.image}
        />
      </div>
    )}

    <div className={styles.subtitleBox}>
      <p className={styles.subtitle}>{item.subtitle}</p>
    </div>
  </div>

  <p className={styles.description}>{item.description}</p>
</div>
  );
}