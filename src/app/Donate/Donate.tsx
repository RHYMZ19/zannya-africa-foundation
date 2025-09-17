'use client';

import { useRouter } from "next/navigation";
import styles from './Donate.module.css';
import Image from "next/image";

export default function Donate() {
  const router = useRouter();

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
        <button 
          onClick={() => router.push('/Donates')} 
          className={styles.arrowButton}
        >
          Read More
        </button>
      </div>
    </div>
  );
}