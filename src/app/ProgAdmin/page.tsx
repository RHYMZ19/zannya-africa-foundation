'use client';

import db from "../lib/firebase";
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import styles from './ProgAdmin.module.css';
import CloudinaryUploader from "../CloudinaryUploader";
import Image from "next/image";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.category || !formData.name || !formData.description) {
      return alert('All required fields must be filled.');
    }
    try {
      await addDoc(collection(db, 'filters'), { ...formData, subcategories });
      alert('Filter saved!');
    } catch (error) {
      console.error('Error saving filter:', error);
    }
  };

  const handleUploadComplete = (url: string, type: "image" | "video") => {
    setFormData(prev => ({
      ...prev,
      [type === "image" ? "images" : "videos"]: [...(type === "image" ? prev.images : prev.videos), url],
    }));
  };

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
    </div>
  );
}