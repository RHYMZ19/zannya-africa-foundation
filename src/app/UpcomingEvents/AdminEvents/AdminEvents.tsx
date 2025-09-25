'use client';
import { useState } from "react";
import Image from "next/image";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import CloudinaryUploader from "../../CloudinaryUploader"; // your reusable uploader
import styles from "./UpcomingEventsAdmin.module.css";

export default function AdminEvents() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    images: [] as string[],
    video: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleUploadComplete = (url: string, type: "image" | "video") => {
    if (type === "image") {
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
    } else if (type === "video") {
      setFormData((prev) => ({ ...prev, video: url }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "events"), {
        title: formData.title,
        description: formData.description,
        date: Timestamp.fromDate(new Date(formData.date)),
        images: formData.images,
        video: formData.video || null,
        createdAt: Timestamp.now(),
      });
      setSuccess("Event added successfully!");
      setFormData({ title: "", description: "", date: "", images: [], video: "" });
    } catch (err) {
      console.error(err);
      setSuccess("Failed to add event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.adminSection}>
      <h2>Add Upcoming Event</h2>
      <form onSubmit={handleSubmit} className={styles.adminForm}>
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />

        <label>Date & Time</label>
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />

        {/* Images */}
        <label>Upload Images</label>
        <CloudinaryUploader
          onUploadComplete={(url) => handleUploadComplete(url, "image")}
          folder="zannya/events"
          category="events"
          resourceType="image"
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 6 }}>
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

        {/* Video */}
        <label>Upload Video</label>
        <CloudinaryUploader
          onUploadComplete={(url) => handleUploadComplete(url, "video")}
          folder="zannya/events"
          category="events"
          resourceType="video"
        />
        {formData.video && (
          <video controls style={{ maxWidth: 300, marginTop: 8 }}>
            <source src={formData.video} type="video/mp4" />
          </video>
        )}

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? "Adding..." : "Add Event"}
        </button>

        {success && <p style={{ marginTop: 10 }}>{success}</p>}
      </form>
    </section>
  );
}