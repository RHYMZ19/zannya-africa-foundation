import {
  collection,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";

import { notFound } from "next/navigation";

import { firestore } from "../../lib/firebase";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import styles from "./page.module.css";

/* =========================================================
   NEWS TYPE
========================================================= */

type Author = {
  name?: string;
  role?: string;
  image?: string;
};

type NewsItem = {
  id: string;

  title: string;

  slug: string;

  category?: string;

  description?: string;

  bannerImage?: string;

  author?: Author;

  publishedAt?: any;

  status?: string;
};

/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date: any): string {
  if (!date) {
    return "";
  }

  try {
    /* Firestore Timestamp */

    if (date?.seconds) {
      return new Date(date.seconds * 1000).toLocaleDateString(
        "en-GB",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );
    }

    /* JavaScript Date */

    if (date instanceof Date) {
      return date.toLocaleDateString(
        "en-GB",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );
    }

    /* String date */

    if (typeof date === "string") {
      const parsedDate = new Date(date);

      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString(
          "en-GB",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );
      }
    }
  } catch (error) {
    console.error(
      "Date formatting error:",
      error
    );
  }

  return "";
}

/* =========================================================
   GET NEWS BY SLUG
========================================================= */

async function getNewsBySlug(
  slug: string
): Promise<NewsItem | null> {
  try {
    const newsQuery = query(
      collection(firestore, "newsUpdates"),
      where("slug", "==", slug),
      limit(1)
    );

    const snapshot = await getDocs(
      newsQuery
    );

    if (snapshot.empty) {
      return null;
    }

    const document = snapshot.docs[0];

    const data = document.data();

    return {
      id: document.id,

      title: data.title || "",

      slug: data.slug || "",

      category: data.category || "",

      description:
        data.description || "",

      bannerImage:
        data.bannerImage || "",

      author: {
        name:
          data.author?.name || "",

        role:
          data.author?.role || "",

        image:
          data.author?.image || "",
      },

      publishedAt:
        data.publishedAt || null,

      status:
        data.status || "",
    };
  } catch (error) {
    console.error(
      "Error loading news:",
      error
    );

    return null;
  }
}

/* =========================================================
   GET RELATED NEWS
========================================================= */

async function getRelatedNews(
  currentId: string,
  currentCategory?: string
): Promise<NewsItem[]> {
  try {
    const snapshot = await getDocs(
      collection(
        firestore,
        "newsUpdates"
      )
    );

    const allNews: NewsItem[] =
      snapshot.docs.map(
        (document) => {
          const data =
            document.data();

          return {
            id: document.id,

            title:
              data.title || "",

            slug:
              data.slug || "",

            category:
              data.category || "",

            description:
              data.description || "",

            bannerImage:
              data.bannerImage || "",

            author: {
              name:
                data.author?.name ||
                "",

              role:
                data.author?.role ||
                "",

              image:
                data.author?.image ||
                "",
            },

            publishedAt:
              data.publishedAt ||
              null,

            status:
              data.status || "",
          };
        }
      );

    /* Remove current article */

    const otherNews =
      allNews.filter(
        (item) =>
          item.id !== currentId &&
          item.slug &&
          item.status === "published"
      );

    /* Same category first */

    const sameCategory =
      currentCategory
        ? otherNews.filter(
            (item) =>
              item.category ===
              currentCategory
          )
        : [];

    /* Other categories */

    const differentCategory =
      otherNews.filter(
        (item) =>
          item.category !==
          currentCategory
      );

    /* Return maximum 3 */

    return [
      ...sameCategory,
      ...differentCategory,
    ].slice(0, 3);
  } catch (error) {
    console.error(
      "Error loading related news:",
      error
    );

    return [];
  }
}

/* =========================================================
   PAGE
========================================================= */

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  /* =======================================================
     FIND ARTICLE
  ======================================================= */

  const news =
    await getNewsBySlug(slug);

  /*
   * If article does not exist,
   * show Next.js 404 page.
   */

  if (!news) {
    notFound();
  }

  /* =======================================================
     RELATED NEWS
  ======================================================= */

  const relatedNews =
    await getRelatedNews(
      news.id,
      news.category
    );

  /* =======================================================
     PUBLICATION DATE
  ======================================================= */

  const publicationDate =
    news.publishedAt || null;

  /* =======================================================
     AUTHOR INFORMATION
  ======================================================= */

  const authorName =
    news.author?.name || "";

  const authorRole =
    news.author?.role || "";

  const authorImage =
    news.author?.image || "";

  /* =======================================================
     ARTICLE CONTENT
  ======================================================= */

  const articleContent =
    news.description || "";

  /* =======================================================
     RETURN PAGE
  ======================================================= */

  return (
    <main className={styles.page}>

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />

      {/* =================================================
          ARTICLE BANNER
      ================================================= */}

      <section
        className={styles.articleHero}
      >

        {news.bannerImage ? (

          <img
            src={news.bannerImage}
            alt={news.title}
            className={
              styles.bannerImage
            }
          />

        ) : (

          <div
            className={
              styles.noBanner
            }
          >
            Zannya Africa Foundation
          </div>

        )}

      </section>

      {/* =================================================
          ARTICLE CONTAINER
      ================================================= */}

      <div
        className={
          styles.articleContainer
        }
      >

        {/* =================================================
            MAIN ARTICLE
        ================================================= */}

        <article
          className={styles.article}
        >

          {/* CATEGORY */}

          {news.category && (

            <div
              className={
                styles.category
              }
            >
              {news.category}
            </div>

          )}

          {/* TITLE */}

          <h1
            className={styles.title}
          >
            {news.title}
          </h1>

          {/* DESCRIPTION / INTRODUCTION */}

          {articleContent && (

            <div
              className={
                styles.content
              }
            >

              {articleContent
                .split(/\n\s*\n/)
                .map(
                  (
                    paragraph,
                    index
                  ) => {

                    if (
                      !paragraph.trim()
                    ) {
                      return null;
                    }

                    return (
                      <p
                        key={index}
                      >
                        {paragraph.trim()}
                      </p>
                    );
                  }
                )}

            </div>

          )}

          {/* =================================================
              META
          ================================================= */}

          <div
            className={styles.meta}
          >

            {publicationDate && (

              <span>
                📅{" "}
                {formatDate(
                  publicationDate
                )}
              </span>

            )}

            {authorName && (

              <span>
                By {authorName}
              </span>

            )}

          </div>

          {/* =================================================
              AUTHOR
          ================================================= */}

          {authorName && (

            <div
              className={
                styles.authorSection
              }
            >

              {authorImage ? (

                <img
                  src={authorImage}
                  alt={authorName}
                  className={
                    styles.authorImage
                  }
                />

              ) : (

                <div
                  className={
                    styles.authorPlaceholder
                  }
                >
                  {authorName
                    .charAt(0)
                    .toUpperCase()}
                </div>

              )}

              <div>

                <p
                  className={
                    styles.authorLabel
                  }
                >
                  Written by
                </p>

                <h3
                  className={
                    styles.authorName
                  }
                >
                  {authorName}
                </h3>

                {authorRole && (

                  <p
                    style={{
                      margin:
                        "4px 0 0",
                      color:
                        "#777",
                      fontSize:
                        "14px",
                    }}
                  >
                    {authorRole}
                  </p>

                )}

              </div>

            </div>

          )}

        </article>

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside
          className={styles.sidebar}
        >

          <h2
            className={
              styles.sidebarTitle
            }
          >
            Related News
          </h2>

          {relatedNews.length >
          0 ? (

            relatedNews.map(
              (item) => {

                return (

                  <a
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className={
                      styles.relatedCard
                    }
                  >

                    {/* IMAGE */}

                    {item.bannerImage && (

                      <img
                        src={
                          item.bannerImage
                        }
                        alt={
                          item.title
                        }
                        className={
                          styles.relatedImage
                        }
                      />

                    )}

                    {/* CONTENT */}

                    <div
                      className={
                        styles.relatedContent
                      }
                    >

                      {item.category && (

                        <span
                          className={
                            styles.relatedCategory
                          }
                        >
                          {
                            item.category
                          }
                        </span>

                      )}

                      <h3
                        className={
                          styles.relatedTitle
                        }
                      >
                        {item.title}
                      </h3>

                      <span
                        className={
                          styles.relatedDate
                        }
                      >
                        {formatDate(
                          item.publishedAt
                        )}
                      </span>

                    </div>

                  </a>

                );
              }
            )

          ) : (

            <p
              className={
                styles.noRelated
              }
            >
              No related news
              available.
            </p>

          )}

        </aside>

      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </main>
  );
}