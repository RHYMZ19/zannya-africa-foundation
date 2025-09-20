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
        <p>Mentorship program at White Angels Primary  School. </p>
        <p>
          Zannya Africa Foundation in collaboration with Futsal Association Uganda encouraging Education through sports and recreation activities.
        </p>
        <p>For more of our News, Click in the link below </p>
        <Link href="/Newsp" className={styles.arrowButton}>Read More</Link>
      </div>
    </div>
  );
}