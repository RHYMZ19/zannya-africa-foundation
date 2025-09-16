'use client';

import React from "react";
import { db } from "../lib/firebase";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import CloudinaryUploader from "../CloudinaryUploader";

const GalleryAdmin = () => {
  // Common gallery document reference
  const galleryRef = doc(db, "media", "gallery"); // one fixed doc called "gallery"

  // Handle upload completion → save to arrays inside one doc
  const handleUploadComplete = async (
    url: string,
    type: "image" | "video" | "raw"
  ) => {
    try {
      if (type === "image") {
        await updateDoc(galleryRef, {
          images: arrayUnion({ url, createdAt: new Date() })
        });
        alert("Image uploaded successfully!");
      } else if (type === "video") {
        await updateDoc(galleryRef, {
          videos: arrayUnion({ url, createdAt: new Date() })
        });
        alert("Video uploaded successfully!");
      } else {
        await updateDoc(galleryRef, {
          files: arrayUnion({ url, createdAt: new Date() })
        });
        alert("File uploaded successfully!");
      }
    } catch (err: any) {
      // If doc doesn't exist yet, create it
      await setDoc(galleryRef, {
        images: type === "image" ? [{ url, createdAt: new Date() }] : [],
        videos: type === "video" ? [{ url, createdAt: new Date() }] : [],
        files: type === "raw" ? [{ url, createdAt: new Date() }] : []
      });
      alert("Gallery created and file uploaded!");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        margin: "0 auto",
        borderRadius: "12px",
        background: "#f4f4f4",
        marginTop: "7%",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Gallery Upload</h2>

      {/* Upload Images */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Upload Images</h3>
        <CloudinaryUploader
          onUploadComplete={handleUploadComplete}
          folder="zannya/uploads/images"
          resourceType="image"
          category="image"
        />
      </div>

      {/* Upload Videos */}
      <div>
        <h3>Upload Videos</h3>
        <CloudinaryUploader
          onUploadComplete={handleUploadComplete}
          folder="zannya/uploads/videos"
          resourceType="video"
          category="video"
        />
      </div>
    </div>
  );
};

export default GalleryAdmin;