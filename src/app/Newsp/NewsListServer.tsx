// app/Newsp/NewsListServer.tsx
import Image from "next/image";
import { NewsItem } from "./types"; // reuse type
import styles from "./Newsp.module.css";

export default function NewsListServer({ news, setSelectedImage }: { news: NewsItem[], setSelectedImage: (img: string) => void }) {
  return (
    <div className={styles.newslistcontainer}>
      {news.length === 0 ? (
        <p className={styles.nonews}>No news available.</p>
      ) : (
        news.map(({ id, title, type, description, moreDetails, images, video, timestamp }) => (
          <div key={id} className={styles.newsrow}>
            <div className={styles.newscard}>
              {images?.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={title}
                  className={styles.newsimage}
                  onClick={() => setSelectedImage(img)}
                  style={{ cursor: 'pointer' }}
                  width={600}
                  height={400}
                />
              ))}

              <div className={styles.newscontent}>
                <span className={styles.newstype}>{type}</span>
                <h3 className={styles.newstitle}>{title}</h3>
                <p className={styles.newsdescription}>{description}</p>
                {video && (
                  <video controls className={styles.newsvideo}>
                    <source src={video} type="video/mp4" />
                  </video>
                )}
                {timestamp && (
                  <small className={styles.newsdate}>{new Date(timestamp).toLocaleDateString()}</small>
                )}
              </div>

              {moreDetails && (
                <div className={styles.moredetailscard}>
                  <h4>More Details</h4>
                  <p>{moreDetails}</p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}