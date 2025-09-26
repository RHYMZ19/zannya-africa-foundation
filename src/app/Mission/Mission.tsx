
import styles from './Mission.module.css';
import Image from "next/image";
import Link from "next/link";

export default function Mission() {
  

  return (
    <div id="Mission" className={styles.card}>
      <Image 
        src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758898992/zannya/uploads/images/ewyusj7vqk02myl0yksa.jpg"
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
        <p>
        <h2>Vision</h2>
          To change lives and build stronger and healthier communities.
        </p>
        <Link href="/Missions" className={styles.arrowButton}>Read More</Link>
      </div>
    </div>
  );
}