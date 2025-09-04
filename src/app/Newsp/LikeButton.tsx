'use client';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { getGuestId } from "./getGuestId";

export default function LikeButton({ newsId }: { newsId: string }) {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const userId = getGuestId(); // use guest ID

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "newsUpdates", newsId, "likes"), (snap) => {
      setLikeCount(snap.size);
      setLiked(snap.docs.some((d) => d.data().userId === userId));
    });
    return () => unsub();
  }, [newsId, userId]);

  const toggleLike = async () => {
    const q = query(
      collection(db, "newsUpdates", newsId, "likes"),
      where("userId", "==", userId)
    );

    const snap = await getDocs(q);

  if (snap.empty) {
    // Add like
    await addDoc(collection(db, "newsUpdates", newsId, "likes"), {
      userId,
      timestamp: Date.now(),
    });
  } else {
    // Remove like
    await deleteDoc(doc(db, "newsUpdates", newsId, "likes", snap.docs[0].id));
  }
  };

  return (
    <button onClick={toggleLike}>
      {liked ? "❤️ Unlike" : "🤍 Like"} ({likeCount})
    </button>
  );
}