import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase"; // adjust path to your firebase config
import styles from './Contacts.module.css';
import { FaFacebook, FaHome, FaInstagram, FaPhone, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import Gallery from '../Gallery/Gallery';
import GetInvolved from '../GetInvolved/GetInvolved';
import OptionalFeatures from '../OptionalFeatures/OptionalFeatures';
import StickyBar from '../StickyBar/StickyBar';
import { MdEmail } from 'react-icons/md';
import IncreaseImai from './components/IncreaseImai';
import { FaXTwitter } from 'react-icons/fa6';


type Contact = {
  id: string;
  name: string;
  email: string;
};

export default async function ContactPage() {
  // Server-side fetch of Firestore contacts
  const snapshot = await getDocs(collection(db, "contacts"));
  const contactsData: Contact[] = snapshot.docs.map(doc => ({
  id: doc.id,
  ...(doc.data() as Omit<Contact, "id">), // cast Firestore data
}));

  return (
    <div style={{ overflow: 'hidden' }}>
      <div style={{ justifyItems: 'center', gap: '1%' }}>
        <StickyBar>
          <FaHome style={{ width: '25%', height: '25%' }} color="black" cursor='pointer' />
          <GetInvolved />
          <Gallery />
          <a href="/donate" className={styles.arrowButton}>
            Donate
          </a>
          <IncreaseImai src='/log.jpg' alt="log" />
        </StickyBar>
      </div>

      <div className={styles.container}>
        <header className="header show">
          <h1 className={styles.h1}>CONTACT US</h1>
          <p className={styles.p1}>zannya africa foundation</p>
        </header>
      </div>

      <div className={styles.containers}>
        <h1 className={styles.h11}>Contact Us</h1>

        <div className={styles.contactInfo}>
          <p><strong>Address:</strong>Plot 2, Kati House, Nakasero, Ground Floor,</p>
          <p>P.O.Box 168040 Kampala, Uganda</p>
          <p><strong>Phone:</strong>+256 786 797 963</p>
          <p><strong>Mobile:</strong>+256 700 340 576</p>
          <p><strong>Email:</strong> <a href="mailto:zannyaafricafoundation@gmail.com">zannyaafricafoundation@gmail.com</a></p>
          <p><strong>Website:</strong>www.zannyaafrica.org</p>

          <div className={styles.socialLinks}>
            <a href="https://facebook.com/zannyaafricafoundation" target="_blank">Facebook</a>
            <a href="https://twitter.com/zannyaafrica" target="_blank">X</a>
            <a href="https://instagram.com/zannya_africa_foundation" target="_blank">Instagram</a>
            <a href="https://linkedin.com/company/zannyaafrica" target="_blank">LinkedIn</a>
          </div>
        </div>

        <div className={styles.contactForm}>
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
        </div>

        {/* Render Firestore contacts data */}
        {contactsData.map(contact => (
          <div key={contact.id}>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
          </div>
        ))}

      </div>

      <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center',paddingTop: '30px'}}>
        <strong> You can follow us on our socialplatforms:</strong>
      </p>
      <div style={{ display: "flex",justifyContent: "center",  gap: "40px", fontSize: "30px",paddingTop: '10px'}}>
        <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}><FaFacebook /></a>
        <a href="https://instagram.com/zannya_africa_foundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}><FaInstagram /></a>
        <a href="https://tiktok.com/@zannyaafricafdn" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}><FaTiktok /></a>
        <a href="https://x.com/zannyaafrica" target="_blank" rel="noopener noreferrer" style={{ color: "green" }}><FaXTwitter /></a>
      </div>

      <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center'}}>
        <strong>Or you can email us for:</strong>
      </p>
      <div style={{display: 'flex',paddingTop: '10px', flexDirection: 'row', justifyContent: 'center', gap: '30px'}}>
        <ul>
          <li><a href="mailto: info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
          <li><a href="mailto: support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
        </ul>
      </div>

      <div className={styles.contactContainer}>
        <h2>Contact Us</h2>
        <div className={styles.iconRow}>
          <a href="mailto:info@zannyaafricafoundation.org" className={styles.iconLink}><MdEmail /></a>
          <a href="https://wa.me/256786797963" target="_blank" rel="noopener noreferrer" className={styles.iconLink}><FaWhatsapp /></a>
          <a href="tel:+256786797963" className={styles.iconLink}><FaPhone /></a>
        </div>
      </div>

      <OptionalFeatures />
    </div>
  );
}