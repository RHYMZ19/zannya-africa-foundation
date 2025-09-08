'use client';

import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

interface MediaItem {
  url: string;
  type: "image" | "video";
  category: string;
  createdAt: any;
}

export default function Videos() {
  const [filter, setFilter] = useState("image"); // default: images
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMedia = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, "media"));
        const allMedia = snap.docs.map(doc => doc.data() as MediaItem);

        // Filter by type (image or video)
        const filtered = allMedia.filter(item => item.type === filter);
        setItems(filtered);
      } catch (err) {
        console.error("Error loading media:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [filter]);

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Filter */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
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

      {/* Gallery */}
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
                alt={`Gallery Item ${idx + 1}`}
                width={400}
                height={250}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
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
  );
}