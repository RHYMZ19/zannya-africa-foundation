'use client';

import React, { useEffect, useState } from 'react';
import styles from './Contacts.module.css';
import { useRouter } from 'next/navigation';
import { FaFacebook, FaHome, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import Gallery from '../Gallery/Gallery';
import GetInvolved from '../GetInvolved/GetInvolved';
import LanguageSelecter from '../LanguageSelecter/LanguageSelecter';
import OptionalFeatures from '../OptionalFeatures/OptionalFeatures';
import StickyBar from '../StickyBar/StickyBar';
import { MdEmail } from 'react-icons/md';

export default function ContactPage() {

    const router = useRouter();
    const [visible, setVisible] = useState(false);
            
                useEffect(() => {
                    setTimeout(() =>
                setVisible(true), 100);}, []);
  return (
    <div>
    <StickyBar>
                                    <FaHome size={24} color="black" cursor='pointer' onClick={() => router.push('/')} >
                                    Home</FaHome>
                                    <GetInvolved />
                                    <LanguageSelecter />
                                    <Gallery />
                                    <button onClick={() =>
                                    router.push('')}
                                    className={styles.arrowButton}>Donate
                                    </button>
                                    < img src='/log.jpg' alt="log" width={100} height={100}></img>
                                    </StickyBar>

                                    <div className={styles.container}>
                <header className={`header ${visible ? 'show' : ""}`}>
                <h1 className={styles.h1}>
                    CONTACT US
                </h1>
                <p className={styles.p1}>
                    &quot;zannya africa foundation&quot;
                </p>
                </header>
            </div>
    <div className={styles.containers}>
      <h1 className={styles.h1}>Contact Us</h1>

      <div className={styles.contactInfo}>
        <p><strong>Address:</strong>&quot;Plot 12, Charity Road, Kampala, Uganda&quot;</p>
        <p><strong>Phone:</strong>&quot;+256 700 123 456&quot;</p>
        <p><strong>Email:</strong> <a href="mailto:info@zannyaafrica.org">&quot;info@zannyaafrica.org&quot;</a></p>

        <div className={styles.socialLinks}>
          <a href="https://facebook.com/zannyaafrica" target="_blank">Facebook</a>
          <a href="https://twitter.com/zannyaafrica" target="_blank">Twitter/X</a>
          <a href="https://instagram.com/zannyaafrica" target="_blank">Instagram</a>
          <a href="https://linkedin.com/company/zannyaafrica" target="_blank">LinkedIn</a>
        </div>
      </div>

      <div className={styles.contactForm}>
        <form className={styles.form} action="https://formspree.io/f/your-form-id" method="POST">
          <label className={styles.label} htmlFor="name">Your Name</label>
          <input className={styles.input} type="text" id="name" name="name" required />

          <label className={styles.label} htmlFor="email">Your Email</label>
          <input className={styles.input} type="email" id="email" name="email" required />

          <label className={styles.label}htmlFor="message">Your Message</label>
          <textarea className={styles.textarea} id="message" name="message" rows={5} required></textarea>

          <button className={styles.button}type="submit">Send Message</button>
        </form>
      </div>
    </div>

    <div className={styles.contactContainer}>
      <h2>Contact Us</h2>

      <div className={styles.iconRow}>
        <a href="https://facebook.com/zannya" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
          <FaFacebook />
        </a>
        <a href="https://twitter.com/zannya" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
          <FaTwitter />
        </a>
        <a href="mailto:info@zannya.org" className={styles.iconLink}>
          <MdEmail />
        </a>
        <a href="https://wa.me/256700000000" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
          <FaWhatsapp />
        </a>
      </div>
    </div>
    <OptionalFeatures></OptionalFeatures>
    </div>
  );
}