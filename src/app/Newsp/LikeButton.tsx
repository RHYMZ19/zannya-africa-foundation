'use client';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import  db  from "../lib/firebase";

export default function LikeButton({ newsId }: { newsId: string }) {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const userId = "demoUser"; // 🔑 replace with logged-in user

  useEffect(() => {
    // count likes
    const unsub = onSnapshot(collection(db, "newsUpdates", newsId, "likes"), (snap) => {
      setLikeCount(snap.size);
      setLiked(snap.docs.some((d) => d.data().userId === userId));
    });
    return () => unsub();
  }, [newsId]);

  const toggleLike = async () => {
    const q = query(
      collection(db, "newsUpdates", newsId, "likes"),
      where("userId", "==", userId)
    );

    onSnapshot(q, async (snap) => {
      if (snap.empty) {
        await addDoc(collection(db, "newsUpdates", newsId, "likes"), {
          userId,
          timestamp: Date.now(),
        });
      } else {
        await deleteDoc(doc(db, "newsUpdates", newsId, "likes", snap.docs[0].id));
      }
    });
  };

  return (
    <button onClick={toggleLike}>
      {liked ? "❤️ Unlike" : "🤍 Like"} ({likeCount})
    </button>
  );
}