'use client';

import db from "../lib/firebase";
import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, getDoc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import styles from './ProgAdmin.module.css';
import CloudinaryUploader from "../CloudinaryUploader";
import Image from "next/image";

interface FilterData {
  id: string;
  category: string;
  name: string;
  description: string;
  images: string[];
  videos: string[];
  subcategories: { name: string; description: string }[];
}

type CategoryType =
  | 'Skilling and Livelihood'
  | 'Reproductive & Physical Health Awareness'
  | 'Climate Justice Advocacy';

const categories: Record<CategoryType, { title: string; description: string; subcategories: string[] }> = {
  'Skilling and Livelihood': { title: 'Skilling and Livelihood', description: '', subcategories: [] },
  'Reproductive & Physical Health Awareness': { title: 'Reproductive & Physical Health Awareness', description: '', subcategories: [] },
  'Climate Justice Advocacy': { title: 'Climate Justice Advocacy', description: '', subcategories: [] },
};

export default function AdminFilterForm() {
  const [formData, setFormData] = useState({
    category: '' as CategoryType | '',
    name: '',
    description: '',
    images: [] as string[],
    videos: [] as string[],
  });

  const [subcategories, setSubcategories] = useState<{ name: string; description: string }[]>([]);
  const [filters, setFilters] = useState<FilterData[]>([]); // ✅ store all filters

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSubcategory = () => setSubcategories([...subcategories, { name: '', description: '' }]);
  const updateSubcategory = (index: number, field: 'name' | 'description', value: string) => {
    const updated = [...subcategories];
    updated[index][field] = value;
    setSubcategories(updated);
  };

  // ✅ Mirror media into "media/gallery"
  const saveToGallery = async (url: string, type: "image" | "video") => {
    try {
      const galleryRef = doc(db, "media", "gallery");
      const snap = await getDoc(galleryRef);

      const existing = snap.exists() ? snap.data() : {};
      const field = type === "image" ? "images" : "videos";

      await setDoc(
        galleryRef,
        {
          [field]: [
            ...(existing[field] || []),
            { url, createdAt: new Date() },
          ],
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Error saving to gallery:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.category || !formData.name || !formData.description) {
      return alert('All required fields must be filled.');
    }
    try {
      await addDoc(collection(db, 'filters'), { ...formData, subcategories, createdAt: serverTimestamp() });
      alert('Filter saved!');
      fetchFilters(); // ✅ refresh list after save
    } catch (error) {
      console.error('Error saving filter:', error);
    }
  };

  const handleUploadComplete = async (url: string, type: "image" | "video") => {
    setFormData(prev => ({
      ...prev,
      [type === "image" ? "images" : "videos"]: [...(type === "image" ? prev.images : prev.videos), url],
    }));
    await saveToGallery(url, type);
  };

  // ✅ Delete function
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "filters", id));
      alert("Filter deleted successfully!");
      fetchFilters(); // refresh list after delete
    } catch (err) {
      console.error("Error deleting filter:", err);
      alert("❌ Failed to delete filter.");
    }
  };

  // ✅ Fetch filters from Firestore
  const fetchFilters = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "filters"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<FilterData, 'id'>)}));
      setFilters(data);
    } catch (err) {
      console.error("Error fetching filters:", err);
    }
  };

  // Fetch filters on mount
  useEffect(() => {
    fetchFilters();
  }, []);

  return (
    <div className={styles.filtercontainer}>
      <h2>Program Upload</h2>
      <form onSubmit={handleSubmit} className={styles.filterform}>
        <label>Category / Program</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {(Object.keys(categories) as CategoryType[]).map(cat => (
            <option key={cat} value={cat}>{categories[cat].title}</option>
          ))}
        </select>

        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Program Name" required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Brief description" required />

        <label>Subcategories</label>
        {subcategories.map((sub, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Subcategory Name"
              value={sub.name}
              onChange={e => updateSubcategory(i, 'name', e.target.value)}
            />
            <textarea
              placeholder="Subcategory Description"
              value={sub.description}
              onChange={e => updateSubcategory(i, 'description', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addSubcategory}>Add Subcategory</button>

        <label>Image URL</label>
        <CloudinaryUploader onUploadComplete={(url) => handleUploadComplete(url, "image")} folder="zannya/uploads" category="programs" />
        {formData.images.map((img, i) => (
          <div key={i} style={{ width: '150px', height: '100px', margin: '5px' }}>
            <Image src={img} alt={`Image ${i}`} width={150} height={100} style={{ objectFit: 'cover' }} />
          </div>
        ))}

        <label>Video URL</label>
        <CloudinaryUploader onUploadComplete={(url) => handleUploadComplete(url, "video")} folder="zannya/uploads" category="programs" />
        {formData.videos.map((vid, i) => (
          <video key={i} controls style={{ width: '200px', margin: '5px' }}>
            <source src={vid} type="video/mp4" />
          </video>
        ))}

        <button type="submit">Save Filter</button>
      </form>

      {/* ✅ List Filters with IDs */}
      <div style={{ marginTop: "30px" }}>
        <h3>Existing Filters</h3>
        {filters.length === 0 ? (
          <p>No filters found.</p>
        ) : (
          <ul>
            {filters.map((f) => (
              <li key={f.id} style={{ marginBottom: "10px" }}>
                <strong>{f.name}</strong> (ID: {f.id})  
                <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(f.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}