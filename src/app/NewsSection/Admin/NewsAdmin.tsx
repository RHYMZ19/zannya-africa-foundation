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

export default function NewsAdmin() {
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

  // ✅ AUTO RESIZE TEXTAREA
  const autoResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // ✅ FETCH
  const fetchNews = async () => {
    const snap = await getDocs(collection(db, "news"));
    setNews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleImageUpload = (url: string) => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
  };

  const handleVideoUpload = (url: string) => {
    setForm((prev) => ({
      ...prev,
      video: url,
    }));
  };

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

    fetchNews();
  };

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
          onInput={autoResize}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          style={{
            minHeight: "100px",
            resize: "none",
            overflow: "hidden",
          }}
        />

        <textarea
          placeholder="Content"
          value={form.content}
          onInput={autoResize}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          style={{
            minHeight: "150px",
            resize: "none",
            overflow: "hidden",
          }}
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

          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}