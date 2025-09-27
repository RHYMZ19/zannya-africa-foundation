'use client';

import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection, serverTimestamp, getDocs, deleteDoc, doc } from "firebase/firestore";
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

  // ✅ New state to store existing resources
  const [resources, setResources] = useState<(ResourceForm & { id: string })[]>([]);

  // Fetch existing resources from Firestore
  const fetchResources = async () => {
    try {
      const snapshot = await getDocs(collection(db, "resources"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as ResourceForm) }));
      setResources(data);
    } catch (err) {
      console.error("Error fetching resources:", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

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
      fetchResources(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Error adding resource");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete function
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    try {
      await deleteDoc(doc(db, "resources", id));
      alert("Resource deleted successfully!");
      fetchResources(); // refresh list
    } catch (err) {
      console.error("Error deleting resource:", err);
      alert("Failed to delete resource.");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: '500px', background: '#f4f4f4', borderRadius: '12px', marginTop: '7%' }}>
      <h2>Resource Upload</h2>
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

      {/* ✅ Display existing resources with delete option */}
      <div style={{ marginTop: "30px" }}>
        <h3>Existing Resources</h3>
        {resources.length === 0 ? (
          <p>No resources found.</p>
        ) : (
          <ul>
            {resources.map(r => (
              <li key={r.id} style={{ marginBottom: "10px" }}>
                <strong>{r.title}</strong> (Category: {r.category})  
                <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(r.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ResoAdmin;