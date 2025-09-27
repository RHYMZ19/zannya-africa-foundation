'use client';

import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection, serverTimestamp, getDocs, deleteDoc, doc } from "firebase/firestore";
import CloudinaryUploader from "../CloudinaryUploader";
import Image from "next/image";

interface SuccessStoryForm {
  title: string;
  description: string;
  images: string[];
  video: string;
  pdf?: string;
}

const SuccessAdmin = () => {
  const [formData, setFormData] = useState<SuccessStoryForm>({
    title: "",
    description: "",
    images: [],
    video: "",
    pdf: ""
  });
  const [uploading, setUploading] = useState(false);

  // ✅ New state to store existing success stories
  const [stories, setStories] = useState<(SuccessStoryForm & { id: string })[]>([]);

  // Fetch existing success stories
  const fetchStories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "successStories"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as SuccessStoryForm) }));
      setStories(data);
    } catch (err) {
      console.error("Error fetching stories:", err);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleUploadComplete = (url: string, field: "image" | "video" | "pdf") => {
    if (field === "image") {
      setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
    } else if (field === "video") {
      setFormData(prev => ({ ...prev, video: url }));
    } else {
      setFormData(prev => ({ ...prev, pdf: url }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      await addDoc(collection(db, "successStories"), {
        ...formData,
        timestamp: serverTimestamp()
      });
      alert("Success story added!");
      setFormData({ title: "", description: "", images: [], video: "", pdf: "" });
      fetchStories(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Error adding story");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete function
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    try {
      await deleteDoc(doc(db, "successStories", id));
      alert("Story deleted successfully!");
      fetchStories(); // refresh list
    } catch (err) {
      console.error("Error deleting story:", err);
      alert("Failed to delete story.");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: '500px', background: '#f4f4f4', borderRadius: '12px', marginTop: '7%' }}>
      <h2>Success Story Upload</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* Images */}
        <label>Upload Images</label>
        <CloudinaryUploader
          onUploadComplete={(url) => handleUploadComplete(url, "image")}
          folder="zannya/success"
          category="success"
          resourceType="image"
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {formData.images.map((img, i) => (
            <Image key={i} src={img} alt={`Image ${i}`} width={150} height={100} style={{ objectFit: "cover", borderRadius: 6 }} />
          ))}
        </div>

        {/* Video */}
        <label>Upload Video</label>
        <CloudinaryUploader
          onUploadComplete={(url) => handleUploadComplete(url, "video")}
          folder="zannya/success"
          category="success"
          resourceType="video"
        />
        {formData.video && (
          <video controls style={{ maxWidth: 300, marginTop: 8 }}>
            <source src={formData.video} type="video/mp4" />
          </video>
        )}

        {/* PDF */}
        <label>Upload PDF</label>
        <CloudinaryUploader
          onUploadComplete={(url) => handleUploadComplete(url, "pdf")}
          folder="zannya/success"
          category="success"
          resourceType="raw"
        />
        {formData.pdf && (
          <p>PDF uploaded: <a href={formData.pdf} target="_blank" rel="noreferrer">View PDF</a></p>
        )}

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>

      {/* ✅ Display existing stories with delete option */}
      <div style={{ marginTop: "30px" }}>
        <h3>Existing Success Stories</h3>
        {stories.length === 0 ? (
          <p>No stories found.</p>
        ) : (
          <ul>
            {stories.map(story => (
              <li key={story.id} style={{ marginBottom: "10px" }}>
                <strong>{story.title}</strong>
                <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(story.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SuccessAdmin;