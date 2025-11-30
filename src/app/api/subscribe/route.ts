import { NextResponse } from "next/server";
import { auth, db } from "../../lib/firebase"; // your Firebase setup
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    // Use a random password
    const password = Math.random().toString(36).slice(-10);

    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save extra data in Firestore
    await setDoc(doc(db, "newsletterSubscribers", user.uid), {
      email,
      subscribedAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    // Narrow the type of err
    const error = err as AuthError;

    console.error("Subscription error:", error);

    if (error.code === "auth/email-already-in-use") {
      return NextResponse.json({ success: true, message: "Already subscribed" });
    }

    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}