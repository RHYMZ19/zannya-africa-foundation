import { NextResponse } from "next/server";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { title, url } = await req.json();

    const subsSnap = await getDocs(collection(db, "newsletterSubscribers"));
    const emails = subsSnap.docs.map(doc => doc.data().email);

    if (emails.length === 0) return NextResponse.json({ message: "No subscribers" });

    const messages = emails.map(email => ({
      to: email,
      from: process.env.FROM_EMAIL!,
      subject: `New Newsletter: ${title}`,
      html: `<h1>${title}</h1>
             <p>A new newsletter is live! <a href="${url}">Read it here</a></p>`,
    }));

    await Promise.all(messages.map(msg => sgMail.send(msg)));

    return NextResponse.json({ success: true, message: "Emails sent" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }
}