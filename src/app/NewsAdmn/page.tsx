'use client';

import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import styles from './NewsAdmn.module.css';
import CloudinaryUploader from "../CloudinaryUploader";
import Image from "next/image";

interface NewsFormData {
  title: string;
  type: string;
  description: string;
  moreDetails: string;
  images: string[];
  video: string;
}

const NewsAdmn = () => {
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    type: "",
    description: "",
    moreDetails: "",
    images: [],
    video: "",
  });

  const [uploading, setUploading] = useState(false);
  const [newsList, setNewsList] = useState<any[]>([]); // store fetched news

  // ✅ Fetch news to display + delete
  const fetchNews = async () => {
    const snapshot = await getDocs(collection(db, "newsUpdates"));
    setNewsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Handles Cloudinary upload completion
  const handleUploadComplete = (url: string, field: "image" | "video") => {
    if (field === "image") {
      setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
    } else if (field === "video") {
      setFormData(prev => ({ ...prev, video: url }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    try {
      const docData = {
        ...formData,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "newsUpdates"), docData);

      // ✅ Also update "media/gallery"
      const galleryRef = doc(db, "media", "gallery");
      const gallerySnap = await getDoc(galleryRef);

      if (gallerySnap.exists()) {
        const existing = gallerySnap.data();

        // Merge new images + video
        await setDoc(
          galleryRef,
          {
            images: [
              ...(existing.images || []),
              ...formData.images.map((url) => ({
                url,
                createdAt: new Date(),
              })),
            ],
            videos: [
              ...(existing.videos || []),
              ...(formData.video
                ? [{ url: formData.video, createdAt: new Date() }]
                : []),
            ],
          },
          { merge: true }
        );
      } else {
        // Create the gallery doc if missing
        await setDoc(galleryRef, {
          images: formData.images.map((url) => ({
            url,
            createdAt: new Date(),
          })),
          videos: formData.video
            ? [{ url: formData.video, createdAt: new Date() }]
            : [],
        });
      }

      alert("✅ News uploaded successfully and added to gallery!");
      setFormData({ title: "", type: "", description: "", moreDetails: "", images: [], video: "" });
      fetchNews();
    } catch (err) {
      console.error(err);
      alert("❌ Error uploading news.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete function
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;
    try {
      await deleteDoc(doc(db, "newsUpdates", id));
      alert("✅ News deleted successfully!");
      fetchNews();
    } catch (error) {
      console.error("❌ Error deleting news:", error);
      alert("Error deleting news.");
    }
  };

  return (
    <div className={styles.formcontainer}>
      <h2> News & Update Upload</h2>
      <form onSubmit={handleSubmit} className={styles.uploadform}>
        <div className={styles.formrow}>
          {/* Left Column */}
          <div className={styles.leftcol}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select Type</option>
              <option value="News">News</option>
              <option value="Article">Article</option>
              <option value="Event">Event</option>
              <option value="Media">Media</option>
            </select>

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Right Column */}
          <div className={styles.rightcol}>
            <textarea
              name="moreDetails"
              placeholder="More Detailed Information..."
              value={formData.moreDetails}
              onChange={handleChange}
              style={{ height: "200px" }}
            ></textarea>
          </div>
        </div>

        {/* Cloudinary Image Upload */}
        <label>Upload Images</label>
        <CloudinaryUploader
          onUploadComplete={(url) => handleUploadComplete(url, "image")}
          folder="zannya/uploads"
          category="news"
        />

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: 8 }}>
          {formData.images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Image ${i}`}
              width={150}
              height={100}
              style={{ objectFit: "cover", borderRadius: 6 }}
            />
          ))}
        </div>

        {/* Cloudinary Video Upload */}
        <label>Upload Video</label>
        <CloudinaryUploader
          onUploadComplete={(url) => handleUploadComplete(url, "video")}
          folder="zannya/uploads"
          category="news"
          resourceType="video"
        />

        {formData.video && (
          <video controls style={{ maxWidth: "300px", marginTop: 8 }}>
            <source src={formData.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>

      {/* ✅ Show Existing News with Delete Button */}
      <h3 style={{ marginTop: "30px" }}>Existing News</h3>
      <ul>
        {newsList.map((news) => (
          <li key={news.id} style={{ marginBottom: "12px" }}>
            <strong>{news.title}</strong> — <em>{news.type}</em>
            <button
              onClick={() => handleDelete(news.id)}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
                padding: "4px 8px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsAdmn;