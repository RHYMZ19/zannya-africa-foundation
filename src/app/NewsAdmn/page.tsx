'use client';

import React, { useEffect, useState } from "react";
import { db, storage } from "../lib/firebase";
import { addDoc, collection, getDocs, serverTimestamp, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from './NewsAdmn.module.css';
import Image from "next/image";


interface NewsFormData {
  title: string;
  type: string;
  description: string;
  image: File | null;
  video: string;
}

interface NewsItem {
  id: string;
  title: string;
  type: string;
  description: string;
  image?: string;
  video?: string;
  timestamp?: Timestamp;
}

const NewsAdmn = () => {
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    type: "",
    description: "",
    image: null,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "image" && files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = "";

      if (formData.image) {
        const imageRef = ref(storage, `news/${Date.now()}-${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const docData = {
        title: formData.title,
        type: formData.type,
        description: formData.description,
        video: formData.video,
        image: imageUrl,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "newsUpdates"), docData);

      alert("News uploaded!");
      setFormData({ title: "", type: "", description: "", image: null, video: "" });

      // Reload news items after upload
      fetchNews();
    } catch (err) {
      console.error(err);
      alert("Error uploading.");
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

        <input type="file" name="image" accept="image/*" onChange={handleChange} />

        <input
          type="text"
          name="video"
          placeholder="Video URL (optional)"
          value={formData.video}
          onChange={handleChange}
        />

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
            {item.image && <Image src={item.image} alt={item.title} style={{ maxWidth: '100%', borderRadius: 8 }} />}
            {item.video && (
              <video controls style={{ maxWidth: '100%', marginTop: 8 }}>
                <source src={item.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default NewsAdmn;