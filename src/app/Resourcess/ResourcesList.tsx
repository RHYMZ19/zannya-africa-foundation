"use client";

import { useState } from "react";
import styles from "./Resourcess.module.css";

type Resource = {
  id: string;
  title: string;
  description: string;
  pdf: string;
  category: string;
};

const categories = ["All", "Research Papers", "Reports", "Case Studies"];

export default function ResourcesList({
  initialResources,
}: {
  initialResources: Resource[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredResources =
    selectedCategory === "All"
      ? initialResources
      : initialResources.filter((res) => res.category === selectedCategory);

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      {/* Category Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border:
                selectedCategory === cat
                  ? "2px solid #007bff"
                  : "1px solid #ccc",
              backgroundColor:
                selectedCategory === cat ? "#e7f1ff" : "#fff",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resources List */}
      {filteredResources.length === 0 ? (
        <p>No resources available.</p>
      ) : (
        filteredResources.map((res) => (
          <div key={res.id} className={styles.card}>
            <h3>{res.title}</h3>
            <p>{res.description}</p>
            <a
              href={res.pdf}
              download
              style={{
                color: "#007bff",
                textDecoration: "underline",
              }}
            >
              Download PDF
            </a>
          </div>
        ))
      )}
    </div>
  );
}