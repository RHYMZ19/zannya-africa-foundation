'use client';

import styles from './NewsC.module.css';
import Image from "next/image";
import Link from "next/link";
import { Timestamp } from "firebase/firestore";

export type NewsItem = {
  id: string;
  title: string;
  type: string;
  description: string;
  images?: string[];
  video?: string;
  timestamp?: Timestamp | null;
};

type NewsListProps = {
  news: NewsItem[];
  loading: boolean;
};

export default function NewsList({ news, loading }: NewsListProps) {
  // Sort by timestamp if exists, otherwise newest first
  const sortedNews = [...news].sort((a, b) => {
    const aTime = a.timestamp?.toMillis() || 0;
    const bTime = b.timestamp?.toMillis() || 0;
    return bTime - aTime;
  });

  return (
    <div className={styles.newslistcontainer}>
      {loading ? (
        <p>Loading...</p>
      ) : sortedNews.length === 0 ? (
        <p className={styles.nonews}>No news available.</p>
      ) : (
        sortedNews.map((item) => (
          <div key={item.id} className={styles.card}>
            {item.images && item.images.length > 0 && (
              <Image
                src={item.images[0]}
                alt={item.title}
                width={400}
                height={220}
                className={styles.cardImage}
                style={{ cursor: 'pointer' }}
              />
            )}

            <div className={styles.cardContent}>
              <span className={styles.newstype}>{item.type}</span>
              <h3 className={styles.headings}>{item.title}</h3>
              <p>{item.description}</p>

              {item.video && (
                <video controls className={styles.newsvideo}>
                  <source src={item.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Display timestamp only if exists */}
              {item.timestamp ? (
                <small className={styles.newsdate}>
                  {item.timestamp.toDate().toLocaleDateString()}
                </small>
              ) : (
                <small className={styles.newsdate}>Just uploaded</small>
              )}

              <Link href={`/Newsp/${item.id}`} className={styles.arrowButton}>
                Read More
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}