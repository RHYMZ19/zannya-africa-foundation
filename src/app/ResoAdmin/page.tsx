'use client';

import React, { useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import CloudinaryUploader from "../CloudinaryUploader";

interface ResourceForm {
  title: string;
  description: string;
  category: string;
  pdf?: string;
}

const ResoAdmin = () => {
  const [formData, setFormData] = useState<ResourceForm>({
    title: "",
    description: "",
    category: "",
    pdf: ""
  });
  const [uploading, setUploading] = useState(false);

  const handleUploadComplete = (url: string) => {
    setFormData(prev => ({ ...prev, pdf: url }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      await addDoc(collection(db, "resources"), {
        ...formData,
        timestamp: serverTimestamp()
      });
      alert("Resource added!");
      setFormData({ title: "", description: "", category: "", pdf: "" });
    } catch (err) {
      console.error(err);
      alert("Error adding resource");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: '500px'}}>
      <h2>Add Resource</h2>
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
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Research Papers">Research Papers</option>
          <option value="Reports">Reports</option>
          <option value="Case Studies">Case Studies</option>
        </select>

        {/* PDF Upload */}
        <label>Upload PDF</label>
        <CloudinaryUploader
          onUploadComplete={(url) => handleUploadComplete(url)}
          folder="zannya/resources"
          category="resources"
          resourceType="raw"
        />
        {formData.pdf && (
          <a href={formData.pdf} target="_blank" rel="noreferrer" style={{ color: '#007bff' }}>
            Preview uploaded PDF
          </a>
        )}

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ResoAdmin;