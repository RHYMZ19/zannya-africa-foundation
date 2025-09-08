"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Gallery = () => {
  const router = useRouter();

  return (
    <div>
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-6">Gallery</h2>

      <div className="flex justify-center gap-6">
        <button
          onClick={() => router.push("/Videos")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          View
        </button>

        
      </div>
    </div>
    </div>
  );
};

export default Gallery;
