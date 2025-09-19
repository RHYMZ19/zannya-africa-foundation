'use client';


import styles from './Mission.module.css';
import Image from "next/image";
import Link from "next/link";

export default function Mission() {
  

  return (
    <div id="Mission" className={styles.card}>
      <Image 
        src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757063282/zannya/uploads/pryfzrizykeqtm06dmxv.jpg"
        alt="Mission Preview"
        width={400}
        height={250}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h3 className={styles.headings}>Mission & Vision</h3>
        <p>
          <h2>Mission</h2>
          To use sports as a tool for community development, empowerment, and sustainability.
        </p>
        <Link href="/Missions" className={styles.arrowButton}>Read More</Link>
      </div>
    </div>
  );
}