'use client';

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import CloudinaryUploader from "../CloudinaryUploader";
import MediaGallery from "../components/mediaGallery";

interface MediaItem {
  url: string;
  type: "image" | "video";
  category: string;
  createdAt: Date | Timestamp;
}

const GalleryAdmin = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);

  const fetchMedia = async () => {
    const snap = await getDocs(collection(db, "media"));
    const data = snap.docs.map(doc => doc.data() as MediaItem);
    setMedia(data);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUploadComplete = async (
    url: string,
    type: "image" | "video" | "raw",
    category: string
  ) => {
    await addDoc(collection(db, "media"), {
      url,
      type,
      category,
      createdAt: new Date(),
    });
    fetchMedia(); // refresh list
  };

  return (
    <div>
      <h2>Upload Media</h2>
      <CloudinaryUploader
        onUploadComplete={handleUploadComplete}
        folder="zannya/uploads"
        category="teachings"
      />

      <CloudinaryUploader
        onUploadComplete={handleUploadComplete}
        folder="zannya/uploads"
        category="weather"
      />

      <h2>Gallery Preview</h2>
      <MediaGallery items={media} category="teachings" />
    </div>
  );
};

export default GalleryAdmin;