'use client'

import React, { JSX, useMemo, useState, useEffect } from "react";
import styles from "./NewsSection.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

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
              {selectedArticle.date} • By {selectedArticle.author}
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
                  <span className={styles.sidebarDate}>{item.date}</span>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    );
  }

  // ================= LIST VIEW =================
  return (
    <section className={styles.newsPage}>
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
            <p className={styles.newsMeta}>{featured.date}</p>
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
              <p className={styles.newsMeta}>{item.date}</p>
              <p className={styles.cardExcerpt}>{item.excerpt}</p>
              <span className={styles.readMore}>Read More →</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.newsFooter}>
        <button className={styles.viewAllBtn}>View All News</button>
      </div>
    </section>
  );
}