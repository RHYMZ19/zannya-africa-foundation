"use client";

import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // Adjust path as needed
import styles from "./MissionAdmn.module.css";
import CloudinaryUploader from "../CloudinaryUploader";
import Image from "next/image";

interface Leader {
  id?: string;
  name: string;
  role: string;
  bio?: string;
  img?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
}

export default function MissionAdmn() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    img: "",
    linkedin: "",
    twitter: "",
    facebook: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch leaders on load
  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "leadership"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Leader) }));
      setLeaders(data);
    } catch (error) {
      console.error("Failed to fetch leaders:", error);
    }
    setLoading(false);
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add new leader
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await addDoc(collection(db, "leadership"), form);
      setMessage("Leader added successfully!");
      setForm({ name: "", role: "", bio: "", img: "", linkedin: "", twitter: "", facebook: ""});
      fetchLeaders();
    } catch (error) {
      console.error("Error adding leader:", error);
      setMessage("Error adding leader.");
    }
    setLoading(false);
  };


  // Edit an existing leader
const handleEdit = (leader: Leader) => {
  if (!leader.id) {
    alert("No ID found for this leader.");
    return;
  }

  setEditingId(leader.id);

  setForm({
    name: leader.name || "",
    role: leader.role || "",
    bio: leader.bio || "",
    img: leader.img || "",
    linkedin: leader.linkedin || "",
    twitter: leader.twitter || "",
    facebook: leader.facebook || "",
  });

  setMessage("Editing leader...");
};


// Update an existing leader
const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!editingId) {
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    await updateDoc(
      doc(db, "leadership", editingId),
      {
        name: form.name,
        role: form.role,
        bio: form.bio,
        img: form.img,
        linkedin: form.linkedin,
        twitter: form.twitter,
        facebook: form.facebook,
      }
    );

    setMessage("Leader updated successfully!");

    setForm({
      name: "",
      role: "",
      bio: "",
      img: "",
      linkedin: "",
      twitter: "",
      facebook: "",
    });

    setEditingId(null);

    fetchLeaders();

  } catch (error) {
    console.error("Error updating leader:", error);
    setMessage("Error updating leader.");
  }

  setLoading(false);
};

  // ✅ Delete a leader
  const handleDelete = async (id: string) => {
    if (!id) {
      alert("Invalid ID, can't delete.");
      return;
    }
    if (!confirm("Are you sure you want to delete this leader?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, "leadership", id));
      setMessage("Leader deleted successfully!");
      fetchLeaders();
    } catch (error) {
      console.error("Error deleting leader:", error);
      setMessage("Error deleting leader.");
    }
    setLoading(false);
  };

  const handleUploadComplete = (url: string) => {
    setForm(prev => ({
      ...prev,
      img: url, // just store the uploaded image url here
    }));
    setMessage("Image uploaded successfully!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Leadership Upload</h1>

      {message && <p className={styles.message}>{message}</p>}

      <form
  onSubmit={editingId ? handleUpdate : handleSubmit}className={styles.form}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
        <input name="role" value={form.role} onChange={handleChange} placeholder="Role/Position" required />
        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Biography" rows={4} />
        
        {/* ✅ Reusable CloudinaryUploader */}
        <label>Upload Leader Image</label>
        <CloudinaryUploader
          onUploadComplete={(url) => handleUploadComplete(url)}
          folder="zannya/leaders"
          category={""}
        />

        {/* Show preview if uploaded */}
        {form.img && (
          <div style={{ marginTop: "10px" }}>
            <Image
              src={form.img}
              alt="Preview"
              width={120}
              height={120}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        )}
        
        <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL" />
        <input name="twitter" value={form.twitter} onChange={handleChange} placeholder="Twitter URL" />
        <input name="facebook" value={form.facebook} onChange={handleChange} placeholder="Facebook URL" />
        <button type="submit" disabled={loading}>{editingId ? "Update Leader" : "Add Leader"}</button>
        {editingId && (
  <button
    type="button"
    onClick={() => {
      setEditingId(null);

      setForm({
        name: "",
        role: "",
        bio: "",
        img: "",
        linkedin: "",
        twitter: "",
        facebook: "",
      });

      setMessage("");
    }}
  >
    Cancel Edit
  </button>
)}
      </form>

      <h2 className={styles.h2}>Existing Leaders</h2>

      {loading && <p>Loading...</p>}

      <ul className={styles.list}>
        {leaders.map((leader) => (
          <li key={leader.id} className={styles.leaderItem}>
            <div>
              <strong>{leader.name}</strong> — <em>{leader.role}</em>
            </div>

            {/* ✅ Edit button */}
<button
  onClick={() => handleEdit(leader)}
  style={{
    marginTop: "6px",
    marginRight: "6px",
    background: "#444",
    color: "white",
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Edit
</button>
            {/* ✅ Delete button */}
            <button
              onClick={() => {
                if (leader.id) handleDelete(leader.id);
                else alert("No ID found for this leader.");
              }}
              style={{
                marginTop: "6px",
                background: "black",
                color: "white",
                padding: "6px 10px",
                border: "none",
                borderRadius: "6px",
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
}