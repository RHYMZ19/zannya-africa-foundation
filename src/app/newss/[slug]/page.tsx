import {
  collection,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import styles from "./NewsArticle.module.css";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

type RelatedArticle = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  bannerImage: string;
  category?: string | null;
  publishedAt?: {
    seconds: number;
    nanoseconds: number;
  } | null;
};

function formatDate(
  timestamp?: {
    seconds: number;
    nanoseconds: number;
  } | null
) {
  if (!timestamp) return "";

  return new Date(timestamp.seconds * 1000).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  /* ================= FIND ARTICLE ================= */

  const articlesQuery = query(
    collection(db, "more news"),
    where("slug", "==", slug),
    where("status", "==", "published"),
    limit(1)
  );

  const snapshot = await getDocs(articlesQuery);

  if (snapshot.empty) {
    notFound();
  }

  const document = snapshot.docs[0];

  const data = document.data();

  const article: Article = {
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

    content: Array.isArray(data.content)
      ? data.content
      : [],

    publishedAt: data.publishedAt || null,

    status: data.status || "",
  };

  /* ================= RELATED ARTICLES ================= */

  const relatedQuery = query(
    collection(db, "more news"),
    where("status", "==", "published"),
    limit(4)
  );

  const relatedSnapshot = await getDocs(relatedQuery);

  const relatedArticles: RelatedArticle[] =
    relatedSnapshot.docs
      .map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          title: data.title || "",
          slug: data.slug || "",
          subtitle: data.subtitle || "",
          bannerImage: data.bannerImage || "",
          category: data.category || null,
          publishedAt: data.publishedAt || null,
        };
      })
      .filter(
        (related) => related.slug !== article.slug
      )
      .slice(0, 3);

  /* ================= PAGE ================= */

  return (
    <main className={styles.page}>

      {/* ================= NAVBAR ================= */}

      <nav className={styles.navbar}>

        <Link href="/" className={styles.logoArea}>

          <Image
            src="/log.jpg"
            alt="Zannya Africa Foundation"
            width={55}
            height={55}
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

          <Link href="/weekly-newsletter">
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


      {/* ================= HERO / BANNER ================= */}

      <section className={styles.hero}>

        {article.bannerImage && (

          <Image
            src={article.bannerImage}
            alt={article.title}
            fill
            priority
            className={styles.bannerImage}
          />

        )}

        <div className={styles.heroOverlay}></div>

      </section>


      {/* ================= ARTICLE HEADER ================= */}

      <article className={styles.article}>

        <div className={styles.articleHeader}>

          {article.category && (

            <div className={styles.category}>
              {article.category}
            </div>

          )}


          <p className={styles.date}>
            {formatDate(article.publishedAt)}
          </p>


          <h1 className={styles.title}>
            {article.title}
          </h1>


          {article.subtitle && (

            <p className={styles.subtitle}>
              {article.subtitle}
            </p>

          )}


          {/* ================= AUTHOR BYLINE ================= */}

          <div className={styles.authorByline}>

            {article.author.image ? (

              <Image
                src={article.author.image}
                alt={article.author.name}
                width={70}
                height={70}
                className={styles.authorSmallImage}
              />

            ) : (

              <div className={styles.authorPlaceholder}>
                {article.author.name
                  ? article.author.name.charAt(0)
                  : "A"}
              </div>

            )}


            <div className={styles.authorBylineInfo}>

              <strong>
                {article.author.name}
              </strong>

              {article.author.role && (

                <span>
                  {article.author.role}
                </span>

              )}

              <small>
                Published {formatDate(article.publishedAt)}
              </small>

            </div>

          </div>

        </div>


        {/* ================= MAIN ARTICLE CONTENT ================= */}

        <div className={styles.articleContent}>

          {article.content.map((block) => {

            /* ---------- PARAGRAPH ---------- */

            if (block.type === "paragraph") {

              return (
                <p
                  key={block.id}
                  className={styles.paragraph}
                >
                  {block.text}
                </p>
              );

            }


            /* ---------- HEADING ---------- */

            if (block.type === "heading") {

              return (
                <h2
                  key={block.id}
                  className={styles.contentHeading}
                >
                  {block.text}
                </h2>
              );

            }


            /* ---------- IMAGE ---------- */

            if (block.type === "image") {

              return (
                <figure
                  key={block.id}
                  className={styles.articleImageBlock}
                >

                  <Image
                    src={block.url}
                    alt={
                      block.caption ||
                      article.title
                    }
                    width={1200}
                    height={700}
                    className={styles.articleImage}
                  />

                  {block.caption && (

                    <figcaption
                      className={styles.imageCaption}
                    >
                      {block.caption}
                    </figcaption>

                  )}

                </figure>
              );

            }


            /* ---------- QUOTE ---------- */

            if (block.type === "quote") {

              return (
                <blockquote
                  key={block.id}
                  className={styles.quote}
                >
                  <span className={styles.quoteMark}>
                    “
                  </span>

                  <p>
                    {block.text}
                  </p>

                </blockquote>
              );

            }


            /* ---------- STATISTIC ---------- */

            if (block.type === "statistic") {

              return (
                <div
                  key={block.id}
                  className={styles.statistic}
                >

                  <strong>
                    {block.number}
                  </strong>

                  <span>
                    {block.label}
                  </span>

                </div>
              );

            }


            /* ---------- DIVIDER ---------- */

            if (block.type === "divider") {

              return (
                <hr
                  key={block.id}
                  className={styles.divider}
                />
              );

            }

            return null;
          })}

        </div>


        {/* ================= AUTHOR CARD ================= */}

        <section className={styles.authorCard}>

          <div className={styles.authorCardImage}>

            {article.author.image ? (

              <Image
                src={article.author.image}
                alt={article.author.name}
                width={180}
                height={180}
              />

            ) : (

              <div className={styles.largeAuthorPlaceholder}>
                {article.author.name
                  ? article.author.name.charAt(0)
                  : "A"}
              </div>

            )}

          </div>


          <div className={styles.authorCardInfo}>

            <p className={styles.authorLabel}>
              ABOUT THE AUTHOR
            </p>

            <h2>
              {article.author.name}
            </h2>

            {article.author.role && (

              <p className={styles.authorRole}>
                {article.author.role}
              </p>

            )}

            {article.author.bio && (

              <p className={styles.authorBio}>
                {article.author.bio}
              </p>

            )}

          </div>

        </section>


        {/* ================= RELATED ARTICLES ================= */}

        {relatedArticles.length > 0 && (

          <section className={styles.related}>

            <div className={styles.relatedHeader}>

              <h2>
                Related Articles
              </h2>

              <Link href="/weekly-newsletter">
                View all articles →
              </Link>

            </div>


            <div className={styles.relatedGrid}>

              {relatedArticles.map((related) => (

                <Link
                  key={related.id}
                  href={`/more news/${related.slug}`}
                  className={styles.relatedCard}
                >

                  <div className={styles.relatedImage}>

                    {related.bannerImage && (

                      <Image
                        src={related.bannerImage}
                        alt={related.title}
                        fill
                      />

                    )}

                  </div>


                  <div className={styles.relatedInfo}>

                    {related.category && (

                      <span className={styles.relatedCategory}>
                        {related.category}
                      </span>

                    )}

                    <h3>
                      {related.title}
                    </h3>

                    {related.subtitle && (

                      <p>
                        {related.subtitle}
                      </p>

                    )}

                    <small>
                      {formatDate(
                        related.publishedAt
                      )}
                    </small>

                  </div>

                </Link>

              ))}

            </div>

          </section>

        )}

      </article>


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
              Developed by{" "}
              <strong>
                SSENABULYA RAHIM
              </strong>
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