'use client';


import styles from './News.module.css';
import Image from "next/image";
import Link from "next/link";

export default function News() {
  

  return (
    <div id="News" className={styles.card}>
      <Image
        src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758116572/zannya/uploads/images/au4ofyrzeimna2haoznw.jpg"
        alt="News Preview"
        width={400}
        height={250}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h3 className={styles.headings}>News</h3>
        <p>
          Stay updated with the latest news from Zannya Africa Foundation  see whats happening in our community and beyond.
        </p>
        <Link href="/Newsp" className={styles.arrowButton}>Read More</Link>
      </div>
    </div>
  );
}