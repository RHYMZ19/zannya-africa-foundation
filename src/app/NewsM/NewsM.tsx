'use client';


import styles from './NewsM.module.css';
import Image from "next/image";
import Link from "next/link";

export default function News() {
  
  return (
    <div id="News" className={styles.card}>
      <Image
        src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758116555/zannya/uploads/images/yn2i3fknxn7cxmiiwj2n.jpg"
        alt="News Preview"
        width={400}
        height={250}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h3 className={styles.headings}>Media</h3>
        <p>
          Explore Zannya Africa Foundation in the media  watch videos, view photos, and see our impact in action.
        </p>
        <Link href="/Newsp" className={styles.arrowButton}>Read More</Link>
      </div>
    </div>
  );
}