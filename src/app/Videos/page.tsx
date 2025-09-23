'use client';

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import styles from './Videos.module.css';
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import ContactUs from "../ContactUs/page";
import GetInvolved from "../GetInvolved/GetInvolved";
import IncreaseIma from "../Newsp/components/IncreaseIma";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import StickyBar from "../StickyBar/StickyBar";
import IncreaseImagis from "./components/IncreaseImagis";

interface MediaItem {
  url: string;
  type: "image" | "video";
  createdAt: Timestamp | Date;
}

export default function Videos() {
  const [filter, setFilter] = useState<"image" | "video">("image");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  // Load from Firestore
  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const galleryRef = doc(db, "media", "gallery");
        const snap = await getDoc(galleryRef);

        if (snap.exists()) {
          const data = snap.data() as {
            images?: { url: string; createdAt: Date | Timestamp }[];
            videos?: { url: string; createdAt: Date | Timestamp }[];
          };

          let fetchedItems: MediaItem[] = [];

          if (filter === "image") {
            fetchedItems = (data.images || []).map(img => ({
              ...img,
              type: "image" as const,
            }));
          } else {
            fetchedItems = (data.videos || []).map(video => ({
              ...video,
              type: "video" as const,
            }));
          }

          // ✅ Sort newest first (no `any`)
          fetchedItems.sort((a, b) => {
            const dateA =
              a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt);
            const dateB =
              b.createdAt instanceof Timestamp ? b.createdAt.toDate() : new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime();
          });

          setItems(fetchedItems);
        } else {
          console.warn("Gallery document not found.");
          setItems([]);
        }
      } catch (err) {
        console.error("Error loading media:", err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [filter]);

  return (
    <div style={{ overflow: 'hidden', background: 'linear-gradient(to right, #e0f7fa, #e1bee7)', }}>
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
            className={styles.arrowButton}
          >
            Donate
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
                <IncreaseImagis
                  key={idx}
                  src={item.url}
                  alt={`Media ${idx + 1}`}
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