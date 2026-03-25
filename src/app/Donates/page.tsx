'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './DonatesNew.module.css';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaHome } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Gallery from '../Gallery/Gallery';
import GetInvolved from '../GetInvolved/GetInvolved';
import OptionalFeatures from '../OptionalFeatures/OptionalFeatures';
import StickyBar from '../StickyBar/StickyBar';
import IncreaseI from './components/IncreaseI';
import { FaXTwitter } from 'react-icons/fa6';

export default function Donates() {
  const [amount, setAmount] = useState(25);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleDonation = () => {
    alert(`Currently unavailable, kindly use mobile money below for $${amount}`);
  };

  return (
    <div className={styles.page}>
      {/* Sticky Top Navigation */}
      <StickyBar>
        <FaHome onClick={() => router.push('/')} className={styles.navIcon} />
        <GetInvolved />
        <Gallery />
        <IncreaseI src='/log.jpg' alt="log" />
      </StickyBar>

      {/* Hero Section */}
      <section className={`${styles.hero} ${visible ? styles.show : ''}`}>
        <div className={styles.heroContent}>
          <h1>Support Our Mission</h1>
          <p>Your donation empowers change in education, health, and community development.</p>
          <button onClick={handleDonation} className={styles.heroBtn}>
            Donate now
          </button>
        </div>
      </section>

      {/* Donation Amounts */}
      <section className={styles.donationSection}>
        <h2>Choose Your Donation</h2>
        <div className={styles.amounts}>
          {[10, 25, 50, 100].map((val) => (
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
            min="1"
            placeholder="Custom"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className={styles.customInput}
          />
        </div>
        <button onClick={handleDonation} className={styles.donateBtn}>
          Donate with Pesapal / Mobile Money
        </button>
        <p className={styles.trust}>🔒 Secure & Encrypted • 📈 Transparent • ❤️ Every Coin Counts</p>
      </section>

      {/* Contact & Social */}
      <section className={styles.contactSection}>
        <h2>Contact Us</h2>
        <div className={styles.contactCards}>
          <div>
            <MdEmail className={styles.contactIcon} />
            <p><a href="mailto:info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></p>
          </div>
          <div>
            <FaWhatsapp className={styles.contactIcon} />
            <p><a href="https://wa.me/256786797963" target="_blank">+256 786797963</a></p>
          </div>
        </div>

        <p className={styles.socialPrompt}>Follow us on social media:</p>
        <div className={styles.socialIcons}>
          <a href="https://facebook.com/zannyaafricafoundation" target="_blank"><FaFacebook /></a>
          <a href="https://instagram.com/zannya_africa_foundation" target="_blank"><FaInstagram /></a>
          <a href="https://tiktok.com/@zannyaafricafdn" target="_blank"><FaTiktok /></a>
          <a href="https://x.com/zannyaafrica" target="_blank"><FaXTwitter /></a>
          <a href="https://wa.me/256786797963" target="_blank"><FaWhatsapp /></a>
        </div>
      </section>

      {/* Optional Features */}
      <OptionalFeatures />
    </div>
  );
}