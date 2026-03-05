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

      
      {/* ================= HIGHLIGHTS CARDS ================= */}
<section id="highlights" className={`${styles.section} ${styles.gray}`}>
  <h2>Highlights</h2>
  <div className={styles.cardsRow}>
    {/* Success Stories Card */}
    <div className={styles.highlightCard}>
      <div className={styles.cardInner}>
        <img
          src="/images/success.jpg"
          alt="Success Stories"
          className={styles.cardImage}
        />
        <div className={styles.cardContent}>
          <h3>Success Stories</h3>
          <a href="#stories" className={styles.cardLink}>
            <span>View More</span>
            <div className={styles.arrowCircle}>→</div>
          </a>
        </div>
      </div>
    </div>

    {/* News & Updates Card */}
    <div className={styles.highlightCard}>
      <div className={styles.cardInner}>
        <img
          src="/images/news.jpg"
          alt="News & Updates"
          className={styles.cardImage}
        />
        <div className={styles.cardContent}>
          <h3>News & Updates</h3>
          <a href="#news" className={styles.cardLink}>
            <span>View More</span>
            <div className={styles.arrowCircle}>→</div>
          </a>
        </div>
      </div>
    </div>

    {/* Upcoming Events Card */}
    <div className={styles.highlightCard}>
      <div className={styles.cardInner}>
        <img
          src="/images/events.jpg"
          alt="Upcoming Events"
          className={styles.cardImage}
        />
        <div className={styles.cardContent}>
          <h3>Upcoming Events</h3>
          <a href="#events" className={styles.cardLink}>
            <span>View More</span>
            <div className={styles.arrowCircle}>→</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>


{/* ================= RESOURCES ================= */}
<section id="resources" className={styles.section}>
  <h2>Resources</h2>
  <div className={styles.resourcesRow}>
    {/* Research Papers */}
    <div className={styles.resourceCard}>
      <div className={styles.resourceIcon}>📄</div>
      <h3>Research Papers</h3>
      <p>Access in-depth research documents from our initiatives.</p>
      <a href="/downloads/research-paper.pdf" download className={styles.downloadBtn}>
        Download
      </a>
    </div>

    {/* Reports */}
    <div className={styles.resourceCard}>
      <div className={styles.resourceIcon}>📊</div>
      <h3>Reports</h3>
      <p>View our annual and special reports for transparency.</p>
      <a href="/downloads/report.pdf" download className={styles.downloadBtn}>
        Download
      </a>
    </div>

    {/* Case Studies */}
    <div className={styles.resourceCard}>
      <div className={styles.resourceIcon}>📁</div>
      <h3>Case Studies</h3>
      <p>Learn from our detailed case studies and success examples.</p>
      <a href="/downloads/case-study.pdf" download className={styles.downloadBtn}>
        Download
      </a>
    </div>
  </div>
</section>

      {/* ================= SUPPORT & GET INVOLVED ================= */}
<section className={`${styles.section} ${styles.gray}`}>
  <div className={styles.supportRow}>

    {/* Support Us */}
    <div className={styles.supportBox}>
      <h2>Support Us</h2>

      <div className={styles.supportIcons}>

        <div className={styles.supportItem}>
          <div className={styles.icon}>💳</div>
          <p>Donate</p>
        </div>

        <div className={styles.supportItem}>
          <div className={styles.icon}>🤝</div>
          <p>Partner</p>
        </div>

        <div className={styles.supportItem}>
          <div className={styles.icon}>⭐</div>
          <p>Sponsor</p>
        </div>

        <div className={styles.supportItem}>
          <div className={styles.icon}>🎯</div>
          <p>Fundraise</p>
        </div>

      </div>
    </div>


    {/* Get Involved */}
    <div className={styles.involvedBox}>
      <h2>Get Involved</h2>

      <div className={styles.involvedBar}>
        Become part of our mission by volunteering or partnering with us.
      </div>

      <button className={styles.btnPrimary}>
        Join Us
      </button>
    </div>

  </div>
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