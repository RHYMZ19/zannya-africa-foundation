'use client';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { getGuestId } from "./getGuestId";

export default function LikeButton({ newsId }: { newsId: string }) {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const userId = getGuestId();

  // listen to likes changes
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "newsUpdates", newsId, "likes"), (snap) => {
      setLikeCount(snap.size);
      setLiked(snap.docs.some((d) => d.data().userId === userId));
    });
    return () => unsub();
  }, [newsId, userId]);

  const toggleLike = async () => {
    const likesCol = collection(db, "newsUpdates", newsId, "likes");
    const q = query(likesCol, where("userId", "==", userId));
    const snap = await getDocs(q);

    if (snap.empty) {
      await addDoc(likesCol, { userId, timestamp: Date.now() });
    } else {
      await deleteDoc(doc(db, "newsUpdates", newsId, "likes", snap.docs[0].id));
    }
  };

  return (
    <button onClick={toggleLike}>
      {liked ? "❤️ Unlike" : "🤍 Like"} ({likeCount})
    </button>
  );
}