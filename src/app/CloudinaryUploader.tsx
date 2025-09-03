import React, { useState } from "react";

interface CloudinaryUploaderProps {
  onUploadComplete: (url: string, type: "image" | "video" | "raw", category: string) => void;
  folder?: string; // optional folder in Cloudinary
  category: string;
  resourceType?: "image" | "video" | "raw"; // <-- add this
}

const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({
  onUploadComplete,
  folder,
  category,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Choose a file first");

    setUploading(true);

    const cloudName = "dpwuym7xg";
    const uploadPreset = "zannya_preset"; // unsigned preset

    // ✅ detect resource type automatically
    let resourceType: "image" | "video" | "raw" = "image";
    if (file.type.startsWith("video")) {
      resourceType = "video";
    } else if (file.type === "application/pdf" || !file.type.startsWith("image")) {
      resourceType = "raw";
    }

    // ✅ dynamic endpoint based on file type
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    if (folder) formData.append("folder", folder);

    try {
      const res = await fetch(url, { method: "POST", body: formData });
      const data = await res.json();

      onUploadComplete(data.secure_url, resourceType, category);

      setFile(null);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    }

    setUploading(false);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*,video/*,.pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : `Upload to ${category}`}
      </button>
    </div>
  );
};

export default CloudinaryUploader;