'use client';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";

interface Comment {
  id: string;
  text: string;
  userId: string;
  timestamp?: any;
}

export default function CommentList({ newsId }: { newsId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "newsUpdates", newsId, "comments"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Comment[]);
    });
    return () => unsubscribe();
  }, [newsId]);

  return (
    <div>
      <p>💬 {comments.length} Comments</p>
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map((c) => (
          <p key={c.id}>
            <strong>{c.userId}</strong>: {c.text}
          </p>
        ))
      )}
    </div>
  );
}