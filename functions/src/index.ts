import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zannyaafrica@gmail.com",
    pass: "snggmbdauztwlelp", // Gmail App Password
  },
});

export const sendOrderStatusEmail = functions.firestore
  .document("orders/{orderId}")
  .onUpdate(async (change) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.status === after.status) return;

    const userSnap = await admin
      .firestore()
      .doc(`users/${after.userId}`)
      .get();

    const email = userSnap.data()?.email;
    if (!email) return;

    await transporter.sendMail({
      from: "Online Shop <YOUR_EMAIL@gmail.com>",
      to: email,
      subject: "Order Status Update",
      html: `
        <h2>Your order status has changed</h2>
        <p>Status: <b>${after.status}</b></p>
        <p>Total: $${after.total}</p>
      `,
    });
  });
