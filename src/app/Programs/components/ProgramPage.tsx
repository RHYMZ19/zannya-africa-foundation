'use client';

import styles from "./ProgramPage.module.css";

type Highlight = {
  title: string;
  detail: string;
};

type ProgramPageProps = {
  title: string;
  description: string;
  image: string;
  highlights: Highlight[];
  ctaText: string;
};

export default function ProgramPage({
  title,
  description,
  image,
  highlights,
  ctaText
}: ProgramPageProps) {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1>{title}</h1>
          <p>{description}</p>
          <button className={styles.cta}>{ctaText}</button>
        </div>
        <div className={styles.heroImage}>
          <img src={image} alt={title} />
        </div>
      </div>

      {/* Highlights Section */}
      <div className={styles.highlights}>
        <h2>Program Highlights</h2>
        <div className={styles.cards}>
          {highlights.map((item, index) => (
            <div key={index} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}