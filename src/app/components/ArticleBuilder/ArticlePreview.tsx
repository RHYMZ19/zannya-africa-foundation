"use client";

import React from "react";
import Image from "next/image";
import styles from "./ArticlePreview.module.css";

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
      caption?: string;
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

type ArticlePreviewProps = {
  title: string;
  subtitle: string;
  category: string;
  bannerImage: string;
  author: {
    name: string;
    role: string;
    bio: string;
    image: string;
  };
  content: ContentBlock[];
  onClose: () => void;
  publicationDate: Date;
};

export default function ArticlePreview({
  title,
  subtitle,
  category,
  bannerImage,
  author,
  content,
  publicationDate,
  onClose,
}: ArticlePreviewProps) {
  return (
    <div className={styles.previewOverlay}>

      <div className={styles.previewContainer}>

        {/* ================= PREVIEW HEADER ================= */}

        <div className={styles.previewTopBar}>

          <strong>
            Article Preview
          </strong>

          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
          >
            ✕ Close Preview
          </button>

        </div>


        {/* ================= ARTICLE ================= */}

        <article className={styles.article}>

          {/* BANNER */}

          {bannerImage && (
            <div className={styles.bannerWrapper}>
              <Image
                src={bannerImage}
                alt={title || "Article banner"}
                width={1400}
                height={650}
                className={styles.banner}
              />
            </div>
          )}


          {/* CATEGORY */}

          {category && (
            <div className={styles.category}>
              {category}
            </div>
          )}


          {/* DATE */}

          

          <p className={styles.date}>
  {publicationDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}
</p>


          {/* TITLE */}

          <h1 className={styles.title}>
            {title || "Article Title"}
          </h1>


          {/* SUBTITLE */}

          {subtitle && (
            <p className={styles.subtitle}>
              {subtitle}
            </p>
          )}


          {/* ================= AUTHOR ================= */}

          <div className={styles.authorHeader}>

            {author.image ? (
              <Image
                src={author.image}
                alt={author.name || "Author"}
                width={70}
                height={70}
                className={styles.authorImage}
              />
            ) : (
              <div className={styles.authorPlaceholder}>
                Author
              </div>
            )}

            <div>

              <h3>
                {author.name || "Author Name"}
              </h3>

              {author.role && (
                <p>
                  {author.role}
                </p>
              )}

              <span>
                Published August 10, 2026
              </span>

            </div>

          </div>


          {/* ================= MAIN CONTENT ================= */}

          <div className={styles.articleContent}>

            {content.map((block) => {

              /* PARAGRAPH */

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


              /* HEADING */

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


              /* IMAGE */

              if (block.type === "image") {
                return (
                  <figure
                    key={block.id}
                    className={styles.articleImage}
                  >

                    <Image
                      src={block.url}
                      alt={block.caption || "Article image"}
                      width={1200}
                      height={700}
                    />

                    {block.caption && (
                      <figcaption>
                        {block.caption}
                      </figcaption>
                    )}

                  </figure>
                );
              }


              /* QUOTE */

              if (block.type === "quote") {
                return (
                  <blockquote
                    key={block.id}
                    className={styles.quote}
                  >
                    “{block.text}”
                  </blockquote>
                );
              }


              /* STATISTIC */

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


              /* DIVIDER */

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

            {author.image && (
              <Image
                src={author.image}
                alt={author.name || "Author"}
                width={150}
                height={150}
                className={styles.authorCardImage}
              />
            )}

            <div>

              <p className={styles.authorLabel}>
                ABOUT THE AUTHOR
              </p>

              <h2>
                {author.name || "Author Name"}
              </h2>

              {author.role && (
                <h4>
                  {author.role}
                </h4>
              )}

              {author.bio && (
                <p>
                  {author.bio}
                </p>
              )}

            </div>

          </section>


          {/* ================= RELATED ARTICLES ================= */}

          <section className={styles.related}>

            <h2>
              Related Articles
            </h2>

            <div className={styles.relatedGrid}>

              <div>
                Article 1
              </div>

              <div>
                Article 2
              </div>

              <div>
                Article 3
              </div>

            </div>

          </section>

        </article>

      </div>

    </div>
  );
}