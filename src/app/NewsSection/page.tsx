'use client'

import React, { JSX, useMemo, useState } from "react";
import styles from "./NewsSection.module.css";

type NewsItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string;
};

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Zannya Africa Launches New Youth Sports Program",
    category: "News",
    date: "April 26, 2026",
    author: "Admin",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "A new youth sports initiative has been launched to empower young people through teamwork, leadership, and active participation.",
    content:
      "Zannya Africa Foundation has officially launched a new youth sports initiative aimed at empowering young people through leadership, teamwork, and active participation. The program focuses on creating safe spaces where youth can build confidence, improve discipline, and strengthen social connections through sports. This initiative will be implemented in schools and communities across Uganda.",
  },
  {
    id: 2,
    title: "Community Clean-Up Campaign Held in Kampala",
    category: "Events",
    date: "April 20, 2026",
    author: "Team ZAF",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Residents and volunteers joined hands in a successful clean-up campaign promoting environmental responsibility.",
    content:
      "Residents and volunteers joined hands in a successful clean-up campaign promoting environmental responsibility. The campaign focused on waste collection, public awareness, and community engagement to encourage sustainable environmental habits.",
  },
  {
    id: 3,
    title: "New Education Support Program Announced",
    category: "Announcements",
    date: "April 18, 2026",
    author: "Programs Office",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "The foundation has introduced a new education support initiative for vulnerable children.",
    content:
      "The education support initiative will provide school materials, mentorship, and community learning opportunities for vulnerable children in underserved communities.",
  },
  {
    id: 4,
    title: "ZAF Partners with Local Schools for Sports",
    category: "Blogs",
    date: "April 15, 2026",
    author: "Communications",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Partnerships with local schools aim to strengthen youth participation in sports and life skills.",
    content:
      "ZAF has partnered with local schools to strengthen youth participation in sports and life skills. These partnerships will improve access to structured sports activities and mentorship.",
  },
  {
    id: 5,
    title: "Girls in Leadership Workshop Inspires Young Minds",
    category: "News",
    date: "April 10, 2026",
    author: "Admin",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Young girls participated in a leadership workshop focused on confidence and future planning.",
    content:
      "The workshop brought together young girls from different communities to learn leadership, confidence building, and future planning skills.",
  },
];

const categories: string[] = ["All", "News", "Events", "Announcements", "Blogs"];

export default function NewsSection(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  const filteredNews = useMemo(() => {
    return newsData.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const featured = filteredNews[0];
  const rest = filteredNews.slice(1);

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

            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className={styles.articleImage}
            />

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
                  src={item.image}
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
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

      {featured && (
        <div
          className={styles.featuredNews}
          onClick={() => setSelectedArticle(featured)}
        >
          <img
            src={featured.image}
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

      <div className={styles.newsGrid}>
        {rest.map((item) => (
          <div
            key={item.id}
            className={styles.newsCard}
            onClick={() => setSelectedArticle(item)}
          >
            <img src={item.image} alt={item.title} className={styles.cardImg} />

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