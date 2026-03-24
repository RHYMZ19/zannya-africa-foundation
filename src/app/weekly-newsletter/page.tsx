'use client';

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import Image from "next/image";
import styles from "./WeeklyPage.module.css";
import Link from "next/link";
import { onSnapshot } from "firebase/firestore";
import IncreaseImage from "../components/IncreaseImage";

// Type for newsletter items
type NewsletterItem = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  by?: string; // new field
  image?: string;
  timestamp?: Timestamp | null;
};

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  pdf: string;
};

export default function WeeklyNewsletterPage() {
  const [items, setItems] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

  const fetchNewsletters = async () => {
    const q = query(
      collection(db, "weeklyNewsletter"),
      orderBy("timestamp", "desc")
    );

    const snap = await getDocs(q);

    const newsletters: NewsletterItem[] = snap.docs.map(d => ({
      id: d.id,
      title: d.data().title || "No Title",
      subtitle: d.data().subtitle || "",
      description: d.data().description || "",
      by: d.data().by || "", // include 'by'
      image: d.data().image || "",
      timestamp: d.data().timestamp || null,
    }));

    setItems(newsletters);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      {/* ================= NAVBAR ================= */}
                  <nav className={styles.navbar}>
                    <IncreaseImage src='/log.jpg' alt="Logo" />
                    <div className={styles.logo}>Zannya Africa Foundation</div>
                    
                    <div
                      className={`${styles.navLinks} ${
                        open ? styles.active : ""
                      }`}
                    >
                      <a href="/">Home</a>
                      
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
                    📄 Research Papers
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

   <h1 className={styles.title}>Articles</h1>
   
   {items.length === 0 && <p>No newsletters posted yet.</p>}

   <div className={styles.cardsGrid}> {/* new grid wrapper */}
    {items.map((item) => (
      <div key={item.id} className={styles.card}>
        {item.image && (
          <Link href={`/newsletter/${item.id}`}>
          <Image
            src={item.image}
            alt="Newsletter Banner"
            width={600}
            height={300}
            className={styles.banner}
          />
          </Link>
        )}

        <h2 className={styles.cardTitle}>{item.title}</h2>
        
        <p className={styles.cardSubtitle}>
          {item.subtitle && item.subtitle.length > 400
            ? `${item.subtitle.substring(0, 400)}... `
            : item.subtitle}

          {item.subtitle && item.subtitle.length > 400 && (
            <Link href={`/newsletter/${item.id}`} className={styles.more}>
              more
            </Link>
          )}
        </p>
        <Link href={`/newsletter/${item.id}`}>
        <p className={styles.cardDescription}>
          {item.description && item.description.length > 100
            ? `${item.description.substring(0, 100)}... `
            : item.description}
  
          {item.description && item.description.length > 100 && (
            <Link href={`/newsletter/${item.id}`} className={styles.more}>
              more
            </Link>
          )}
        </p>
        </Link>
        {item.by && <p className={styles.by}><em>By: {item.by}</em></p>}
        {item.timestamp && (
          <p className={styles.date}>
            {item.timestamp.toDate().toLocaleDateString()}
          </p>
        )}

        <hr />
      </div>
     ))}
    </div>

    {/* ================= FOOTER ================= */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          
          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h4>Contact Us</h4>
            <div className={styles.contactLinks}>
              <a href="mailto:info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a>
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
   </div>

  );
}