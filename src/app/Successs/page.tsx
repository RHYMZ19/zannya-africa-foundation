'use client';

import { useEffect, useState } from "react";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import db from "../lib/firebase";
import styles from "./Successs.module.css";
import Image from "next/image";
import IncreaseImages from "../components/IncreaseImages";
import Link from "next/link";

type SuccessStory = {
  id: string;
  title: string;
  description: string;
  images?: string[];
  video?: string;
  pdf?: string;
  timestamp?: Timestamp;
};

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  pdf: string;
};

export default function Successs() {
  const router = useRouter();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResourceCategory, setSelectedResourceCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "successStories"), snapshot => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<SuccessStory, "id">)
      }));
      setStories(items);
      setLoading(false);
    });

    return () => unsubscribe();
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
    <a href="/">Home</a>
    <a href="/Missions">Mission & Vision</a>
  </div>
</div>
                      
                      {/* RESOURCES DROPDOWN */}
              <div className={styles.dropdown}>
                <span className={styles.dropdownTitle}>Resources ▾</span>
            
                <div className={styles.dropdownMenu}>
            
                  <a href="/articles" className={styles.dropdownItem}>
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

      {/* STORIES */}
      <section className={styles.container}>
        <h2 className={styles.sectionTitle}>Stories That Inspire</h2>

        {loading ? (
          <p className={styles.center}>Loading...</p>
        ) : (
          <div className={styles.grid}>
            {stories.map(story => (
              <div key={story.id} className={styles.card}>

                <div className={styles.cardContent}>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                </div>

                {/* Images */}
                {story.images && (
                  <div className={styles.imageGrid}>
                    {story.images.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt=""
                        width={300}
                        height={200}
                        className={styles.storyImg}
                        onClick={() => setSelectedImage(img)}
                      />
                    ))}
                  </div>
                )}

                {/* Video */}
                {story.video && (
                  <video controls className={styles.video}>
                    <source src={story.video} />
                  </video>
                )}

                {/* PDF */}
                {story.pdf && (
                  <a href={story.pdf} target="_blank" className={styles.pdfBtn}>
                    Read Full Story
                  </a>
                )}

              </div>
            ))}
          </div>
        )}
      </section>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
          <Image src={selectedImage} alt="" width={800} height={600} />
        </div>
      )}


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