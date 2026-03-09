"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./main.module.css";
import IncreaseImages from "./components/IncreaseImages";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { collection, onSnapshot } from "firebase/firestore";
import db from "./lib/firebase";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaPhone } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";


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
          <a href="#who">Who We Are</a>
          <a href="#programs">Programs</a>
          <a href="#impact">Impact</a>
          <a href="#stories">Stories</a>
          <a href="#contact">Contact</a>
          <a href="/Videos" >Gallery</a>
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

      {/* Mission */}
      <div className={styles.infoCard}>
        <h3>Mission</h3>
        <p>
          To use sports as a tool for community development,
          empowerment, and sustainability.
        </p>
      </div>

      {/* Vision */}
      <div className={styles.infoCard}>
        <h3>Vision</h3>
        <p>
          To change lives and build stronger and healthier
          communities.
        </p>
      </div>

      <a href="/Missions" className={styles.featuredButton}>
        visit us →
      </a>

    </div>

  </div>
</section>


      {/* ================= FEATURED ARTICLES ================= */}
<section className={styles.featuredSection}>
  <div className={styles.featuredContainer}>
    
    {/* LEFT IMAGE */}
    <div className={styles.featuredImage}>
      <img src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1766645680/zannya/uploads/agevikfptarypojmcgjy.jpg" alt="Interesting Articles" />
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

        <a href="/Programs?category=Skilling%20and%20Livelihood" className={styles.learnMore}>
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

        <a href="/Programs?category=Reproductive%20%26%20Physical%20Health%20Awareness" className={styles.learnMore}>
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

        <a href="/Programs?category=Climate%20Justice%20Advocacy" className={styles.learnMore}>
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
      <a href="/Internship" className={styles.btnPrimary}>Join Us</a>
    </div>

  </div>
</section>

      {/* ================= CONTACT ================= */}
<section id="contact" className={`${styles.section} ${styles.gray}`}>
  <h2 className={styles.contactTitle}>Contact Us</h2>

  <div className={styles.contactGrid}>

    {/* Left Side - Organization Info */}
    <div className={styles.contactInfo}>
      <h3>Zannya Africa Foundation</h3>

      <p>
        <strong>Address:</strong><br/>
        Plot 2, Kati House, Nakasero, Ground Floor <br/>
        P.O.Box 168040 Kampala, Uganda
      </p>

      <p>
        <strong>Phone:</strong><br/>
        +256 786 797 963 <br/>
        +256 700 340 576
      </p>

      <p>
        <strong>Email:</strong><br/>
        <a href="mailto:zannyaafricafoundation@gmail.com">
          zannyaafricafoundation@gmail.com
        </a>
      </p>

      <p>
        <strong>Website:</strong><br/>
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
      </div>
    </div>

    {/* Right Side - Contact Form */}
    <div className={styles.contactForm}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);

          const res = await fetch("/api/sendContactMail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.get("name"),
              email: formData.get("email"),
              message: formData.get("message"),
            }),
          });

          if (res.ok) {
            alert("Message sent successfully!");
            e.currentTarget.reset();
          } else {
            alert("Failed to send message.");
          }
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
        />

        <textarea
          name="message"
          placeholder="Write your message..."
          rows={5}
          required
        ></textarea>

        <button type="submit">
          Send Message
        </button>
      </form>
    </div>

  </div>

  {/* Quick Contact Icons */}
  <div className={styles.quickContact}>
    <a href="mailto:info@zannyaafricafoundation.org">
      <MdEmail />
    </a>

    <a href="https://wa.me/256786797963" target="_blank">
      <FaWhatsapp />
    </a>

    <a href="tel:+256786797963">
      <FaPhone />
    </a>
  </div>

</section>

      {/* ================= FOOTER ================= */}
<footer className={styles.footer}>
  <div className={styles.footerContainer}>
    
    {/* Contact Info */}
    <div className={styles.footerSection}>
      <h4>Contact Us</h4>
      <div className={styles.contactLinks}>
        <a href="mailto:info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a>
        <a href="mailto:support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a>
      </div>
    </div>

    {/* Developer Credit */}
    <div className={styles.footerSection}>
      <h4>Developer</h4>
      <p>Developed by <strong>SSENABULYA RAHIM</strong></p>
      <p>Tel: <a href="tel:+256743878261">0743878261</a></p>
      <p>Email: <a href="mailto:rahimssenabulya82@gmail.com">rahimssenabulya82@gmail.com</a></p>
    </div>

    {/* Links */}
    <div className={styles.footerSection}>
      <h4>Links</h4>
      <a href="/Terms" className={styles.footerLink}>Privacy Policy & Legal Terms</a>
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