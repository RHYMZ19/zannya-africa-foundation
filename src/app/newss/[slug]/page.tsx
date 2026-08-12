import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import { notFound } from "next/navigation";

import { firestore } from "../../lib/firebase";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import styles from "./NewsArticle.module.css";

export const dynamic = "force-dynamic";

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

function formatDate(date: any): string {
  if (!date) {
    return "";
  }

  try {
    if (
      typeof date.seconds ===
      "number"
    ) {
      return new Date(
        date.seconds * 1000
      ).toLocaleDateString(
        "en-GB",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );
    }

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

    if (
      typeof date ===
      "string"
    ) {
      const parsedDate =
        new Date(date);

      if (
        !isNaN(
          parsedDate.getTime()
        )
      ) {
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

async function getNewsBySlug(
  slug: string
): Promise<NewsItem | null> {
  try {
    const newsQuery = query(
      collection(
        firestore,
        "newsUpdates"
      ),
      where(
        "slug",
        "==",
        slug
      ),
      where(
        "status",
        "==",
        "published"
      ),
      limit(1)
    );

    const snapshot =
      await getDocs(
        newsQuery
      );

    if (snapshot.empty) {
      return null;
    }

    const document =
      snapshot.docs[0];

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
  } catch (error) {
    console.error(
      "Error loading news:",
      error
    );

    return null;
  }
}

async function getRelatedNews(
  currentId: string,
  currentCategory?: string
): Promise<NewsItem[]> {
  try {
    const newsQuery =
      currentCategory
        ? query(
            collection(
              firestore,
              "newsUpdates"
            ),
            where(
              "status",
              "==",
              "published"
            ),
            where(
              "category",
              "==",
              currentCategory
            ),
            orderBy(
              "publishedAt",
              "desc"
            ),
            limit(4)
          )
        : query(
            collection(
              firestore,
              "newsUpdates"
            ),
            where(
              "status",
              "==",
              "published"
            ),
            orderBy(
              "publishedAt",
              "desc"
            ),
            limit(4)
          );

    const snapshot =
      await getDocs(
        newsQuery
      );

    const related =
      snapshot.docs
        .map(
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
                data.category ||
                "",

              description:
                data.description ||
                "",

              bannerImage:
                data.bannerImage ||
                "",

              author: {
                name:
                  data.author
                    ?.name || "",

                role:
                  data.author
                    ?.role || "",

                image:
                  data.author
                    ?.image || "",
              },

              publishedAt:
                data.publishedAt ||
                null,

              status:
                data.status || "",
            };
          }
        )
        .filter(
          (item) =>
            item.id !==
              currentId &&
            item.slug
        );

    if (
      related.length >=
      3
    ) {
      return related.slice(
        0,
        3
      );
    }

    const allPublishedQuery =
      query(
        collection(
          firestore,
          "newsUpdates"
        ),
        where(
          "status",
          "==",
          "published"
        ),
        orderBy(
          "publishedAt",
          "desc"
        ),
        limit(10)
      );

    const allSnapshot =
      await getDocs(
        allPublishedQuery
      );

    const additional =
      allSnapshot.docs
        .map(
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
                data.category ||
                "",

              description:
                data.description ||
                "",

              bannerImage:
                data.bannerImage ||
                "",

              author: {
                name:
                  data.author
                    ?.name || "",

                role:
                  data.author
                    ?.role || "",

                image:
                  data.author
                    ?.image || "",
              },

              publishedAt:
                data.publishedAt ||
                null,

              status:
                data.status || "",
            };
          }
        )
        .filter(
          (item) =>
            item.id !==
              currentId &&
            item.slug &&
            !related.some(
              (existing) =>
                existing.id ===
                item.id
            )
        );

    return [
      ...related,
      ...additional,
    ].slice(0, 3);
  } catch (error) {
    console.error(
      "Error loading related news:",
      error
    );

    return [];
  }
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } =
    await params;

  const news =
    await getNewsBySlug(
      slug
    );

  if (!news) {
    notFound();
  }

  const relatedNews =
    await getRelatedNews(
      news.id,
      news.category
    );

  const publicationDate =
    news.publishedAt ||
    null;

  const authorName =
    news.author?.name ||
    "";

  const authorRole =
    news.author?.role ||
    "";

  const authorImage =
    news.author?.image ||
    "";

  const articleContent =
    news.description || "";

  return (
    <main
      className={
        styles.page
      }
    >
      <Navbar />

      <section
        className={
          styles.articleHero
        }
      >
        {news.bannerImage ? (
          <img
            src={
              news.bannerImage
            }
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
            Zannya Africa
            Foundation
          </div>
        )}
      </section>

      <div
        className={
          styles.articleContainer
        }
      >
        <article
          className={
            styles.article
          }
        >
          {news.category && (
            <div
              className={
                styles.category
              }
            >
              {news.category}
            </div>
          )}

          <h1
            className={
              styles.title
            }
          >
            {news.title}
          </h1>

          {articleContent && (
            <div
              className={
                styles.content
              }
            >
              {articleContent
                .split(
                  /\n\s*\n/
                )
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
                        key={
                          index
                        }
                      >
                        {paragraph.trim()}
                      </p>
                    );
                  }
                )}
            </div>
          )}

          <div
            className={
              styles.meta
            }
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
                By{" "}
                {authorName}
              </span>
            )}
          </div>

          {authorName && (
            <div
              className={
                styles.authorSection
              }
            >
              {authorImage ? (
                <img
                  src={
                    authorImage
                  }
                  alt={
                    authorName
                  }
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

        <aside
          className={
            styles.sidebar
          }
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
              (item) => (
                <a
                  key={
                    item.id
                  }
                  href={`/news/${item.slug}`}
                  className={
                    styles.relatedCard
                  }
                >
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
              )
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

      <Footer />
    </main>
  );
}