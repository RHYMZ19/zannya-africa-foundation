"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./main.module.css";
import IncreaseImages from "../components/IncreaseImages";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  pdf: string;
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const counterRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResourceCategory, setSelectedResourceCategory] = useState<string | null>(null);

  // Initialize AOS and IntersectionObserver
  useEffect(() => {
    AOS.init({ duration: 1200 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  const fetchResources = async () => {
    const res = await fetch("/api/resources");
    const data = await res.json();
    setResources(data);
  };

  fetchResources();
}, []);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className={styles.navbar}>
        <IncreaseImages src='/log.jpg' alt="Logo" />
        <div className={styles.logo}>Zannya Africa Foundation</div>

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
          <a href="/Donates" className={styles.btnPrimary}> Donate</a>
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
          <h1>Zannya Africa Foundation</h1>
          <p>
           Changing communities through sports
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
          Changing the community through sports. We work with unprivileged children, youth and women for their own development and the community at large using sports and recreation activities as an engine.
        </p>
      </section>


      {/* ================= FEATURED ARTICLES ================= */}
<section className={styles.featuredSection}>
  <div className={styles.featuredContainer}>
    
    {/* LEFT IMAGE */}
    <div className={styles.featuredImage}>
      <img src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758898506/zannya/uploads/images/ilyhjfpy0s8u8zvgbueg.jpg" alt="Interesting Articles" />
    </div>

    {/* RIGHT TEXT */}
    <div className={styles.featuredContent}>
      <h2>Explore More of Our Interesting Articles</h2>

      <p>
        Discover powerful stories, insightful research, and inspiring
        perspectives from our work in communities. Our articles highlight
        innovation, impact, and the voices of people driving change.
      </p>
  
      <a href="/weekly-newsletter" className={styles.featuredButton}>
        Read Articles →
      </a>
    </div>

  </div>
</section>

      {/* ================= PROGRAMS ================= */}
<section
  id="programs"
  className={`${styles.section} ${styles.gray}`}
>
  <h2 className={styles.sectionTitle}>Our Programs & Activities</h2>

  <div className={styles.programGrid}>

    {/* Skilling */}
    <div className={styles.programCard}>
      <img
        src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758450150/zannya/uploads/h5anrmy2jcid8qjrbbls.jpg"
        alt="Education"
        className={styles.programImage}
      />

      <div className={styles.programOverlay}>
        <h3>Skilling & Livelihood</h3>

        <p>
         ZAF utilizes sports and recreation activities as a tool to enhance the 
            ivelihood skills of underprivileged youth and women.
        </p>

        <a href="/Programs" className={styles.learnMore}>
          Learn More →
        </a>
      </div>
    </div>

    {/* HEALTH */}
    <div className={styles.programCard}>
      <img
        src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758448906/zannya/uploads/cokcf4ojsqzzueeebtzh.jpg"
        alt="Health"
        className={styles.programImage}
      />

      <div className={styles.programOverlay}>
        <h3>Reproductive & Physical health awareness </h3>

        <p>
          Improving healthcare access through community outreach,
          awareness campaigns, and support programs.
        </p>

        <a href="/Programs" className={styles.learnMore}>
          Learn More →
        </a>
      </div>
    </div>

    {/* YOUTH */}
    <div className={styles.programCard}>
      <img
        src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757064571/zannya/uploads/lpux4wqm27omuk9u15ei.jpg"
        alt="Youth Empowerment"
        className={styles.programImage}
      />

      <div className={styles.programOverlay}>
        <h3>Climate justice advocacy</h3>

        <p>
          This program leverages sports to promote climate policy advocacy, education, 
                    and community engagement.
        </p>

        <a href="/Programs" className={styles.learnMore}>
          Learn More →
        </a>
      </div>
    </div>

  </div>
</section>

      <div>
      {/* ================= IMPACT ================= */}
      <section id="impact" className={styles.section} ref={counterRef}>
        <h2>Our Impact</h2>
        <div className={styles.grid3}>
          <div className={styles.card}>
            <h3>
              {inView ? <CountUp end={5000} duration={3} separator="," /> : 0}+
            </h3>
            <p>Lives Transformed</p>
          </div>

          <div className={styles.card}>
            <h3>
              {inView ? <CountUp end={50} duration={3} /> : 0}+
            </h3>
            <p>Communities Reached</p>
          </div>

          <div className={styles.card}>
            <h3>
              {inView ? <CountUp end={100} duration={3} /> : 0}+
            </h3>
            <p>Volunteers Engaged</p>
          </div>
        </div>
      </section>
    </div>

      
      {/* ================= HIGHLIGHTS CARDS ================= */}
<section id="highlights" className={`${styles.section} ${styles.gray}`}>
  <h2>Highlights</h2>
  <div className={styles.cardsRow}>
    {/* Success Stories Card */}
    <div className={styles.highlightCard}>
      <div className={styles.cardInner}>
        <img
          src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756890840/zannya/success/mfh1xjdphnjokfqxtwqp.jpg"
          alt="Success Stories"
          className={styles.cardImage}
        />
        <div className={styles.cardContent}>
          <h3>Success Stories</h3>
          <a href="/Successs" className={styles.cardLink}>
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
          src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758023066/zannya/uploads/images/sps7gaj21stmytn7outn.jpg"
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
          src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758023192/zannya/uploads/images/evtysd6cvwkgufpbfhcm.jpg"
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

      <button
        className={styles.downloadBtn}
        onClick={() => setSelectedResourceCategory("Research Papers")}
      >
        Download
      </button>
    </div>

    {/* Reports */}
    <div className={styles.resourceCard}>
      <div className={styles.resourceIcon}>📊</div>
      <h3>Reports</h3>
      <p>View our annual and special reports for transparency.</p>

      <button
        className={styles.downloadBtn}
        onClick={() => setSelectedResourceCategory("Reports")}
      >
        Download
      </button>
    </div>

    {/* Case Studies */}
    <div className={styles.resourceCard}>
      <div className={styles.resourceIcon}>📁</div>
      <h3>Case Studies</h3>
      <p>Learn from our detailed case studies and success examples.</p>

      <button
        className={styles.downloadBtn}
        onClick={() => setSelectedResourceCategory("Case Studies")}
      >
        Download
      </button>
    </div>

  </div>
</section>

{/* ================= RESOURCE MODAL ================= */}
{selectedResourceCategory && (
  <div className={styles.modalOverlay}>

    <div className={styles.modalContent}>

      <div className={styles.modalHeader}>
        <h3>{selectedResourceCategory}</h3>

        <button
          className={styles.closeBtn}
          onClick={() => setSelectedResourceCategory(null)}
        >
          ✕
        </button>
      </div>

      <div className={styles.resourceList}>

        {resources
          .filter(res => res.category === selectedResourceCategory)
          .map(res => (

            <div key={res.id} className={styles.resourceItem}>

              <div>
                <strong>{res.title}</strong>
                <p>{res.description}</p>
              </div>

              <a
                href={res.pdf}
                download
                target="_blank"
                rel="noopener noreferrer"
                className={styles.downloadBtn}
              >
                Download PDF
              </a>

            </div>

        ))}

      </div>

    </div>

  </div>
)}

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