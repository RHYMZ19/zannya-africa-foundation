'use client';
import { FaShareAlt } from "react-icons/fa";

type ShareProps = {
  title: string;
  url: string;
};

export default function ShareButton({ title, url }: ShareProps) {
  const handleShare = async () => {
    if (navigator.share) {
      // Mobile native share
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // Fallback for desktop: show a simple prompt with the URL
      prompt("Copy and share this link:", url);
    }
  };

  return (
    <button onClick={handleShare} style={{ cursor: 'pointer', background: 'none', border: 'none' }}>
      <FaShareAlt size={24} color="#333" />
    </button>
  );
}