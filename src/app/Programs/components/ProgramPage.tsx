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
    <div className={styles.page}>

      {/* HERO */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.overlay}>
          <h1>{title}</h1>
          <p>{description}</p>
          <button className={styles.cta}>{ctaText}</button>
        </div>
      </section>

      {/* PROGRAM INTRO */}
      <section className={styles.intro}>
        <h2>Empowering Communities Through Sports</h2>
        <p>
          Our programs use sports as a powerful platform to empower youth,
          support women, and create sustainable livelihood opportunities
          within communities across Africa.
        </p>
      </section>

      {/* HIGHLIGHTS */}
      <section className={styles.highlights}>
        {highlights.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon}>⚽</div>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </div>
        ))}
      </section>

      {/* IMPACT */}
      <section className={styles.impact}>
        <div className={styles.stat}>
          <h3>5,000+</h3>
          <p>Youth Reached</p>
        </div>

        <div className={styles.stat}>
          <h3>300+</h3>
          <p>Women Empowered</p>
        </div>

        <div className={styles.stat}>
          <h3>50+</h3>
          <p>Community Programs</p>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className={styles.ctaSection}>
        <h2>Join Us in Transforming Lives</h2>
        <p>
          Together we can build resilient communities through sports,
          education, and sustainable development.
        </p>

        <button className={styles.bigButton}>
          Get Involved
        </button>
      </section>

    </div>
  );
}