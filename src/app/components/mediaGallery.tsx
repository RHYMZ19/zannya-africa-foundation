'use client';

import React from "react";
import Image from "next/image";

interface MediaItem {
  category: string;
  url: string;
  type: "image" | "video";
}

interface MediaGalleryProps {
  items: MediaItem[];
  category: string;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ items , category}) => {
  return (
    <div>
      {items
      .filter(item => item.category === category)
      .map((item, i) =>
        item.type === "image" ? (
          <Image key={i} src={item.url} alt="uploaded" width="300" />
        ) : (
          <video key={i} src={item.url} controls width="300" > <source src={item.url} type="video/mp4"></source></video>
        )
      )}
    </div>
  );
};

export default MediaGallery;