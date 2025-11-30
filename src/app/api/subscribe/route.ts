import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    await addDoc(collection(db, "newsletterSubscribers"), {
      email,
      subscribedAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}