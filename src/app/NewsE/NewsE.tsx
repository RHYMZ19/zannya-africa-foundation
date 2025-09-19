'use client';

import { useRouter } from "next/navigation";
import styles from './NewsE.module.css';
import Image from "next/image";
import Link from "next/link";

export default function News() {
  const router = useRouter();

  return (
    <div id="News" className={styles.card}>
      <Image
        src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758116595/zannya/uploads/images/axir1bwh1sqtswm0afi8.jpg"
        alt="News Preview"
        width={400}
        height={250}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h3 className={styles.headings}>Events</h3>
        <p>
          Discover upcoming events at Zannya Africa Foundation  from workshops and programs to community gatherings.
        </p>
        <Link href="/Newsp" className={styles.arrowButton}>Read More</Link>
      </div>
    </div>
  );
}