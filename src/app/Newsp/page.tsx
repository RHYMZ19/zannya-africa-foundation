'use client';

import  { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import LanguageSelecter from "../LanguageSelecter/LanguageSelecter";
import StickyBar from "../StickyBar/StickyBar";
import styles from './Newsp.module.css';
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import ContactUs from "../ContactUs/page";
import { query, collection, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import db from "../lib/firebase";


type NewsItem = {
    id: string;
  title: string;
  type: string;
  description: string;
  image?: string;
  video?: string;
  timestamp?: any; // or use Firebase Timestamp type if you import it
}

export default function
Newsp(){
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
    const [SelectedImage, setSelectedImage] = useState<string | null>(null);
    const router = useRouter();
        const [visible, setVisible] = useState(false);

        useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            easing: 'ease-in-out',
            anchorPlacement: 'top-bottom'
        });
                setTimeout(() =>
            setVisible(true), 100);}, []);

                useEffect(() => {}, []);

    

 useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "newsUpdates"), (snapshot) => {
      const items: NewsItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<NewsItem, "id">),
      }));
      setNews(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
    
    return(
<div>
    <div>
        <StickyBar>
                    <FaHome size={24} color="black" cursor='pointer' onClick={() => router.push('/')} >
                    Home</FaHome>
                    <GetInvolved />
                    <LanguageSelecter />
                    <Gallery />
                    <button onClick={() =>
                    router.push('')}
                    className={styles.arrowButton}>Donate
                    </button>
                    < img src='/log.jpg' alt="log" width={100} height={100}></img>
                    </StickyBar>
                </div>
    <div className={styles.container}>
        <header className={`header ${visible ? 'show' : ""}`}>
                <h1 className={styles.h1}>
                    NEWS && UPDATES
                </h1>
                <p className={styles.p1}>
                    Zannya Africa Foundation
                </p>
                </header>
             </div>

          <div style={{width: '100%', height: 'auto',justifyContent: 'center',backgroundColor: '#f5fafac7', 
            margin: 0,display: 'flex', padding: 150, }}>
            <img src='/climate/climate1.jpg' alt="pic" style={{width: '100%', height: 'auto', display: 'block'}}></img>
         </div>

         <div style={{height: '0px', width: '100%', justifyItems: 'center', backgroundColor: '#1e3c72'}}>
         <h1 style={{fontSize: '50px',color: 'white', marginBottom: '0px', marginTop: '20px'}}>
                    What we offer
            </h1>
            </div>
         
    <div className={styles.newslistcontainer}>
      {loading ? (
        <p>Loading...</p>
      ) :
      news.length === 0 ? (
        <p className={styles.nonews}>No news available.</p>
      ) : (
        news.map(({ id, title, type, description, image, video, timestamp }) => (
          <div key={id} className={styles.newscard}>
            {image && <img src={image} alt={title} className={styles.newsimage} />}
            <div className={styles.newscontent}>
              <span className={styles.newstype}>{type}</span>
              <h3 className={styles.newstitle}>{title}</h3>
              <p className={styles.newsdescription}>{description}</p>
              {video && (
                <video controls className={styles.newsvideo}>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {timestamp && (
                <small className={styles.newsdate}>
                  {timestamp.toDate().toLocaleDateString()}
                </small>
              )}
            </div>
          </div>
        ))
      )}
    </div>
    
    

    
    <ContactUs></ContactUs>
    <div>
        <OptionalFeatures></OptionalFeatures>
    </div>
    {
  SelectedImage && (
    <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}
    onClick={() =>setSelectedImage(null)}>
      <img
      src={SelectedImage}
      alt="Enlarged"
      style={{maxHeight: '90%', maxWidth: '90%', borderRadius: '10px'}}></img>
    </div>)}
</div>
    )
}

