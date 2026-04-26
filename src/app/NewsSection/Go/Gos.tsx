'use client';

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc
} from "firebase/firestore";

import { db } from "../../lib/firebase";
import CloudinaryUploader from "../../CloudinaryUploader";

export default function GoS() {
  const [form, setForm] = useState({
    title: "",
    category: "News",
    excerpt: "",
    content: "",
    images: [] as string[],
    video: "",
    author: "",
    date: "",
  });

  const [news, setNews] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  // ✅ FETCH
  const fetchNews = async () => {
    const snap = await getDocs(collection(db, "news"));
    setNews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // ✅ IMAGE UPLOAD
  const handleImageUpload = (url: string) => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
  };

  // ✅ VIDEO UPLOAD
  const handleVideoUpload = (url: string) => {
    setForm((prev) => ({
      ...prev,
      video: url,
    }));
  };

  // ✅ EDIT
  const handleEdit = (item: any) => {
    setForm({
      title: item.title || "",
      category: item.category || "News",
      excerpt: item.excerpt || "",
      content: item.content || "",
      author: item.author || "",
      date: item.date || "",
      images: item.images || [],
      video: item.video || "",
    });

    setEditId(item.id);
  };

  // ✅ SUBMIT (CREATE + UPDATE)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId) {
      await updateDoc(doc(db, "news", editId), {
        ...form,
      });
      setEditId(null);
    } else {
      await addDoc(collection(db, "news"), {
        ...form,
        createdAt: Timestamp.now(),
      });
    }

    setForm({
      title: "",
      category: "News",
      excerpt: "",
      content: "",
      author: "",
      date: "",
      images: [],
      video: "",
    });

    fetchNews(); // ✅ IMPORTANT
  };

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "news", id));
    fetchNews();
  };

  return (
    <div>
      <h2>{editId ? "Edit News" : "Add News"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        {/* IMAGES */}
        <label>Upload Images</label>

        <CloudinaryUploader
          onUploadComplete={handleImageUpload}
          folder="zannya/news"
          category="news"
          resourceType="image"
        />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {form.images.map((img, i) => (
            <img
              key={i}
              src={img}
              style={{
                width: 120,
                height: 80,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
          ))}
        </div>

        {/* VIDEO */}
        <label>Upload Video</label>

        <CloudinaryUploader
          onUploadComplete={handleVideoUpload}
          folder="zannya/news"
          category="news"
          resourceType="video"
        />

        {form.video && (
          <video controls style={{ width: 250, marginTop: 10 }}>
            <source src={form.video} />
          </video>
        )}

        <textarea
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />

        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <input
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <button type="submit">
          {editId ? "Update News" : "Post News"}
        </button>
      </form>

      <h3>Existing News</h3>

      {news.map((item) => (
        <div key={item.id} style={{ marginBottom: 15 }}>
          <strong>{item.title}</strong>

          <button onClick={() => handleEdit(item)}>
            Edit
          </button>

          <button onClick={() => handleDelete(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}