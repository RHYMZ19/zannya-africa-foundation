"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import styles from "./NewsListing.module.css";


type ContentBlock =
| {
id: string;
type: "paragraph";
text: string;
}
| {
id: string;
type: "heading";
text: string;
}
| {
id: string;
type: "image";
url: string;
caption: string;
}
| {
id: string;
type: "video";
url: string;
caption: string;
}
| {
id: string;
type: "quote";
text: string;
}
| {
id: string;
type: "statistic";
number: string;
label: string;
}
| {
id: string;
type: "divider";
};

type Article = {
id: string;
title: string;
slug: string;
subtitle: string;
category?: string | null;
bannerImage: string;

author: {
name: string;
role: string;
image: string;
bio: string;
};

content: ContentBlock[];

publishedAt?: {
seconds: number;
nanoseconds: number;
} | null;

status: string;
};

export default function WeeklyNewsletterPage() {
const [articles, setArticles] = useState<Article[]>([]);
const [loading, setLoading] = useState(true);

/* ================= FETCH ARTICLES ================= */

useEffect(() => {
const fetchArticles = async () => {
try {
const snapshot = await getDocs(
collection(db, "more news")
);

    const articleList: Article[] = snapshot.docs.map((document) => {
      const data = document.data();

      return {
        id: document.id,
        title: data.title || "",
        slug: data.slug || "",
        subtitle: data.subtitle || "",
        category: data.category || null,
        bannerImage: data.bannerImage || "",

        author: {
          name: data.author?.name || "",
          role: data.author?.role || "",
          image: data.author?.image || "",
          bio: data.author?.bio || "",
        },

        content: data.content || [],

        publishedAt: data.publishedAt || null,

        status: data.status || "published",
      };
    });

    /* ================= ONLY PUBLISHED ARTICLES ================= */

    const publishedArticles = articleList.filter(
      (article) => article.status === "published"
    );

    /* ================= NEWEST FIRST ================= */

    publishedArticles.sort((a, b) => {
      const dateA = a.publishedAt?.seconds || 0;
      const dateB = b.publishedAt?.seconds || 0;

      return dateB - dateA;
    });

    setArticles(publishedArticles);
  } catch (error) {
    console.error("Error loading articles:", error);
  } finally {
    setLoading(false);
  }
};

fetchArticles();

}, []);

/* ================= FORMAT DATE ================= */

const formatDate = (
timestamp?: {
seconds: number;
nanoseconds: number;
} | null
) => {
if (!timestamp) {
return "";
}

const date = new Date(timestamp.seconds * 1000);

return date.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

};

/* ================= LOADING ================= */

if (loading) {
return (
<main className={styles.page}>
<div className={styles.loading}>
<p>Loading articles...</p>
</div>
</main>
);
}

/* ================= PAGE ================= */

return (
<main className={styles.page}>

  {/* ================= NAVBAR ================= */}

  <nav className={styles.navbar}>

    <Link href="/" className={styles.logoArea}>

      <img
        src="/log.jpg"
        alt="Zannya Africa Foundation"
        className={styles.logoImage}
      />

      <span className={styles.logoText}>
        Zannya Africa Foundation
      </span>

    </Link>


    <div className={styles.navLinks}>

      <Link href="/">
        Home
      </Link>

      <Link href="/Missions">
        Mission & Vision
      </Link>

      <Link
        href="/weekly-newsletter"
        className={styles.activeLink}
      >
        Articles
      </Link>

      <Link href="/Videos">
        Gallery
      </Link>

      <Link
        href="/Donates"
        className={styles.donateButton}
      >
        Donate
      </Link>

    </div>

  </nav>


  {/* ================= HERO ================= */}

  <section className={styles.hero}>

    <div className={styles.heroContent}>

      <p className={styles.heroLabel}>
        ZANNYA AFRICA FOUNDATION
      </p>

      <h1>
        Articles & Stories
      </h1>

      <p>
        Explore stories, insights, research and experiences
        from our work with communities across Africa.
      </p>

    </div>

  </section>


  {/* ================= ARTICLES ================= */}

  <section className={styles.articlesSection}>

    <div className={styles.sectionHeader}>

      <p className={styles.sectionLabel}>
        OUR STORIES
      </p>

      <h2>
        Latest Articles
      </h2>

      <p>
        Discover our latest stories, ideas and updates.
      </p>

    </div>


    {articles.length === 0 ? (

      <div className={styles.emptyState}>

        <h3>
          No articles available
        </h3>

        <p>
          New articles will appear here once they are published.
        </p>

      </div>

    ) : (

      <div className={styles.articleGrid}>

        {articles.map((article) => (

          <article
            key={article.id}
            className={styles.articleCard}
          >

            {/* ================= BANNER ================= */}

            {article.bannerImage && (

              <Link
                href={`/more news/${article.slug}`}
                className={styles.imageLink}
              >

                <div className={styles.imageContainer}>

                  <img
                    src={article.bannerImage}
                    alt={article.title}
                    className={styles.articleImage}
                  />

                </div>

              </Link>

            )}


            {/* ================= ARTICLE INFO ================= */}

            <div className={styles.articleContent}>

              {/* CATEGORY + DATE */}

              <div className={styles.meta}>

                {article.category && (

                  <span className={styles.category}>
                    {article.category}
                  </span>

                )}

                {article.publishedAt && (

                  <span className={styles.date}>
                    {formatDate(article.publishedAt)}
                  </span>

                )}

              </div>


              {/* TITLE */}

              <h3 className={styles.articleTitle}>

                <Link
                  href={`/articles/${article.slug}`}
                >
                  {article.title}
                </Link>

              </h3>


              {/* SUBTITLE */}

              {article.subtitle && (

                <p className={styles.subtitle}>
                  {article.subtitle}
                </p>

              )}


              {/* AUTHOR */}

              <div className={styles.author}>

                {article.author.image ? (

                  <img
                    src={article.author.image}
                    alt={article.author.name}
                    className={styles.authorImage}
                  />

                ) : (

                  <div className={styles.authorPlaceholder}>
                    {article.author.name
                      ? article.author.name.charAt(0).toUpperCase()
                      : "A"}
                  </div>

                )}


                <div className={styles.authorInfo}>

                  <strong>
                    {article.author.name || "Zannya Africa Foundation"}
                  </strong>

                  {article.author.role && (

                    <span>
                      {article.author.role}
                    </span>

                  )}

                </div>

              </div>


              {/* READ ARTICLE */}

              <Link
                href={`/articles/${article.slug}`}
                className={styles.readMore}
              >
                Read Article
                <span>→</span>
              </Link>

            </div>

          </article>

        ))}

      </div>

    )}

  </section>


  {/* ================= FOOTER ================= */}

  <footer className={styles.footer}>

    <div className={styles.footerTop}>

      <a href="mailto:info@zannyaafricafoundation.org">
        📧 info@zannyaafricafoundation.org
      </a>

      <span>|</span>

      <Link href="/Terms">
        Privacy Policy & Legal Terms
      </Link>

      <span>|</span>

      <Link href="/adminpannel">
        Admin Panel
      </Link>

    </div>


    <div className={styles.footerBottom}>

      <p>
        © {new Date().getFullYear()} Zannya Africa Foundation.
        All Rights Reserved.
      </p>

      <div className={styles.footerDeveloper}>

        <span>
          Developed by <strong>SSENABULYA RAHIM</strong>
        </span>

        <span>|</span>

        <a href="tel:+256743878261">
          0743878261
        </a>

        <span>|</span>

        <a href="mailto:rahimssenabulya82@gmail.com">
          rahimssenabulya82@gmail.com
        </a>

      </div>

    </div>

  </footer>

</main>

);
}