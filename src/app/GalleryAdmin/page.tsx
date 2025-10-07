'use client';

import React, { useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import CloudinaryUploader from "../CloudinaryUploader";
import Image from "next/image";

type GalleryItem = { url: string; createdAt: Date };
type Gallery = {
  images: GalleryItem[];
  videos: GalleryItem[];
  files: GalleryItem[];
};

const GalleryAdmin = () => {
  const galleryRef = doc(db, "media", "gallery");

  const [gallery, setGallery] = useState<Gallery>({
    images: [],
    videos: [],
    files: [],
  });
  const [showSelector, setShowSelector] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState<"image" | "video" | "raw">("image");

  // Fetch gallery data
  const fetchGallery = async () => {
    const docSnap = await getDoc(galleryRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setGallery({
        images: data.images || [],
        videos: data.videos || [],
        files: data.files || [],
      });
      setShowSelector(true);
    } else {
      alert("Gallery is empty!");
    }
  };

  // Handle Delete selection
  const handleSelectDelete = async (url: string, type: "image" | "video" | "raw") => {
    try {
      const galleryMap: Record<"image" | "video" | "raw", GalleryItem[]> = {
        image: gallery.images,
        video: gallery.videos,
        raw: gallery.files,
      };

      const updatedArray = galleryMap[type].filter(item => item.url !== url);

      await updateDoc(galleryRef, {
        [type + "s"]: updatedArray,
      });

      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
      setShowSelector(false);
      fetchGallery(); // refresh gallery
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete item.");
    }
  };

  // Handle Upload Completion
  const handleUploadComplete = async (url: string, type: "image" | "video" | "raw") => {
    try {
      if (type === "image") {
        await updateDoc(galleryRef, { images: arrayUnion({ url, createdAt: new Date() }) });
        alert("Image uploaded successfully!");
      } else if (type === "video") {
        await updateDoc(galleryRef, { videos: arrayUnion({ url, createdAt: new Date() }) });
        alert("Video uploaded successfully!");
      } else {
        await updateDoc(galleryRef, { files: arrayUnion({ url, createdAt: new Date() }) });
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
        <button
          onClick={() => { setTypeToDelete("image"); fetchGallery(); }}
          style={{ marginTop: "10px", background: "black", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "6px" }}
        >
          Delete Image
        </button>
      </div>

      {/* Upload Videos */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Upload Videos</h3>
        <CloudinaryUploader
          onUploadComplete={handleUploadComplete}
          folder="zannya/uploads/videos"
          resourceType="video"
          category="video"
        />
        <button
          onClick={() => { setTypeToDelete("video"); fetchGallery(); }}
          style={{ marginTop: "10px", background: "black", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "6px" }}
        >
          Delete Video
        </button>
      </div>

      {/* Delete Selector Modal */}
      {showSelector && (
        <div style={{ marginTop: "20px", background: "#fff", padding: "10px", borderRadius: "8px" }}>
          <h4>Select {typeToDelete} to delete:</h4>
          {({
            image: gallery.images,
            video: gallery.videos,
            raw: gallery.files,
          }[typeToDelete]).map(item => (
            <div key={item.url} style={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
              {typeToDelete === "image" ? (
                <Image src={item.url} alt="to delete" width={80} style={{ marginRight: "10px" }} />
              ) : (
                <video src={item.url} width={120} controls style={{ marginRight: "10px" }} />
              )}
              <button
                onClick={() => handleSelectDelete(item.url, typeToDelete)}
                style={{ background: "black", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "6px" }}
              >
                Delete
              </button>
            </div>
          ))}
          <button onClick={() => setShowSelector(false)} style={{ marginTop: "10px" }}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default GalleryAdmin;
