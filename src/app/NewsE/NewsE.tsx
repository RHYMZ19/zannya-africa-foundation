'use client';

import { useRouter } from "next/navigation";
import styles from './NewsE.module.css';
import Image from "next/image";

export default function News() {
  const router = useRouter();

  return (
    <div id="News" className={styles.card}>
      <Image
        src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757064668/zannya/uploads/ayx5sskfqhtpperkxwqq.jpg"
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
        <button 
          onClick={() => router.push('/Newsp')} 
          className={styles.arrowButton}
        >
          Read More
        </button>
      </div>
    </div>
  );
}