'use client';

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import styles from './Videos.module.css';
import { useRouter } from "next/navigation";
import IncreaseImagis from "./components/IncreaseImagis";
import IncreaseImage from "../components/IncreaseImage";
import { onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import Link from "next/link";


interface MediaItem {
  url: string;
  type: "image" | "video";
  createdAt: Timestamp | Date;
}

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  pdf: string;
};

export default function Videos() {
  const [filter, setFilter] = useState<"image" | "video">("image");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 
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
  

  // Load from Firestore
  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const galleryRef = doc(db, "media", "gallery");
        const snap = await getDoc(galleryRef);

        if (snap.exists()) {
          const data = snap.data() as {
            images?: { url: string; createdAt: Date | Timestamp }[];
            videos?: { url: string; createdAt: Date | Timestamp }[];
          };

          let fetchedItems: MediaItem[] = [];

          if (filter === "image") {
            fetchedItems = (data.images || []).map(img => ({
              ...img,
              type: "image" as const,
            }));
          } else {
            fetchedItems = (data.videos || []).map(video => ({
              ...video,
              type: "video" as const,
            }));
          }

          // ✅ Sort newest first (no `any`)
          fetchedItems.sort((a, b) => {
            const dateA =
              a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt);
            const dateB =
              b.createdAt instanceof Timestamp ? b.createdAt.toDate() : new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime();
          });

          setItems(fetchedItems);
        } else {
          console.warn("Gallery document not found.");
          setItems([]);
        }
      } catch (err) {
        console.error("Error loading media:", err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [filter]);

  return (
    <div>
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

      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        {/* Filter */}
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "image" | "video")}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <option value="image">Photos</option>
            <option value="video">Videos</option>
          </select>
        </div>

        {/* Gallery Display */}
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            {items.map((item, idx) =>
              item.type === "image" ? (
                <IncreaseImagis
                  key={idx}
                  src={item.url}
                  alt={`Media ${idx + 1}`}
                />
              ) : (
                <video
                  key={idx}
                  src={item.url}
                  controls
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              )
            )}
          </div>
        )}
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