"use client";
import { useState } from "react";
import styles from "./main.module.css";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>Organization</div>

        <div
          className={`${styles.navLinks} ${
            open ? styles.active : ""
          }`}
        >
          <a href="#who">Who We Are</a>
          <a href="#programs">Programs</a>
          <a href="#impact">Impact</a>
          <a href="#stories">Stories</a>
          <a href="#contact">Contact</a>
          <button className={styles.btnPrimary}>Donate</button>
        </div>

        <div
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
        >
          ☰
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Transforming Communities for a Better Tomorrow</h1>
          <p>
            We empower lives through sustainable development, education,
            innovation, and community-driven initiatives.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.btnPrimary}>
              Donate Now
            </button>
            <button className={styles.btnOutline}>
              Get Involved
            </button>
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section id="who" className={styles.section}>
        <h2>Who We Are</h2>
        <p>
          We are a mission-driven organization committed to creating lasting
          impact through education, empowerment, and community support.
        </p>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section
        id="programs"
        className={`${styles.section} ${styles.gray}`}
      >
        <h2>Our Programs</h2>
        <div className={styles.grid3}>
          <div className={styles.card}>
            <h3>Education</h3>
            <p>Providing scholarships and learning resources.</p>
          </div>
          <div className={styles.card}>
            <h3>Health</h3>
            <p>Improving access to healthcare services.</p>
          </div>
          <div className={styles.card}>
            <h3>Youth Empowerment</h3>
            <p>Equipping young people with skills for success.</p>
          </div>
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section id="impact" className={styles.section}>
        <h2>Our Impact</h2>
        <div className={styles.grid3}>
          <div className={styles.card}>
            <h3>5,000+</h3>
            <p>Lives Transformed</p>
          </div>
          <div className={styles.card}>
            <h3>50+</h3>
            <p>Communities Reached</p>
          </div>
          <div className={styles.card}>
            <h3>100+</h3>
            <p>Volunteers Engaged</p>
          </div>
        </div>
      </section>

      {/* ================= SUCCESS STORIES ================= */}
      <section
        id="stories"
        className={`${styles.section} ${styles.gray}`}
      >
        <h2>Success Stories</h2>
        <p>
          Read inspiring stories from individuals whose lives have been
          transformed through our programs.
        </p>
      </section>

      {/* ================= NEWS ================= */}
      <section className={styles.section}>
        <h2>News & Updates</h2>
        <p>Stay updated with our latest activities and achievements.</p>
      </section>

      {/* ================= EVENTS ================= */}
      <section
        className={`${styles.section} ${styles.gray}`}
      >
        <h2>Upcoming Events</h2>
        <p>
          Join our upcoming outreach programs and fundraising events.
        </p>
      </section>

      {/* ================= RESOURCES ================= */}
      <section className={styles.section}>
        <h2>Resources</h2>
        <p>
          Access reports, publications, and learning materials.
        </p>
      </section>

      {/* ================= SUPPORT US ================= */}
      <section
        className={`${styles.section} ${styles.gray}`}
      >
        <h2>Support Us</h2>
        <p>
          Your support helps us reach more communities and change more lives.
        </p>
        <button className={styles.btnPrimary}>
          Donate Now
        </button>
      </section>

      {/* ================= GET INVOLVED ================= */}
      <section className={styles.section}>
        <h2>Get Involved</h2>
        <p>
          Volunteer, partner with us, or become an ambassador.
        </p>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className={`${styles.section} ${styles.gray}`}
      >
        <h2>Contact Us</h2>
        <p>Email: info@organization.org</p>
        <p>Phone: +256 XXX XXX XXX</p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Organization.
        All Rights Reserved.
      </footer>
    </>
  );
}