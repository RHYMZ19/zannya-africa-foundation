'use client';


import styles from './Donate.module.css';
import Image from "next/image";
import Link from "next/link";

export default function Donate() {
  
  return (
    <div id="Donate" className={styles.card}>
      <Image
        src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757063547/zannya/uploads/vrk7v7d0qvd1yw51oeig.jpg"
        alt="Donate Preview"
        width={400}
        height={250}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h3 className={styles.headings}>Support Us</h3>
        <p>
          Together, we can transform lives. By donating today, you become part of a movement that uplifts communities...
        </p>
        <Link href="/Donates" className={styles.arrowButton}>Read More</Link>
      </div>
    </div>
  );
}