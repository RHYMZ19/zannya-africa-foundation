// app/Newsp/page.tsx
'use client';
import { useState, useEffect } from "react";
import StickyBar from "../StickyBar/StickyBar";
import { FaHome } from "react-icons/fa";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import IncreaseIma from "../Newsp/components/IncreaseIma";
import ContactUs from "../ContactUs/page";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import styles from "../Newsp/Newsp.module.css";
import NewsListServer from "./NewsListServer";
import NewsListClient from "./NewsListClient";
import { NewsItem } from "./types";
import { getNews } from "./NewsServer"; // import server fetch

export default function NewspPage() {
  const [SelectedImage, setSelectedImage] = useState<string | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    getNews().then(fetched => setNews(fetched));
  }, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      <StickyBar>
        <FaHome style={{ width: '25%', height: '25%' }} color="black" />
        <GetInvolved />
        <Gallery />
        <button className={styles.arrowButton}>Donate</button>
        <IncreaseIma src="/log.jpg" alt="log" />
      </StickyBar>

      <NewsListServer news={news} setSelectedImage={setSelectedImage} />
      <NewsListClient news={news} />

      <ContactUs />
      <OptionalFeatures />

      {SelectedImage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }} onClick={() => setSelectedImage(null)}>
          <img src={SelectedImage} style={{ maxHeight: '90%', maxWidth: '90%', borderRadius: '10px' }} />
        </div>
      )}
    </div>
  );
}