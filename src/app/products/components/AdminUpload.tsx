'use client';

import { addDoc, collection } from "firebase/firestore";
import { useState, useContext } from "react";
import { db } from "../../lib/firebase";
import { Product } from "../types/Product";
import { AuthContext } from "../context/AuthContext";
import CloudinaryUploader from "../../CloudinaryUploader";
import Image from "next/image";

const AdminUpload: React.FC = () => {
  const { user, loading } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [images, setImages] = useState<string[]>([]);



  if (loading) return <p>Loading...</p>;  // ✅ Wait for auth

  if (user?.role !== "admin") return null; // ✅ Only admin sees this

  const upload = async () => {
    if (!name || !price || images.length === 0) {
      return alert("Fill all fields and upload at least one image");
    }

    const product: Product = {
      name,
      price: Number(price),
      images, // ✅ Cloudinary images
      quality: "Premium",
      location: "Uganda",
    };

    await addDoc(collection(db, "products"), product);
    alert("Product uploaded");

    setName("");
    setPrice("");
    setImages([]);
  };

  const handleUploadComplete = (url: string) => {
    setImages((prev) => [...prev, url]);
  };

  return (
    <div>
      <h3>Admin Upload</h3>

      <input
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      {/* ✅ Cloudinary uploader */}
      <CloudinaryUploader
        onUploadComplete={handleUploadComplete}
        folder="zannya/products"
        category="products"
      />

      {/* ✅ Preview uploaded images */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {images.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt="Product image"
            width={120}
            height={120}
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
        ))}
      </div>

      <button onClick={upload} style={{ marginTop: "15px" }}>
        Upload
      </button>
    </div>
  );
};

export default AdminUpload;
