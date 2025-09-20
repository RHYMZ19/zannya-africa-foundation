'use client';


import styles from './NewsA.module.css';
import Image from "next/image";
import Link from "next/link";

export default function News() {
  

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
          Early and unintended pregnancies among young adolescents is a very common vice in urban slums. 
          Young boys and girls continue to face challenges during their transition to 
          adulthood within this harsh environment,  young women are less likely to initiate 
          sex if they are in school. Parents, Government, non government organizations, 
          and the community need to sensitize these young boys and girls on sexual and 
          reproductive health in slums and encourage and support them to stay in school.
        </p>
        <p>For more of our articles, Click on the link below.</p>
        <Link href="/Newsp" className={styles.arrowButton}>Read More</Link>
      </div>
    </div>
  );
}