'use client';

import { useRouter } from "next/navigation";
import styles from './NewsA.module.css';
import Image from "next/image";
import Link from "next/link";

export default function News() {
  const router = useRouter();

  return (
    <div id="News" className={styles.card}>
      <Image
        src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758116540/zannya/uploads/images/uud03p5xtfl6y3vuyi8x.jpg"
        alt="News Preview"
        width={400}
        height={250}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h3 className={styles.headings}>Articles</h3>
        <p>
          Stay informed with Zannya Africa Foundation articles in-depth stories and updates from our programs and projects.
        </p>
        <Link href="/Newsp" className={styles.arrowButton}>Read More</Link>
      </div>
    </div>
  );
}