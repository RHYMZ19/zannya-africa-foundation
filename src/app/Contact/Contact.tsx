'use client';

import { useRouter } from "next/navigation";
import styles from './Contact.module.css';
import Image from "next/image";

export default function Contact() {
  const router = useRouter();

  return (
    <div id="Contact" className={styles.card}>
      <Image
        src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757057933/zannya/uploads/x7wbc9fihssmebwha84c.jpg"
        alt="Contact Preview"
        width={400}
        height={250}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h3 className={styles.headings}>Contact Us</h3>
        <p>
          Contact us today to learn more about our programs, activities, and how you can be part of creating lasting change.
        </p>
        <button 
          onClick={() => router.push('/Contacts')} 
          className={styles.arrowButton}
        >
          Read More
        </button>
      </div>
    </div>
  );
}