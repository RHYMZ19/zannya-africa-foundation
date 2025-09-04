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
  'Skilling and Livelihood': {
    title: 'Skilling and Livelihood',
    description: 'Programs aimed at improving skills, income, and community engagement.',
    subcategories: ['Vocational Training', 'Income Generating Activities', 'Sports Skilling', 'Mentorship on Life Skills']
  },
  'Reproductive & Physical Health Awareness': {
    title: 'Reproductive & Physical Health Awareness',
    description: 'Programs focused on health education, family planning, and fitness.',
    subcategories: [
      'Sexual and Reproductive Health Education',
      'Menstrual Health Management',
      'Family Planning, Career Guidance and Counselling',
      'Organized Sports and Fitness',
      'Nutrition & Healthy Eating',
      'Disease Prevention and Management',
      'Community Outreaches',
      'Partnerships and Collaborations',
      'Advocacy Efforts'
    ]
  },
  'Climate Justice Advocacy': {
    title: 'Climate Justice Advocacy',
    description: 'Programs to promote climate awareness and community-led action.',
    subcategories: [
      'Climate Change Awareness and Education',
      'Advocacy and Policy Influence',
      'The ZAF Ecofit Camp',
      'Climate Initiative in Schools',
      'Sports Clubs for Community Cleaning',
      'Fruit Tree Plant per Home Initiative',
      'Community-Led Climate Action'
    ]
  }
};

export default function AdminFilterForm() {
  const [formData, setFormData] = useState({
    category: '' as CategoryType | '',
    subcategory: '',
    name: '',
    description: '',
    images: [] as string[],
    videos: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { category, name, description } = formData;
    if (!category || !name || !description) {
      return alert('All required fields must be filled.');
    }
    try {
      await addDoc(collection(db, 'filters'), formData);
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
      <h2>Admin Filter Panel</h2>
      <form onSubmit={handleSubmit} className={styles.filterform}>
        <label>Category / Program</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {Object.keys(categories).map(cat => (
            <option key={cat} value={cat}>{categories[cat as CategoryType].title}</option>
          ))}
        </select>

        {formData.category && (
          <>
            <p><strong>Category Title:</strong> {categories[formData.category as CategoryType].title}</p>
            <p><strong>Category Description:</strong> {categories[formData.category as CategoryType].description}</p>

            <label>Subcategory</label>
            <select name="subcategory" value={formData.subcategory} onChange={handleChange}>
              <option value="">Select Subcategory</option>
              {categories[formData.category as CategoryType].subcategories.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </>
        )}

        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Program Name" required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Brief description" required />

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