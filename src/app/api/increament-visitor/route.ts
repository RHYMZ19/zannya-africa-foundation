// app/api/visitors/route.ts
import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../../lib/firebase'; // adjust path

export async function GET() {
  const docRef = doc(db, 'stats', 'visitors');
  const docSnap = await getDoc(docRef);

  let count = 0;
  
  if (docSnap.exists()) {
    count = docSnap.data().count;
  } else {
    count = 220;
  }

  // Increment visitor count
  await setDoc(docRef, { count: count + 1 });

  return NextResponse.json({ count: count + 1 });
}