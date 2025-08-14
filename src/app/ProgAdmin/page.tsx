'use client';

import db from "../lib/firebase";
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import styles from './ProgAdmin.module.css';



const countries = ['Kenya', 'Uganda', 'Nigeria', 'Ghana'];

type CategoryType =
  | 'Education Programs'
  | 'Health & Wellness Programs'
  | 'Climate & Environmental Programs'
  | 'Youth Empowerment Programs'
  | 'Community Support Programs'
  | 'Technology & Innovation Programs'
  | 'Cultural & Entertainment Programs'

const categories: Record<CategoryType, string[]>= {
  'Education Programs': ['Scholarships', 'Literacy Training'],
  'Health & Wellness Programs': ['Nutrition', 'HIV Awareness'],
  'Climate & Environmental Programs': ['Tree Planting', 'Clean Water'],
  'Youth Empowerment Programs': ['Football', 'Volleyball', 'Athletics'],
  'Community Support Programs': ['Food Aid', 'Women Empowerment'],
  'Technology & Innovation Programs': ['ICT Bootcamp', 'Innovation Hubs'],
  'Cultural & Entertainment Programs': ['Music', 'Dance', 'EcoFit Camp']
};


export default function AdminFilterForm() {
  const [formData, setFormData] = useState<{
    country: '',
    category: CategoryType | '',
    subcategory: '',
    name: '',
    description: '',
    image: '',
    video: ''
  }>({
    country: '',
    category: '',
    subcategory: '',
    name: '',
    description: '',
    image: '',
    video: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement >) => {
    e.preventDefault();
    const { country, category, name, description } = formData;
    if (!country || !category || !name || !description) {
      return alert('All required fields must be filled.');
    }

    try {
      await addDoc(collection(db, 'filters'), formData);
      alert('Filter saved!');
    } catch (error) {
      console.error('Error saving filter:', error);
    }
  };

  return (
    <div className={styles.filtercontainer}>
      <h2>Admin Filter Panel</h2>
      <form onSubmit={handleSubmit} className={styles.filterform}>
        <label>Country</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {Object.keys(categories).map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        {categories[formData.category as CategoryType]?.length > 0 && (
          <>
            <label>Subcategory</label>
            <select name="subcategory" value={formData.subcategory} onChange={handleChange}>
              <option value="">Select Subcategory</option>
              {categories[formData.category as CategoryType].map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </>
        )}

        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Youth Football League" required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Brief description" required />

        <label>Image URL</label>
        <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />

        <label>Video URL</label>
        <input type="url" name="video" value={formData.video} onChange={handleChange} placeholder="https://..." />

        <button type="submit">Save Filter</button>
      </form>
    </div>
  );
}