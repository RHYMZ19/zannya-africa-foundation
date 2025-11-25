'use client';

import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection, getDocs, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import CloudinaryUploader from "../CloudinaryUploader";
import Image from "next/image";

export default function WeeklyNewsletterAdmin() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const fetchData = async () => {
    const snap = await getDocs(collection(db, "weeklyNewsletter"));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: any) => {
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
          onUploadComplete={(url) => setImage(url)}
        />

        {image && (
          <Image src={image} width="200" style={{ marginTop: 10, borderRadius: 8 }} alt={""} />
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
