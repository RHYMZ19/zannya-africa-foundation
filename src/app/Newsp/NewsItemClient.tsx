'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "../lib/firebase";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import CommentList from "./CommentList";
import { getGuestId, getGuestName } from "./getGuestId";
import styles from './Newsp.module.css';
import { NewsItem } from "./NewsList";
import Link from "next/link";

interface Props {
  newsItem: NewsItem;
}

export default function NewsItemClient({ newsItem }: Props) {
  const [SelectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Initialize AOS once
    AOS.init({ duration: 800, once: true, easing: 'ease-in-out', anchorPlacement: 'top-bottom' });
  }, []);

  const { id, title, type, description, moreDetails, images, video, timestamp } = newsItem;

  return (
    <div className={styles.newsrow}>
      <div className={styles.newscard} data-aos="fade-up">
        {images?.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={title}
            className={styles.newsimage}
            onClick={() => setSelectedImage(img)}
            style={{ cursor: 'pointer' }}
          />
        ))}

        <div className={styles.newscontent}>
          <span className={`${styles.newstype} ${type.toLowerCase()}`}>{type}</span>
          <h3 className={styles.newstitle}>{title}</h3>
          <p className={styles.newsdescription}>{description}</p>
          {video && <video controls className={styles.newsvideo}><source src={video} type="video/mp4" /></video>}
          {timestamp && <small className={styles.newsdate}>{new Date(timestamp).toLocaleDateString()}</small>}
        </div>

        <div className={styles.actions}>
          <LikeButton newsId={id} />
          <ShareButton title={title} url={typeof window !== "undefined" ? window.location.href : ""} />
          <form onSubmit={async e => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form.elements.namedItem("comment") as HTMLInputElement;
            if (!input.value.trim()) return;

            await addDoc(collection(db, "newsUpdates", id, "comments"), {
              text: input.value,
              userId: getGuestId(),
              userName: getGuestName(),
              timestamp: serverTimestamp(),
            });
            input.value = "";
          }}>
            <input type="text" name="comment" placeholder="Write a comment..." />
            <button type="submit">Post</button>
          </form>
          <CommentList newsId={id} />
        </div>
      </div>

      {moreDetails && (
        <div className={styles.moredetailscard} data-aos="fade-up">
          <h4>More Details</h4>
          <p>{moreDetails}</p>
        </div>
      )}

      {SelectedImage && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 9999
        }} onClick={() => setSelectedImage(null)}>
          <Image src={SelectedImage} alt="Enlarged" style={{ maxHeight: '90%', maxWidth: '90%', borderRadius: '10px' }} />
        </div>
      )}
    </div>
  );
}