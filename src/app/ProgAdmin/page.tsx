'use client';

import db from "../lib/firebase";
import React, {  useState } from 'react';
import { collection, addDoc,  } from 'firebase/firestore';
import styles from './ProgAdmin.module.css';
import CloudinaryUploader from "../CloudinaryUploader";
import Image from "next/image";


const countries = ['Kenya', 'Uganda', 'Nigeria', 'Ghana'];

type CategoryType =

  | 'Skilling and Livelihood'
  | 'Reproductive & Physical Health Awareness'
  | 'Climate Justice Advocacy'

const categories: Record<CategoryType, string[]>= {

  'Skilling and Livelihood': ['ABOUT','Vocational Training', 'Income Generating Activities', 'Sports Skilling', 'Mentorship on Life Skills'],
  'Reproductive & Physical Health Awareness': [
    'ABOUT',
    'Sexual and REproductive Health Education',
    'Menstrual Health Management',
    'Family Planning, career guidance and counselling',
    'Organized sports and fitness',
    'Nutrition & Health Eating',
    'Disease Prevention and Management',
    'Community Outreaches',
    'Partnerships and Collaborations',
    'Advocacy efforts'
  ],
  'Climate Justice Advocacy': [
    'ABOUT',
    'Climate Change Awareness and Education',
    'Advocacy and Policy Influence',
    'The ZAF Ecofit Camp',
    'Climate Initiative in School',
    'Sports Clubs for Community Cleaning',
    'Fruit Tree Plant per Home Initiative',
    'Community-Led Climate Action'
  ]
};




export default function AdminFilterForm() {
  
  const [formData, setFormData] = useState<{
    country: '';
    category: CategoryType | '';
    subcategory: '';
    name: '';
    description: '';
    images: string[];
    videos: string[];
  }>({
    country: '',
    category: '',
    subcategory: '',
    name: '',
    description: '',
    images: [] ,
    videos: [] ,
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

  

  
  const handleUploadComplete = async (url: string, type: "image" | "video", ) => {
      setFormData(prev => ({
    ...prev,
    [type === "image" ? "images" : "videos"]: [
      ...(type === "image" ? prev.images : prev.videos), url ], // automatically sets formData.image or formData.video
  }));
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
        <CloudinaryUploader onUploadComplete={(url) => handleUploadComplete(url, "image")} 
              folder="zannya/uploads" 
              category="teachings" />
              {/* Optional: show all uploaded images */}
                  {formData.images.map((img, i) => (
                    <div key={i} style={{ width: '150px', height: '100px', margin: '5px' }}>
                      <Image src={img} alt={`Image ${i}`} width={150} height={100} style={{ objectFit: 'cover' }} />
                   </div>    
                  ))}
        

        <label>Video URL</label>
        <CloudinaryUploader onUploadComplete={(url) => handleUploadComplete(url, "video")} 
              folder="zannya/uploads" 
              category="teachings" />
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