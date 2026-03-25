'use client';

import { useState } from 'react';
import styles from './Donates.module.css';
import { MdEmail } from 'react-icons/md';
import { FaWhatsapp, FaPhone, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Donates() {
  const [amount, setAmount] = useState(25);

  const handleDonation = () => {
    alert(`Currently unavailable, kindly use mobile money for $${amount}`);
  };

  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <h1>Make an Impact</h1>
          <p>Your support transforms lives across Africa</p>

          <div className={styles.tags}>
            <span>🎓 Education</span>
            <span>💊 Health</span>
            <span>🏘 Community</span>
          </div>
        </div>
      </section>

      {/* CARD */}
      <div className={styles.card}>
        <div className={styles.iconCircle}>💖</div>

        <h2>Support Our Mission</h2>
        <p>
          Your donation empowers education, health, and community development across Africa.
        </p>

        <div className={styles.amounts}>
          {[10, 25, 50].map((val) => (
            <button
              key={val}
              className={`${styles.amountBtn} ${amount === val ? styles.active : ''}`}
              onClick={() => setAmount(val)}
            >
              ${val}
            </button>
          ))}

          <input
            type="number"
            placeholder="Enter custom amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className={styles.input}
          />
        </div>

        <button className={styles.donateBtn} onClick={handleDonation}>
          🔒 Donate Now Securely
        </button>

        <p className={styles.powered}>
          ✔ Powered by Pesapal • Mobile Money • 100% Secure
        </p>
      </div>

      {/* TRUST BAR */}
      <div className={styles.trust}>
        <span>🔒 Bank-level Security</span>
        <span>📊 100% Transparent</span>
        <span>❤️ Every Coin Counts</span>
      </div>

      {/* CONTACT */}
      <section className={styles.contact}>
        <h2>Get in Touch</h2>
        <p>Have questions? We'd love to hear from you!</p>

        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <MdEmail size={30} />
            <h4>Email</h4>
            <p>support@zannyaafricafoundation.org</p>
          </div>

          <div className={styles.contactCard}>
            <FaWhatsapp size={30} />
            <h4>WhatsApp</h4>
            <p>+256 786 797 963</p>
          </div>

          <div className={styles.contactCard}>
            <FaPhone size={30} />
            <h4>Mobile</h4>
            <p>+256 700 340 576</p>
          </div>
        </div>
      </section>

      {/* SOCIALS */}
      <section className={styles.socials}>
        <h2>Follow Our Journey</h2>

        <div className={styles.socialGrid}>
          <div className={styles.socialBtn}><FaFacebook /> Facebook</div>
          <div className={styles.socialBtn}><FaInstagram /> Instagram</div>
          <div className={styles.socialBtn}><FaTiktok /> TikTok</div>
          <div className={styles.socialBtn}><FaXTwitter /> X</div>
        </div>
      </section>

    </div>
  );
}