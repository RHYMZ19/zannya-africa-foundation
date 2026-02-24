'use client';

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import Image from "next/image";
import styles from "./WeeklyPage.module.css";
import Link from "next/link";
import { FaFacebook, FaHome, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ContactUs from "../ContactUs/page";
import IncreaseImages from "../components/IncreaseImages";
import router from "next/router";

// Type for newsletter items
type NewsletterItem = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  by?: string; // new field
  image?: string;
  timestamp?: Timestamp | null;
};

export default function WeeklyNewsletterPage() {
  const [items, setItems] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNewsletters = async () => {
    const q = query(
      collection(db, "weeklyNewsletter"),
      orderBy("timestamp", "desc")
    );

    const snap = await getDocs(q);

    const newsletters: NewsletterItem[] = snap.docs.map(d => ({
      id: d.id,
      title: d.data().title || "No Title",
      subtitle: d.data().subtitle || "",
      description: d.data().description || "",
      by: d.data().by || "", // include 'by'
      image: d.data().image || "",
      timestamp: d.data().timestamp || null,
    }));

    setItems(newsletters);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
  <div
    style={{
      backgroundColor: "transparent",
      
      padding: "10px 15px",
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      
      marginTop: "10px"
    }}
  >
    {/* TOP ROW: your three icons/buttons */}
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        width: "100%"
      }}
    >
      <FaHome
        style={{ width: "30px", height: "30px" }}
        color="black"
        cursor="pointer"
        onClick={() => router.push("/")}
      />

      <Link href="/Donates" className={styles.arrowButton}>
        Donate
      </Link>

      <IncreaseImages src="/log.jpg" alt="Logo" />
    </div>

    {/* TEXT BELOW */}
    <p
      style={{
        marginTop: "6px",
        fontSize: "14px",
        fontWeight: "bold",
        color: "red",
        textAlign: "center"
      }}
    >
      Zannya Africa Foundation
    </p>
  </div>
</div>
   <h1 className={styles.title}>Articles</h1>
   
   {items.length === 0 && <p>No newsletters posted yet.</p>}

   <div className={styles.cardsGrid}> {/* new grid wrapper */}
    {items.map((item) => (
      <div key={item.id} className={styles.card}>
        {item.image && (
          <Link href={`/newsletter/${item.id}`}>
          <Image
            src={item.image}
            alt="Newsletter Banner"
            width={600}
            height={300}
            className={styles.banner}
          />
          </Link>
        )}

        <h2 className={styles.cardTitle}>{item.title}</h2>
        
        <p className={styles.cardSubtitle}>
          {item.subtitle && item.subtitle.length > 60
            ? `${item.subtitle.substring(0, 60)}... `
            : item.subtitle}

          {item.subtitle && item.subtitle.length > 60 && (
            <Link href={`/newsletter/${item.id}`} className={styles.more}>
              more
            </Link>
          )}
        </p>
        <Link href={`/newsletter/${item.id}`}>
        <p className={styles.cardDescription}>
          {item.description && item.description.length > 100
            ? `${item.description.substring(0, 100)}... `
            : item.description}
  
          {item.description && item.description.length > 100 && (
            <Link href={`/newsletter/${item.id}`} className={styles.more}>
              more
            </Link>
          )}
        </p>
        </Link>
        {item.by && <p className={styles.by}><em>By: {item.by}</em></p>}
        {item.timestamp && (
          <p className={styles.date}>
            {item.timestamp.toDate().toLocaleDateString()}
          </p>
        )}

        <hr />
      </div>
     ))}
    </div>

    <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center',paddingTop: '30px'}}><strong> You can follow us on our socialplatforms:</strong></p>
                                              <div style={{ display: "flex",justifyContent: "center",  gap: "40px", fontSize: "30px",paddingTop: '10px'}}>
                                                        <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                                                          <FaFacebook />
                                                        </a>
                                                        <a href="https://instagram.com/zannya_africa_foundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}>
                                                          <FaInstagram />
                                                        </a>
                                                        <a href="https://tiktok.com/@zannyaafricafdn" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                                                          <FaTiktok />
                                                        </a>
                                                        <a href="https://x.com/zannyaafrica" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                                                            <FaXTwitter />   
                                                        </a>
                                                        
                                                      </div>
                                                      <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center'}}><strong>Or you can email us for:</strong></p>
                                                      <div style={{display: 'flex',paddingTop: '10px', flexDirection: 'row', justifyContent: 'center', gap: '30px'}}>
                                                  <ul>
                                                  <li><a href="mailto: info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
                                                  <li><a href="mailto: support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
                                                  </ul>
                                                </div>
                                                
                    <ContactUs></ContactUs>
   </div>

  );
}