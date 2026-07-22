'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../lib/firebase";
import { doc, getDoc, Timestamp, collection } from "firebase/firestore";
import Image from "next/image";
import styles from "./NewsletterDetail.module.css";
import Linkify from "linkify-react";
import { onSnapshot } from "firebase/firestore";
import IncreaseImage from "../../components/IncreaseImage";


type NewsletterItem = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  by?: string;
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

export default function NewsletterDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [item, setItem] = useState<NewsletterItem | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (!id) return;

    const fetchNewsletter = async () => {
      const docRef = doc(db, "weeklyNewsletter", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data() as Omit<NewsletterItem, "id">;
        setItem({ id: docSnap.id, ...docData });
      } else {
        setItem(null);
      }
      setLoading(false);
    };

    fetchNewsletter();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Newsletter not found.</p>;

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
                      <div className={styles.dropdown}>
  <span className={styles.dropdownTitle}>Home ▾</span>

  <div className={styles.dropdownMenu}>
    <a href="/" className={styles.dropdownItem}>
      Home
    </a>
    <a href="/Missions" className={styles.dropdownItem}>
      Mission & Vision
    </a>
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
  {item.timestamp && <p className={styles.date}>{item.timestamp.toDate().toLocaleDateString()}</p>}

  <h1 className={styles.title}>{item.title}</h1>

  {item.by && <p className={styles.by}>By {item.by}</p>}

  <div className={styles.topRow}>
    {item.image && (
      <div className={styles.imageBox}>
        <Image
          src={item.image}
          width={400}
          height={300}
          alt={item.title}
          className={styles.image}
        />
      </div>
    )}

    <div className={styles.subtitleBox}>
      <p className={styles.subtitle}>
        <Linkify options={{ target: "_blank" }}>
        {item.subtitle}
        </Linkify>
        </p>
    </div>
  </div>

  <p className={styles.description}>
    <Linkify options={{ target: "_blank" }}>
    {item.description}
    </Linkify>
    </p>

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