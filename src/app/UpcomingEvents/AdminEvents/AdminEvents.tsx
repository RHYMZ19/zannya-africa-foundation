'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { collection, addDoc, Timestamp, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import CloudinaryUploader from "../../CloudinaryUploader"; // your reusable uploader
import styles from "./UpcomingEventsAdmin.module.css";

interface EventType {
  title: string;
  description: string;
  date: Timestamp;
  images: string[];
  video?: string;
}

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

  // ✅ New state for existing events
  const [events, setEvents] = useState<
    { id: string; title: string; description: string; date: Timestamp; images: string[]; video?: string }[]
  >([]);

  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "events"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as EventType) }));
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleUploadComplete = (url: string, type: "image" | "video") => {
    if (type === "image") {
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
    } else {
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
      fetchEvents(); // refresh list
    } catch (err) {
      console.error(err);
      setSuccess("Failed to add event.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete function
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteDoc(doc(db, "events", id));
      alert("Event deleted successfully!");
      fetchEvents(); // refresh list
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event.");
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

      {/* ✅ Existing events list with delete */}
      <div style={{ marginTop: 30 }}>
        <h3>Existing Events</h3>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event.id} style={{ marginBottom: 10 }}>
                <strong>{event.title}</strong> — {new Date(event.date.seconds * 1000).toLocaleString()}
                <button style={{ marginLeft: 10 }} onClick={() => handleDelete(event.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}