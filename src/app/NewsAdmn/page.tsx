'use client';

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection, getDocs, serverTimestamp, Timestamp } from "firebase/firestore";
import styles from './NewsAdmn.module.css';
import CloudinaryUploader from "../CloudinaryUploader";
import Image from "next/image";

interface NewsFormData {
  title: string;
  type: string;
  description: string;
  images: string[]; // multiple Cloudinary URLs
  video: string;    // single video URL
}

interface NewsItem {
  id: string;
  title: string;
  type: string;
  description: string;
  images?: string[];
  video?: string;
  timestamp?: Timestamp;
}

const NewsAdmn = () => {
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    type: "",
    description: "",
    images: [],
    video: "",
  });

  const [uploading, setUploading] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "newsUpdates"));
      const items: NewsItem[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<NewsItem, 'id'>)
      }));

      // ✅ Sort newest first
items.sort((a, b) => {
  const aTime = a.timestamp ? a.timestamp.toMillis() : 0;
  const bTime = b.timestamp ? b.timestamp.toMillis() : 0;
  return bTime - aTime;
});
      setNewsItems(items);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
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
        title: formData.title,
        type: formData.type,
        description: formData.description,
        images: formData.images,
        video: formData.video,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "newsUpdates"), docData);

      alert("News uploaded!");
      setFormData({ title: "", type: "", description: "", images: [], video: "" });

      fetchNews(); // reload news items
    } catch (err) {
      console.error(err);
      alert("Error uploading news.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.formcontainer}>
      <h2>Upload News & Update</h2>
      <form onSubmit={handleSubmit} className={styles.uploadform}>
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

      <hr />

      <h2>News Items</h2>
      {loading ? (
        <p>Loading news...</p>
      ) : newsItems.length === 0 ? (
        <p>No news available.</p>
      ) : (
        newsItems.map(item => (
          <div key={item.id} className={styles.newsItem}>
            <h3>{item.title}</h3>
            <p><strong>Type:</strong> {item.type}</p>
            <p>{item.description}</p>
            {item.images?.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={item.title}
                style={{ maxWidth: '100%', borderRadius: 8, marginTop: 8 }}
              />
            ))}
            {item.video && (
              <video controls style={{ maxWidth: '100%', marginTop: 8 }}>
                <source src={item.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {item.timestamp && (
              <small style={{ display: "block", marginTop: 4 }}>
                {item.timestamp.toDate().toLocaleDateString()}
              </small>
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default NewsAdmn;