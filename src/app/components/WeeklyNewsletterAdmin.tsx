'use client';

import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection, getDocs, serverTimestamp, deleteDoc, doc, Timestamp } from "firebase/firestore";
import CloudinaryUploader from "../CloudinaryUploader";
import Image from "next/image";

// Define Newsletter type
type NewsletterItem = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  timestamp?: Timestamp | null;
};

export default function WeeklyNewsletterAdmin() {
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<NewsletterItem[]>([]);

  // Fetch existing newsletters
  const fetchData = async () => {
    const snap = await getDocs(collection(db, "weeklyNewsletter"));
    const newsletters: NewsletterItem[] = snap.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title || "No Title",
      subtitle: doc.data().subtitle || "",
      image: doc.data().image || "",
      timestamp: doc.data().timestamp || null,
    }));
    setItems(newsletters);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "weeklyNewsletter"), {
        title,
        subtitle,
        image,
        timestamp: serverTimestamp(),
      });

      alert("✅ Weekly newsletter posted!");
      setTitle("");
      setSubtitle("");
      setImage("");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("❌ Error posting newsletter");
    }

    setLoading(false);
  };

  // Handle deletion
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await deleteDoc(doc(db, "weeklyNewsletter", id));
    fetchData();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Weekly Newsletter Admin</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <input
          type="text"
          placeholder="Newsletter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Newsletter Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />

        <p>Upload Banner Image</p>
        <CloudinaryUploader
          folder="zannya/newsletter"
          category="newsletter"
          onUploadComplete={(url: string) => setImage(url)}
        />

        {image && (
          <Image
            src={image}
            width={200}
            height={120}
            style={{ marginTop: 10, borderRadius: 8 }}
            alt="Newsletter Banner"
          />
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Newsletter"}
        </button>
      </form>

      <h3 style={{ marginTop: 30 }}>Existing Newsletters</h3>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: 15 }}>
          <strong>{item.title}</strong>
          <button
            onClick={() => handleDelete(item.id)}
            style={{ marginLeft: 10, background: "black", color: "white" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}