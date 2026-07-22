"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./main.module.css";
import IncreaseImages from "./components/IncreaseImages";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { collection, onSnapshot } from "firebase/firestore";
import db from "./lib/firebase";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";


type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  pdf: string;
};

export default function MainPage() {
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
  const unsubscribe = onSnapshot(collection(db, "resources"), (snapshot) => {
    const items = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        category: data.category,
        pdf: data.pdf,
      };
    });

    setResources(items);
  });

  return () => unsubscribe();
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
          <div className={styles.dropdown}>
  <span className={styles.dropdownTitle}>Home ▾</span>

  <div className={styles.dropdownMenu}>
    <a href="/" className={styles.dropdownItem}>
      Home
    </a>
    <a href="/Missions" className={styles.dropdownItem}>
      About us
    </a>
  </div>
</div>
          
          

          {/* PROGRAMS DROPDOWN */}
<div className={styles.dropdown}>
  <span className={styles.dropdownTitle}>Programs ▾</span>

  <div className={styles.dropdownMenu}>

    <Link href="/Programs/climate-justice" className={styles.dropdownItem}>
      🌱 Climate Justice
    </Link>

    <Link href="/Programs/reproductive-health" className={styles.dropdownItem}>
      ❤️ Reproductive Health
    </Link>

    <Link href="/Programs/skilling-livelihood" className={styles.dropdownItem}>
      💼 Skilling & Livelihood
    </Link>

  </div>
</div>
          
          {/* RESOURCES DROPDOWN */}
  <div className={styles.dropdown}>
    <span className={styles.dropdownTitle}>Resources ▾</span>

    <div className={styles.dropdownMenu}>

      <a href="/weekly-newsletter" className={styles.dropdownItem}>
        📰 Articles
      </a>
      
      <a
        href="#"
        className={styles.dropdownItem}
        onClick={() => setSelectedResourceCategory("Research Papers")}
      >
        📄 Publications
      </a>

      <a
        href="#"
        className={styles.dropdownItem}
        onClick={() => setSelectedResourceCategory("Reports")}
      >
        📊 Reports
      </a>

      <a
        href="#"
        className={styles.dropdownItem}
        onClick={() => setSelectedResourceCategory("Case Studies")}
      >
        📁 Case Studies
      </a>

    </div>
  </div>
          <a href="#contact">Contact</a>
          <a href="/Videos" >Gallery</a>
          <a href="#/Donates" className={styles.btnPrimary}> Donate</a>
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
  <div className={styles.whoContainer}>

    {/* LEFT SIDE */}
    <div className={styles.whoText}>
      <h2>Who We Are</h2>

      <p>
        Zannya Africa Foundation is a community-driven organization committed
        to transforming lives through sports and recreation. We work with
        underprivileged children, youth, and women to promote empowerment,
        social inclusion, and sustainable development.
      </p>

      <p>
        Through innovative programs and partnerships, we use sports as a
        powerful engine to inspire leadership, improve well-being, and
        strengthen communities.
      </p>
    </div>

    {/* RIGHT SIDE */}
    <div className={styles.missionVisionBox}>

      {/* Vision */}
      <div className={styles.infoCard}>
        <h3>Vision</h3>
        <p>
          To change lives and build stronger and healthier
          communities.
        </p>
      </div>

      {/* Mission */}
      <div className={styles.infoCard}>
        <h3>Mission</h3>
        <p>
          To empower adolescents and youth in Uganda's urban slums by using sports as a 
          transformative tool for community development, personal empowerment, 
          and long-term sustainability.
        </p>
      </div>

      <a href="Missions" className={styles.featuredButton}>
        About Us →
      </a>

    </div>

  </div>
</section>


      {/* ================= FEATURED IMAGES ================= */}
<section className={styles.featuredSection}>
  <div className={styles.featuredContainer}>
    
    {/*  IMAGE */}
    <div className={styles.featuredImages}>
      <img src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758374799/zannya/uploads/images/insun2kdxlwor2iqb8va.jpg" alt="Interesting Articles" />
      <img src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758376472/zannya/uploads/images/go3uxxditpcuwwfnui7s.jpg" alt="Interesting Articles" />
      <img src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758376508/zannya/uploads/images/t614e7cy9pkrpcibktnv.jpg" alt="Interesting Articles" />
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
        <h3> Sports for enhanced livelihood </h3>

        <p>
         To empower  Youth in urban slums of Uganda to attain sustainable livelihood, 
      economic stability and wellbeing through sports-based initiatives.
        </p>

        <Link href="/Programs/skilling-livelihood" className={styles.learnMore}>
        Learn More →
      </Link>
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
        <h3>Sexual reproductive health & physical wellness </h3>

        <p>
          To Improve SRH and Physical wellness for  Ugandan adolescents & youth living in 
      urban slums of Uganda through sexual health awareness and healthy physical lifestyles to prevent 
      lifestyle disease and foster responsible health choices.
        </p>

        <Link href="/Programs/reproductive-health" className={styles.learnMore}>
         Learn More →
       </Link>
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
        <h3>Climate action & environment justice</h3>

        <p>
          To Strengthen climate resilience and Environmental sustainability for  
      vulnerable Youths in Schools, Community and institutions in Uganda through Sports, 
      climate Advocacy and digital innovation.
        </p>

        <Link href="/Programs/climate-justice" className={styles.learnMore}>
          Learn More →
        </Link>
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
          <Link href="/NewsSection" className={styles.cardLink}>
            <span>View More</span>
            <div className={styles.arrowCircle}>→</div>
          </Link>
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


{/* ================= RESOURCE MODAL ================= */}
{selectedResourceCategory && (
  <div
    className={styles.modalOverlay}
    onClick={() => setSelectedResourceCategory(null)}
  >

    <div
      className={styles.modalContent}
      onClick={(e) => e.stopPropagation()}
    >

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

      {/* ================= SUPPORT & CONTACT ================= */}
<section id="contact" className={`${styles.section} ${styles.gray}`}>
  <div className={styles.supportRow}>

    {/* Support Us */}
    <div className={styles.supportBox}>
      <h2>Support Us</h2>

      <div className={styles.supportIconsWrapper}>

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
        
        {/* CENTER BUTTON */}
        <a href="#Internship" className={styles.joinCircle}>
          Join Us
        </a>

      </div>
    </div>


    {/* CONTACT (replaces Get Involved) */}
    <div  id="#contact" className={styles.involvedBox}>
      <h2 className={styles.contactTitle}>Contact Us</h2>

      <p>
        <strong>Zannya Africa Foundation</strong>
      </p>

      <p>
        Plot 2, Kati House, Nakasero, Ground Floor <br/>
        P.O.Box 168040 Kampala, Uganda
      </p>

      <p>
        <strong>Phone</strong><br/>
        +256 786 797 963 <br/>
        
      </p>

      <p>
        <strong>Email</strong><br/>
        <a href="mailto:info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a>
      </p>

      <p>
        <strong>Website</strong><br/>
        <a href="https://www.zannyaafricafoundation.org" target="_blank">
          www.zannyaafricafoundation.org
        </a>
      </p>

      {/* Social Icons */}
      <div className={styles.socialIcons}>
        <a href="https://facebook.com/zannyaafricafoundation" target="_blank">
          <FaFacebook />
        </a>

        <a href="https://instagram.com/zannya_africa_foundation" target="_blank">
          <FaInstagram />
        </a>

        <a href="https://tiktok.com/@zannyaafricafdn" target="_blank">
          <FaTiktok />
        </a>

        <a href="https://x.com/zannyaafrica" target="_blank">
          <FaXTwitter />
        </a>

        <a href="https://wa.me/256786797963" target="_blank">
          <FaWhatsapp />
        </a>
      </div>

    </div>

  </div>
</section>

      

  

      {/* ================= FOOTER ================= */}
<footer className={styles.footer}>
  <div className={styles.footerContainer}>
    

    {/* Developer Credit */}
    <div className={styles.developerSection}>
      <h4>Developer</h4>
      <p>Developed by <strong>SSENABULYA RAHIM</strong></p>
      <p>Tel: <a href="tel:+256743878261">0743878261</a></p>
      <p>Email: <a href="mailto:rahimssenabulya82@gmail.com">rahimssenabulya82@gmail.com</a></p>
    </div>

    {/* Links */}
    <div className={styles.footerSection}>
      <h4>Links</h4>
      <a href="#Terms" className={styles.footerLink}>Privacy Policy & Legal Terms</a>
      <a href="/adminpannel" className={styles.adminLink}>Admin Panel</a>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className={styles.footerBottom}>
    <p>© {new Date().getFullYear()} Zannya Africa Foundation. All Rights Reserved.</p>
  </div>
</footer>
    </>
  );
}