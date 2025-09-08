'use client';

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import Image from "next/image";
import styles from './Videos.module.css';
import router from "next/router";
import { FaHome } from "react-icons/fa";
import ContactUs from "../ContactUs/page";
import GetInvolved from "../GetInvolved/GetInvolved";
import IncreaseIma from "../Newsp/components/IncreaseIma";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import StickyBar from "../StickyBar/StickyBar";

interface MediaItem {
  url: string;
  type: "image" | "video";
  createdAt: Timestamp | Date;
}

export default function Videos() {
  const [filter, setFilter] = useState<"image" | "video">("image");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load from Firestore
  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "media"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => doc.data() as MediaItem);

        // filter by type (image/video)
        setItems(data.filter(item => item.type === filter));
      } catch (err) {
        console.error("Error loading media:", err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [filter]);

  return (
    <div style={{ overflow: 'hidden' }}>
    <div style={{ justifyItems: 'center', gap: '1%' }}>
                  <StickyBar>
                    <FaHome
                      style={{ width: '25%', height: '25%' }}
                      color="black"
                      cursor='pointer'
                      onClick={() => router.push('/')}
                    >
                      Home
                    </FaHome>
                    <GetInvolved />
                    <button
                      onClick={() => router.push('/Donates')}
                      className={styles.arrowButton}>Donate
                    </button>
                    <IncreaseIma src='/log.jpg' alt="log" />
                  </StickyBar>
                </div>
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Filter */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "image" | "video")}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          <option value="image">Photos</option>
          <option value="video">Videos</option>
        </select>
      </div>

      {/* Gallery Display */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          {items.map((item, idx) =>
            item.type === "image" ? (
              <Image
                key={idx}
                src={item.url}
                alt={`Media ${idx + 1}`}
                width={400}
                height={250}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            ) : (
              <video
                key={idx}
                src={item.url}
                controls
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              />
            )
          )}
        </div>
      )}
    </div>
    <div style={{ margin: '3%', width: '100%' }}>
            <ContactUs />
          </div>
    
          <div style={{ margin: '0%', width: '100%' }}>
            <OptionalFeatures />
          </div>
    </div>
  );
}