// app/Newsp/NewsListClient.tsx
'use client';

import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "../lib/firebase";
import LikeButton from "./LikeButton";
import CommentList from "./CommentList";
import ShareButton from "./ShareButton";
import { getGuestId, getGuestName } from "./getGuestId";
import { NewsItem } from "./types";

export default function NewsListClient({ news }: { news: NewsItem[] }) {
  const [SelectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Optional: animate AOS here if needed
  }, []);

  return (
    <>
      {news.map(({ id, title }) => (
        <div key={id}>
          <LikeButton newsId={id} />
          <ShareButton title={title} url={window.location.href} />
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.elements.namedItem("comment") as HTMLInputElement;
              if (!input.value.trim()) return;

              await addDoc(collection(db, "newsUpdates", id, "comments"), {
                text: input.value,
                userId: getGuestId(),
                userName: getGuestName(),
                timestamp: serverTimestamp(),
              });
              input.value = "";
            }}
          >
            <input type="text" name="comment" placeholder="Write a comment..." />
            <button type="submit">Post</button>
          </form>
          <CommentList newsId={id} />
        </div>
      ))}

      {/* Image Modal */}
      {SelectedImage && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 9999
        }} onClick={() => setSelectedImage(null)}>
          <img src={SelectedImage} style={{ maxHeight: '90%', maxWidth: '90%', borderRadius: '10px' }} />
        </div>
      )}
    </>
  );
}