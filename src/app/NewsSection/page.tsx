'use client'

import React, { JSX, useMemo, useState, useEffect } from "react";
import styles from "./NewsSection.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import IncreaseImages from "../components/IncreaseImages";

import { onSnapshot } from "firebase/firestore";

import Link from "next/link";

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  pdf: string;
};

type NewsItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  images: string[];
  video?: string;
  excerpt: string;
  content: string;
};

const categories: string[] = ["All", "News", "Events", "Announcements", "Blogs"];

export default function NewsSection(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
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

  const fetchNews = async () => {
    try {
      const snapshot = await getDocs(collection(db, "news"));
      const data = snapshot.docs.map((doc) => {
      const docData = doc.data();

      const { id, ...rest } = docData as any; // remove id if exists

      return {
        id: doc.id,
        ...rest,
      };
     });

      setNewsData(data);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (date: any) => {
  if (!date) return "";

  if (date?.seconds) {
    return new Date(date.seconds * 1000).toLocaleDateString();
  }

  return date;
 };

  const filteredNews = useMemo(() => {
    return newsData.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search, newsData]);

  const featured = filteredNews.length > 0 ? filteredNews[0] : null;
  

  if (loading) {
    return <p>Loading news...</p>;
  }

  const rest = filteredNews.slice(1);

  // ================= ARTICLE VIEW =================
  if (selectedArticle) {
    return (
      <div className={styles.newsPage}>

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
    <a href="/" className={styles.dropdownItem}>Home</a>
    <a href="/Missions" className={styles.dropdownItem}>About us</a>
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

        <div className={styles.articleLayout}>
          <main className={styles.articleMain}>
            <button
              className={styles.backBtn}
              onClick={() => setSelectedArticle(null)}
            >
              ← Back to News
            </button>

            {/* IMAGE SLIDER (simple main image) */}
            {selectedArticle.images?.[0] && (
              <img
                src={selectedArticle.images[0]}
                alt={selectedArticle.title}
                className={styles.articleImage}
              />
            )}

            {/* VIDEO */}
            {selectedArticle.video && (
              <video controls style={{ width: "100%", marginTop: 10 }}>
                <source src={selectedArticle.video} />
              </video>
            )}

            <p className={styles.newsCategory}>{selectedArticle.category}</p>
            <h1 className={styles.articleTitle}>{selectedArticle.title}</h1>
            <p className={styles.newsMeta}>
              {formatDate(selectedArticle.date)} • By {selectedArticle.author}
            </p>
            <p className={styles.articleText}>{selectedArticle.content}</p>
          </main>

          <aside className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Recent Posts</h3>

            {newsData.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className={styles.sidebarItem}
                onClick={() => setSelectedArticle(item)}
              >
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className={styles.sidebarImg}
                />
                <div>
                  <p className={styles.sidebarItemTitle}>{item.title}</p>
                  <span className={styles.sidebarDate}>{formatDate(item.date)}</span>
                </div>
              </div>
            ))}
          </aside>
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

  // ================= LIST VIEW =================
  return (
    <section className={styles.newsPage}>

      {/* ================= NAVBAR ================= */}
                    <nav className={styles.navbar}>
                      <IncreaseImages src='/log.jpg' alt="Logo" />
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

      <div className={styles.Layer}>
      <div className={styles.newsHeader}>
        <h2 className={styles.newsHeading}>News & Updates</h2>
        <p className={styles.newsSubheading}>
          Stay updated with our latest announcements, events, and impact stories.
        </p>
      </div>

      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.newsSearch}
        />
      </div>

      <div className={styles.newsFilters}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${styles.filterBtn} ${
              selectedCategory === cat ? styles.activeFilter : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FEATURED */}
      {featured && (
        <div
          className={styles.featuredNews}
          onClick={() => setSelectedArticle(featured)}
        >
          <img
            src={featured.images?.[0]}
            alt={featured.title}
            className={styles.featuredImg}
          />

          <div className={styles.featuredContent}>
            <p className={styles.newsCategory}>{featured.category}</p>
            <h3 className={styles.featuredTitle}>{featured.title}</h3>
            <p className={styles.newsMeta}>{formatDate(featured.date)}</p>
            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
            <button className={styles.readBtn}>Read More</button>
          </div>
        </div>
      )}

      {/* GRID */}
      <div className={styles.newsGrid}>
        {rest.map((item) => (
          <div
            key={item.id}
            className={styles.newsCard}
            onClick={() => setSelectedArticle(item)}
          >
            <img
              src={item.images?.[0]}
              alt={item.title}
              className={styles.cardImg}
            />

            <div className={styles.cardBody}>
              <p className={styles.newsCategory}>{item.category}</p>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              <p className={styles.newsMeta}>{formatDate(item.date)}</p>
              <p className={styles.cardExcerpt}>{item.excerpt}</p>
              <span className={styles.readMore}>Read More →</span>
            </div>
          </div>
        ))}
      </div>
      </div>

      <div className={styles.newsFooter}>
        <button className={styles.viewAllBtn}>View All News</button>
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

    </section>
  );
}