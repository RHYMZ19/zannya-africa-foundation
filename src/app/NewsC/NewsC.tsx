'use client';

import styles from './NewsC.module.css';
import Image from "next/image";
import Link from "next/link";
import { Timestamp } from "firebase/firestore";

// Define type for a single news item
export type NewsItem = {
  id: string;
  title: string;
  type: string;
  description: string;
  images?: string[];
  video?: string;
  timestamp?: Timestamp;
};

type NewsListProps = {
  news: NewsItem[];
  loading: boolean;
};

export default function NewsList({ news, loading }: NewsListProps) {
  return (
    <div className={styles.newslistcontainer}>
      {loading ? (
        <p>Loading...</p>
      ) : news.length === 0 ? (
        <p className={styles.nonews}>No news available.</p>
      ) : (
        (() => {
          // sort posts by timestamp (latest first)
          const sortedNews = [...news].sort((a, b) => {
            if (a.timestamp && b.timestamp) {
              return b.timestamp.toMillis() - a.timestamp.toMillis();
            }
            return 0;
          });

          // take only the latest one
          const latest = sortedNews[0];
          if (!latest) return null;

          return (
            <div key={latest.id} className={styles.card}>
              {latest.images && latest.images.length > 0 && (
                <Image
                  src={latest.images[0]}
                  alt={latest.title}
                  width={400}
                  height={220}
                  className={styles.cardImage}
                  style={{ cursor: 'pointer' }}
                />
              )}

              <div className={styles.cardContent}>
                <span className={styles.newstype}>{latest.type}</span>
                <h3 className={styles.headings}>{latest.title}</h3>
                <p>{latest.description}</p>

                {latest.video && (
                  <video controls className={styles.newsvideo}>
                    <source src={latest.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                {latest.timestamp && (
                  <small className={styles.newsdate}>
                    {latest.timestamp.toDate().toLocaleDateString()}
                  </small>
                )}

                <Link href={`/Newsp/${latest.id}`} className={styles.arrowButton}>
                  Read More
                </Link>
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}