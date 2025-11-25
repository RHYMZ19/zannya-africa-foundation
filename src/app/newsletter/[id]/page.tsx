'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../lib/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import Image from "next/image";
import styles from "./NewsletterDetail.module.css";
import ContactUs from "@/app/ContactUs/page";
import { FaFacebook, FaHome, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import IncreaseImages from "@/app/components/IncreaseImages";
import Link from "next/link";
import router from "next/router";

type NewsletterItem = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  by?: string;
  image?: string;
  timestamp?: Timestamp | null;
};

export default function NewsletterDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [item, setItem] = useState<NewsletterItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchNewsletter = async () => {
      const docRef = doc(db, "weeklyNewsletter", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data() as Omit<NewsletterItem, "id">;
        setItem({ id: docSnap.id, ...docData });
      } else {
        setItem(null);
      }
      setLoading(false);
    };

    fetchNewsletter();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Newsletter not found.</p>;

  return (
    <div className={styles.wrapper}>
      <div style={{
    display: "flex",          // make children in a row
    alignItems: "center",     // vertically center items
    justifyContent: "center", // horizontally center items in the div
    gap: "1%"                 // spacing between items
  }}>
                 
                   <FaHome style={{ width: '5%', height: '5%' }} color="black" cursor='pointer' onClick={() => router.push('/')} >Home
                                   </FaHome>
                   
                   
                   <Link href="/Donates" className={styles.arrowButton}>
                     Donate
                   </Link>
                   <IncreaseImages src='/log.jpg' alt="Logo" />
                 
               </div>
  {item.timestamp && <p className={styles.date}>{item.timestamp.toDate().toLocaleDateString()}</p>}

  <h1 className={styles.title}>{item.title}</h1>

  {item.by && <p className={styles.by}>By {item.by}</p>}

  <div className={styles.topRow}>
    {item.image && (
      <div className={styles.imageBox}>
        <Image
          src={item.image}
          width={400}
          height={300}
          alt={item.title}
          className={styles.image}
        />
      </div>
    )}

    <div className={styles.subtitleBox}>
      <p className={styles.subtitle}>{item.subtitle}</p>
    </div>
  </div>

  <p className={styles.description}>{item.description}</p>

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