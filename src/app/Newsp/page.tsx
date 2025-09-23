// app/Newsp/page.tsx
'use client'; // enable client-side hooks for onSnapshot

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import StickyBar from "../StickyBar/StickyBar";
import GetInvolved from "../GetInvolved/GetInvolved";
import Gallery from "../Gallery/Gallery";
import IncreaseIma from "./components/IncreaseIma";
import ContactUs from "../ContactUs/page";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import NewsItemClient from "./NewsItemClient";
import { FaFacebook, FaHome, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from './Newsp.module.css';
import Image from "next/image";

// Import SSR fetch
import { fetchNews, NewsItem } from "./NewsList";

interface Props {
  initialNews: NewsItem[];
}

export default function NewspPage({ initialNews }: Props) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);

  // Subscribe to Firestore updates for real-time news
  useEffect(() => {
    const q = query(collection(db, "newsUpdates"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate
          ? doc.data().timestamp.toDate().toISOString()
          : new Date().toISOString(),
      })) as NewsItem[];
      // Sort newest first (redundant if orderBy works, but safe)
    items.sort((a, b) => {
  const aTime = a.timestamp ? new Date(a.timestamp).getTime() : 0;
  const bTime = b.timestamp ? new Date(b.timestamp).getTime() : 0;
  return bTime - aTime;
});
      setNews(items);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Sticky Navbar */}
      <StickyBar>
        <FaHome style={{ width: '25%', height: '25%' }} color="black" />
        <GetInvolved />
        <Gallery />
        <IncreaseIma src='/log.jpg' alt="log" />
      </StickyBar>

      {/* Header */}
      <div className={styles.container}>
        <header className={`header show`}>
          <h1 className={styles.h1}>NEWS AND UPDATES</h1>
          <p className={styles.p1}>Zannya Africa Foundation</p>
        </header>
      </div>

      {/* Banner Image */}
      <div className={styles.imageH}>
        <Image
          src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756827150/zannya/uploads/huanavmdp4e1fksdwde1.jpg"
          alt="image"
          style={{ width: '70%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* News List */}
      <div className={styles.newslistcontainer}>
        {news.length === 0 ? (
          <p className={styles.nonews}>No news available.</p>
        ) : (
          news.map(item => (
            <NewsItemClient key={item.id} newsItem={item} />
          ))
        )}
      </div>

      {/* Social Links */}
      <p style={{ textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center', paddingTop: '30px' }}>
        <strong>For more News and updates you can follow us on our social platforms:</strong>
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", fontSize: "30px", paddingTop: '10px' }}>
        <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}><FaFacebook /></a>
        <a href="https://instagram.com/zannya_africa_foundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}><FaInstagram /></a>
        <a href="https://tiktok.com/@zannyaafricafdn" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}><FaTiktok /></a>
        <a href="https://x.com/zannyaafrica" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}><FaXTwitter /> </a>
      </div>

      {/* Email Contacts */}
      <p style={{ textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center' }}><strong>Or you can email us for:</strong></p>
      <div style={{ display: 'flex', paddingTop: '10px', flexDirection: 'row', justifyContent: 'center', gap: '30px' }}>
        <ul>
          <li><a href="mailto:info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
          <li><a href="mailto:support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
        </ul>
      </div>

      {/* Optional Components */}
      <ContactUs />
      <OptionalFeatures />
    </div>
  );
}

// SSR data fetching
export async function getServerSideProps() {
  const initialNews = await fetchNews(); // server-side fetch for SEO
  return { props: { initialNews } };
}