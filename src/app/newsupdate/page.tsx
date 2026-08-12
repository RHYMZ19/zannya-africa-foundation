import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { firestore } from "../lib/firebase";

import Link from "next/link";

import styles from "./NewsListing.module.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* =====================================================
   NEWS TYPE
===================================================== */

type NewsItem = {
  id: string;

  title: string;

  slug: string;

  category?: string;

  description: string;

  bannerImage: string;

  author?: {
    name: string;
    role: string;
    image: string;
  };

  publishedAt?: {
    seconds: number;
    nanoseconds: number;
  } | null;

  status?: string;
};

/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(
  timestamp?: NewsItem["publishedAt"]
) {
  if (!timestamp) {
    return "";
  }

  try {
    const date = new Date(
      timestamp.seconds * 1000
    );

    return date.toLocaleDateString(
      "en-GB",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  } catch (error) {
    console.error(
      "Date formatting error:",
      error
    );

    return "";
  }
}

/* =====================================================
   NEWS LISTING PAGE
===================================================== */

export default async function NewsPage() {
  /* =====================================================
     GET PUBLISHED NEWS
  ===================================================== */

  let news: NewsItem[] = [];

  try {
    const newsQuery = query(
      collection(
        firestore,
        "newsUpdates"
      ),

      orderBy(
        "publishedAt",
        "desc"
      )
    );

    const snapshot =
      await getDocs(newsQuery);

    news = snapshot.docs

      .map((document) => {
        const data =
          document.data();

        return {
          id: document.id,

          title:
            typeof data.title ===
            "string"
              ? data.title
              : "",

          slug:
            typeof data.slug ===
            "string"
              ? data.slug
              : "",

          category:
            typeof data.category ===
            "string"
              ? data.category
              : "",

          description:
            typeof data.description ===
            "string"
              ? data.description
              : "",

          bannerImage:
            typeof data.bannerImage ===
            "string"
              ? data.bannerImage
              : "",

          author:
            data.author &&
            typeof data.author ===
              "object"
              ? {
                  name:
                    typeof data.author
                      .name === "string"
                      ? data.author.name
                      : "",

                  role:
                    typeof data.author
                      .role === "string"
                      ? data.author.role
                      : "",

                  image:
                    typeof data.author
                      .image === "string"
                      ? data.author.image
                      : "",
                }
              : undefined,

          publishedAt:
            data.publishedAt &&
            typeof data.publishedAt
              .seconds === "number"
              ? {
                  seconds:
                    data.publishedAt
                      .seconds,

                  nanoseconds:
                    data.publishedAt
                      .nanoseconds || 0,
                }
              : null,

          status:
            typeof data.status ===
            "string"
              ? data.status
              : "",
        };
      })

      /* =================================================
         ONLY PUBLISHED ARTICLES
      ================================================= */

      .filter(
        (article) =>
          article.status ===
            "published" &&
          article.slug &&
          article.title
      );
  } catch (error) {
    console.error(
      "Error loading news:",
      error
    );
  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className={styles.page}>

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />


      {/* =================================================
          HEADER
      ================================================= */}

      <section
        className={styles.header}
      >

        <p
          className={
            styles.eyebrow
          }
        >
          Zannya Africa Foundation
        </p>


        <h1>
          News & Updates
        </h1>


        <p
          className={
            styles.introduction
          }
        >
          Read the latest news,
          stories, activities and
          updates from Zannya Africa
          Foundation.
        </p>

      </section>


      {/* =================================================
          NEWS SECTION
      ================================================= */}

      <section
        className={
          styles.newsSection
        }
      >

        {news.length === 0 ? (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div
            className={
              styles.emptyState
            }
          >

            <h2>
              No news articles
              available
            </h2>

            <p>
              New stories and updates
              will appear here soon.
            </p>

          </div>

        ) : (

          /* =================================================
             NEWS GRID
          ================================================= */

          <div
            className={
              styles.newsGrid
            }
          >

            {news.map((item) => (

              <article
                key={item.id}
                className={
                  styles.card
                }
              >

                {/* =================================================
                    IMAGE
                ================================================= */}

                {item.bannerImage && (

                  <Link
                    href={`/news/${item.slug}`}
                    className={
                      styles.imageLink
                    }
                  >

                    <img
                      src={
                        item.bannerImage
                      }
                      alt={
                        item.title
                      }
                      className={
                        styles.image
                      }
                    />

                  </Link>

                )}


                {/* =================================================
                    CARD CONTENT
                ================================================= */}

                <div
                  className={
                    styles.cardContent
                  }
                >

                  {/* CATEGORY */}

                  {item.category && (

                    <span
                      className={
                        styles.category
                      }
                    >
                      {item.category}
                    </span>

                  )}


                  {/* DATE */}

                  {item.publishedAt && (

                    <p
                      className={
                        styles.date
                      }
                    >
                      {formatDate(
                        item.publishedAt
                      )}
                    </p>

                  )}


                  {/* TITLE */}

                  <h2>

                    <Link
                      href={`/news/${item.slug}`}
                      className={
                        styles.titleLink
                      }
                    >
                      {item.title}
                    </Link>

                  </h2>


                  {/* DESCRIPTION */}

                  {item.description && (

                    <p
                      className={
                        styles.description
                      }
                    >

                      {item.description
                        .replace(
                          /\s+/g,
                          " "
                        )
                        .slice(
                          0,
                          180
                        )}

                      {item.description
                        .length > 180 &&
                        "..."}

                    </p>

                  )}


                  {/* =================================================
                      AUTHOR
                  ================================================= */}

                  {item.author &&
                    item.author.name && (

                    <div
                      className={
                        styles.author
                      }
                    >

                      {item.author
                        .image && (

                        <img
                          src={
                            item.author
                              .image
                          }
                          alt={
                            item.author
                              .name
                          }
                          className={
                            styles.authorImage
                          }
                        />

                      )}


                      <div>

                        <strong>
                          {
                            item.author
                              .name
                          }
                        </strong>


                        {item.author
                          .role && (

                          <span>
                            {
                              item.author
                                .role
                            }
                          </span>

                        )}

                      </div>

                    </div>

                  )}


                  {/* =================================================
                      READ MORE
                  ================================================= */}

                  <Link
                    href={`/news/${item.slug}`}
                    className={
                      styles.readMore
                    }
                  >

                    Read Full Story

                    <span>
                      →
                    </span>

                  </Link>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </main>
  );
}