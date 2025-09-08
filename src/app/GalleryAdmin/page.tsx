'use client';

import React from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import CloudinaryUploader from "../CloudinaryUploader";

const GalleryAdmin = () => {
  // Handle upload completion → save to Firestore
  const handleUploadComplete = async (
    url: string,
    type: "image" | "video" | "raw"
  ) => {
    await addDoc(collection(db, "media"), {
      url,
      type,
      createdAt: new Date(),
    });
    alert(`${type} uploaded successfully!`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Admin Upload</h2>

      {/* Upload Images */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Upload Images</h3>
        <CloudinaryUploader
          onUploadComplete={handleUploadComplete}
          folder="zannya/uploads/images"
          resourceType="image"
          category="image" // kept but fixed to "image"
        />
      </div>

      {/* Upload Videos */}
      <div>
        <h3>Upload Videos</h3>
        <CloudinaryUploader
          onUploadComplete={handleUploadComplete}
          folder="zannya/uploads/videos"
          resourceType="video"
          category="video" // kept but fixed to "video"
        />
      </div>
    </div>
  );
};

export default GalleryAdmin;