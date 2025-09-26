'use client';


import styles from './Donate2.module.css';
import Image from "next/image";
import Link from "next/link";

export default function Donate() {
  
  return (
    <div id="Donate" className={styles.card}>
      <Image
        src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757063330/zannya/uploads/f6ek2nwd2zswpwpvy3qf.jpg"
        alt="Donate Preview"
        width={400}
        height={250}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h3 className={styles.headings}>Support Us</h3>
        <p> Reduction in youth crime rates through engagement in structured sports programs.Over 500 young people & women engaged in sports programs across 10 communities in Bwaise, ndeeba , kajjansi and rural outreaches.</p>
       
        
        
      </div>
    </div>
  );
}