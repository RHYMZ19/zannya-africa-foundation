'use client';


import styles from './Donate1.module.css';
import Image from "next/image";

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
        <p>Increased awareness on HIV prevention, 90% increase in reproductive health knowledge among 1,000 youth in Bwaise, Ndeeba, Kajjansi and rural outreaches in katakwi and Buyende .</p>
      </div>
    </div>
  );
}