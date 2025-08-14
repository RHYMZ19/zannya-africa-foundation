'use client';

import { useEffect, useState } from 'react';
import styles from './Donates.module.css';
import { useRouter } from 'next/navigation';
import { FaFacebook, FaHome, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import Gallery from '../Gallery/Gallery';
import GetInvolved from '../GetInvolved/GetInvolved';
import LanguageSelecter from '../LanguageSelecter/LanguageSelecter';
import OptionalFeatures from '../OptionalFeatures/OptionalFeatures';
import StickyBar from '../StickyBar/StickyBar';
import { MdEmail } from 'react-icons/md';
import Image from 'next/image';

export default function Donates() {
  const [amount, setAmount] = useState(25);

  const handleDonation = () => {
    alert(`Redirecting to payment for $${amount}`);
    // integrate Pesapal or other payment API here
  };

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
                                router.push('/Donates')}
                                className={styles.arrowButton}>Donate
                                </button>
                                < Image src='/log.jpg' alt="log" width={100} height={100}></Image>
                                </StickyBar>

                                <div className={styles.containers}>
                <header className={`header ${visible ? 'show' : ""}`}>
                <h1 className={styles.h1}>
                    DONATE
                </h1>
                <p className={styles.p1}>
                    Mission && Vision
                </p>
                </header>
            </div>


    <div className={styles.container}>
      <h2 className={styles.h2}>Support Our Mission</h2>
      <p className={styles.p}>Your donation empowers change in education, health, and community development.</p>

      <div className={styles.amounts}>
        {[10, 25, 50, 100].map((val) => (
          <button key={val} onClick={() => setAmount(val)} className={styles.amountBtn}>
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

      <div className={styles.trust}>
        <p>🔒 Secure & Encrypted • 📈 Transparent Use • ❤️ Every Coin Counts</p>
      </div>

      <div className={styles.contact}>
        <h4>Have questions or want to donate in-kind?</h4>
        <p>Email: <a href="mailto:donate@zannya.org">donate@zannya.org</a></p>
        <p>WhatsApp: <a href="https://wa.me/256700340576">+256 700340576</a></p>
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