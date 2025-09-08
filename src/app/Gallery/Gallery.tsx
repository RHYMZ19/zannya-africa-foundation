"use client";

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";

interface MediaItem {
  url: string;
  type: "image" | "video";
  createdAt: Date | Timestamp;
}

const Gallery = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");

  const fetchMedia = async () => {
    const snap = await getDocs(collection(db, "media"));
    const data = snap.docs.map((doc) => doc.data() as MediaItem);
    setMedia(data);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const filteredMedia =
    filter === "all"
      ? media
      : media.filter((item) => item.type === filter);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Gallery</h2>

      {/* Dropdown filter */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as "all" | "image" | "video")}
        className="border p-2 mb-6 rounded"
      >
        <option value="all">All Media</option>
        <option value="image">Photos</option>
        <option value="video">Videos</option>
      </select>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredMedia.map((item, i) => (
          <div key={i} className="border rounded overflow-hidden shadow">
            {item.type === "image" ? (
              <img
                src={item.url}
                alt="Uploaded media"
                className="w-full h-64 object-cover"
              />
            ) : (
              <video
                src={item.url}
                controls
                className="w-full h-64 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;