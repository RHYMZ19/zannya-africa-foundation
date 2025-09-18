'use client';
import React from 'react';
import styles from './Contacts.module.css';

export default function ContactForm() {
  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const res = await fetch("/api/sendContactMail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
          }),
        });

        if (res.ok) {
          alert("Message sent successfully!");
          e.currentTarget.reset();
        } else {
          alert("Failed to send message. Try again.");
        }
      }}
    >
      <label className={styles.label} htmlFor="name">Your Name</label>
      <input className={styles.input} type="text" id="name" name="name" required />

      <label className={styles.label} htmlFor="email">Your Email</label>
      <input className={styles.input} type="email" id="email" name="email" required />

      <label className={styles.label} htmlFor="message">Your Message</label>
      <textarea className={styles.textarea} id="message" name="message" rows={5} required></textarea>

      <button className={styles.button} type="submit">Send Message</button>
    </form>
  );
}