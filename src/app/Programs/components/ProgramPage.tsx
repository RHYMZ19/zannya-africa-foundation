'use client';

import IncreaseImages from "@/app/components/IncreaseImages";
import db from "@/app/lib/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import styles from "./ProgramPage.module.css";
import Link from "next/link";

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  pdf: string;
};

type Highlight = {
  title: string;
  detail: string;
  icon: string;
};

type Activity = {
  title?: string;
  detail?: string;
  imageTitle?: string;
  image: string;
};

type ProgramPageProps = {
  title: string;
  description: string;
  intro: string;
  image: string;
  highlights: Highlight[];
  activities: Activity[];
  ctaText: string;
};

export default function ProgramPage({
  title,
  description,
  intro,
  image,
  highlights,
  activities,
  ctaText
}: ProgramPageProps) {

  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResourceCategory, setSelectedResourceCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

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
    <div className={styles.page}>

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
      About Us
    </a>
  </div>
</div>

                {/* PROGRAMS DROPDOWN */}
<div className={styles.dropdown}>
  <span className={styles.dropdownTitle}>Programs ▾</span>

  <div className={styles.dropdownMenu}>

    <Link href="/Programs/climate-justice" className={styles.dropdownItem}>
      🌱 Climate Action
    </Link>

    <Link href="/Programs/reproductive-health" className={styles.dropdownItem}>
      ❤️ SRH
    </Link>

    <Link href="/Programs/skilling-livelihood" className={styles.dropdownItem}>
      💼 Sports For Livelihood
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

            {/* ================= RESOURCE MODAL ================= */}
            {selectedResourceCategory && (

              <div className={styles.modalOverlay}
              onClick={() => setSelectedResourceCategory(null)}
              >
            
                <div className={styles.modalContent}
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

      {/* HERO */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.heroContent}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
      

      {/* ================= OBJECTIVES + ACTIVITIES SPLIT ================= */}
<section className={styles.splitSection}>

  {/* SMALL INTRO */}
  <div className={styles.splitIntro}>
    <h3></h3>
    <p>{intro}</p>
  </div>

  {/* LEFT SIDE - OBJECTIVES */}
  <div className={styles.singleCard}>
    <h2 className={styles.splitTitle}> Objectives</h2>

    <ul className={styles.list}>
      {highlights.map((item, index: number) => (
        <li key={index} className={styles.listItem}>
          
          <span className={styles.number}>
            {index + 1}.
          </span>

          <h4>{item.title}</h4>

        </li>
      ))}
    </ul>
  </div>

  {/* RIGHT SIDE - ACTIVITIES */}
  <div className={styles.singleCard}>
    <h2 className={styles.splitTitle}> Activities</h2>

    <ul className={styles.list}>
      {activities.map((activity, index: number) => (
  activity.title && (
    <li key={index} className={styles.listItem}>
      
      <span className={styles.number}>
        {index + 1}.
      </span>

      {activity.title && <h4>{activity.title}</h4>}

    </li>
  )
))}
    </ul>
  </div>
</section>


     


{/* PROGRAM ACTIVITIES */}
<section className={styles.activities}>
  <h2 className={styles.sectionTitle}></h2>

  <div className={styles.activitiesGrid}>
  {activities.map((activity, index: number) => (
  <div key={index} className={styles.activityItem}>

  <div
    className={styles.activityImage}
    style={{ backgroundImage: `url(${activity.image})` }}
  ></div>

  {/* TITLE BELOW IMAGE */}
  <h3 className={styles.activityTitle}>
    {activity.imageTitle}
  </h3>

</div>
))}
  </div>
</section>


      {/* ================= FOOTER ================= */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>

  <a href="mailto:info@zannyaafricafoundation.org">
    📧 info@zannyaafricafoundation.org
  </a>

  <span>|</span>

  <a href="/Terms">
    Privacy Policy & Legal Terms
  </a>

  <span>|</span>

  <a href="/adminpannel">
    Admin Panel
  </a>

</div>
      
        {/* Bottom Bar */}
<div className={styles.footerBottom}>
  <p>
    © {new Date().getFullYear()} Zannya Africa Foundation. All Rights Reserved.
  </p>

  <div className={styles.footerDeveloper}>
    <span>Developed by <strong>SSENABULYA RAHIM</strong></span>
    <span>|</span>
    <a href="tel:+256743878261">0743878261</a>
    <span>|</span>
    <a href="mailto:rahimssenabulya82@gmail.com">
      rahimssenabulya82@gmail.com
    </a>
  </div>
</div>
      </footer>

    </div>
  );
}