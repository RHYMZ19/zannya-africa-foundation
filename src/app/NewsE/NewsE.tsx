'use client';


import styles from './NewsE.module.css';
import Image from "next/image";
import Link from "next/link";

export default function News() {
  

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
        
        <p>Get ready to elevate your wellness!!</p>
         <p>Coming soon: the ZAF EcoFit Camp – a transformative experience to reconnect your body and mind. Stay tuned for a journey towards holistic health and inner balance. </p>
         <p>For more of our events click below in our Link.</p>
        <Link href="/Newsp" className={styles.arrowButton}>Read More</Link>
      </div>
    </div>
  );
}