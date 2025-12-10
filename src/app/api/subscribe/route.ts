import { NextResponse } from "next/server";
import { auth, db } from "../../lib/firebase"; // adjust path
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    // Random password for Firebase Auth
    const password = Math.random().toString(36).slice(-10);

    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save subscriber in Firestore
    await setDoc(doc(db, "newsletterSubscribers", user.uid), {
      email,
      subscribedAt: new Date(),
    });

    // Send welcome email
    await sgMail.send({
      to: email,
      from: process.env.FROM_EMAIL!,
      subject: "Welcome to Weekly Newsletter!",
      html: `<h1>Thank you for subscribing!</h1>
             <p>You will now receive updates whenever a new newsletter is published.</p>`,
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully" });

  } catch (err: any) {
    console.error("Subscription error:", err);

    if (err.code === "auth/email-already-in-use") {
      return NextResponse.json({ success: true, message: "Already subscribed" });
    }

    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
