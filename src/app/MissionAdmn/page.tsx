"use client";

import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase"; // Adjust path as needed
import styles from "./MissionAdmn.module.css";

interface Leader {
  id?: string;
  name: string;
  role: string;
  bio?: string;
  img?: string;
  linkedin?: string;
  twitter?: string;
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
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      setForm({ name: "", role: "", bio: "", img: "", linkedin: "", twitter: "" });
      fetchLeaders();
    } catch (error) {
      console.error("Error adding leader:", error);
      setMessage("Error adding leader.");
    }
    setLoading(false);
  };

  // Delete a leader
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

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Leadership Admin Panel</h1>

      {message && <p className={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
        <input name="role" value={form.role} onChange={handleChange} placeholder="Role/Position" required />
        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Biography" rows={4} />
        <input name="img" value={form.img} onChange={handleChange} placeholder="Image URL" />
        <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL" />
        <input name="twitter" value={form.twitter} onChange={handleChange} placeholder="Twitter URL" />
        <button type="submit" disabled={loading}>Add Leader</button>
      </form>

      <h2 className={styles.h2}>Existing Leaders</h2>

      {loading && <p>Loading...</p>}

      <ul className={styles.list}>
        {leaders.map((leader) => (
          <li key={leader.id} className={styles.leaderItem}>
            <div>
              <strong>{leader.name}</strong> — <em>{leader.role}</em>
            </div>
            <button 
  onClick={() => {
    if (leader.id) handleDelete(leader.id);
    else alert("No ID found for this leader.");
  }} 
/>
          </li>
        ))}
      </ul>
    </div>
  );
}