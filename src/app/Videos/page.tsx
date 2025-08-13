'use client';

import React, { useState, useEffect } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../lib/firebase"; // make sure storage is exported in your firebase config

export default function Videos() {
  const [filter, setFilter] = useState("ph"); // 'ph' = photos, 'vd' = videos
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load items based on filter
  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const folder = filter === "ph" ? "photos" : "videos"; // folders in Firebase Storage
        const listRef = ref(storage, folder);
        const res = await listAll(listRef);

        const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
        setItems(urls);
      } catch (err) {
        console.error("Error loading gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
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
            cursor: "pointer"
          }}
        >
          <option value="ph">Photos</option>
          <option value="vd">Videos</option>
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
            gap: "15px"
          }}
        >
          {items.map((url, idx) =>
            filter === "ph" ? (
              <img
                key={idx}
                src={url}
                alt={`Gallery Item ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.3s ease"
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            ) : (
              <video
                key={idx}
                src={url}
                controls
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}