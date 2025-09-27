'use client';

import React from "react";
import { db } from "../lib/firebase";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
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
          images: arrayUnion({ url, createdAt: new Date() }),
        });
        alert("Image uploaded successfully!");
      } else if (type === "video") {
        await updateDoc(galleryRef, {
          videos: arrayUnion({ url, createdAt: new Date() }),
        });
        alert("Video uploaded successfully!");
      } else {
        await updateDoc(galleryRef, {
          files: arrayUnion({ url, createdAt: new Date() }),
        });
        alert("File uploaded successfully!");
      }
    } catch {
      // If doc doesn't exist yet, create it
      await setDoc(galleryRef, {
        images: type === "image" ? [{ url, createdAt: new Date() }] : [],
        videos: type === "video" ? [{ url, createdAt: new Date() }] : [],
        files: type === "raw" ? [{ url, createdAt: new Date() }] : [],
      });
      alert("Gallery created and file uploaded!");
    }
  };

  // ✅ NEW: Handle Delete
  const handleDelete = async (
    url: string,
    type: "image" | "video" | "raw"
  ) => {
    try {
      if (type === "image") {
        await updateDoc(galleryRef, {
          images: arrayRemove({ url, createdAt: new Date() }), // must match object exactly
        });
        alert("Image deleted successfully!");
      } else if (type === "video") {
        await updateDoc(galleryRef, {
          videos: arrayRemove({ url, createdAt: new Date() }),
        });
        alert("Video deleted successfully!");
      } else {
        await updateDoc(galleryRef, {
          files: arrayRemove({ url, createdAt: new Date() }),
        });
        alert("File deleted successfully!");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete item.");
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
      <h2 style={{ marginBottom: "20px" }}>Gallery Upload.</h2>

      {/* Upload Images */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Upload Images</h3>
        <CloudinaryUploader
          onUploadComplete={handleUploadComplete}
          folder="zannya/uploads/images"
          resourceType="image"
          category="image"
        />
        {/* Example delete button for testing */}
        <button
          onClick={() => handleDelete("IMAGE_URL_HERE", "image")}
          style={{ marginTop: "10px", background: "red", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "6px" }}
        >
          Delete Image
        </button>
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
        {/* Example delete button */}
        <button
          onClick={() => handleDelete("VIDEO_URL_HERE", "video")}
          style={{ marginTop: "10px", background: "red", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "6px" }}
        >
          Delete Video
        </button>
      </div>
    </div>
  );
};

export default GalleryAdmin;