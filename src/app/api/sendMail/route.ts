import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, motivation } = await req.json();

  if (!name || !email || !motivation) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

    await transporter.sendMail({
      from: `"Zannya Careers" <${process.env.EMAIL_USER}>`,
      to: "careers@zannyafoundation.org", // replace with your real inbox
      subject: "New Internship Application",
      text: `
        Name: ${name}
        Email: ${email}
        Motivation: ${motivation}
      `,
    });

    return NextResponse.json({ success: true, message: "Application sent!" });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send application." },
      { status: 500 }
    );
  }
}