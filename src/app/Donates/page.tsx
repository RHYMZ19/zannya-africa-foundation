'use client';

import { useEffect, useState } from 'react';
import styles from './Donates.module.css';
import { useRouter } from 'next/navigation';
import { FaFacebook, FaHome, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import Gallery from '../Gallery/Gallery';
import GetInvolved from '../GetInvolved/GetInvolved';
import OptionalFeatures from '../OptionalFeatures/OptionalFeatures';
import StickyBar from '../StickyBar/StickyBar';
import { MdEmail } from 'react-icons/md';
import IncreaseI from './components/IncreaseI';

export default function Donates() {
  const [amount, setAmount] = useState(25);

  const handleDonation = () => {
    alert(`Currently unavailable, kindly use mobile money bellow for $${amount}`);
    // integrate Pesapal or other payment API here
  };

          const router = useRouter();
          const [visible, setVisible] = useState(false);
              useEffect(() => {
                  setTimeout(() =>
              setVisible(true), 100);}, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      <div style={{ justifyItems: 'center', gap: '1%' }}>
        <StickyBar>
                                <FaHome style={{ width: '25%', height: '25%' }} color="black" cursor='pointer' onClick={() => router.push('/')} >
                                Home</FaHome>
                                <GetInvolved />
                                <Gallery />
                                <IncreaseI src='/log.jpg' alt="log" />
                                </StickyBar>
                                </div>

                                <div className={styles.containers}>
                <header className={`header ${visible ? 'show' : ""}`}>
                <h1 className={styles.h1}>
                    DONATE / SUPPORT
                </h1>
                <p className={styles.p1}>
                    Zannya Africa foundation
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
        <p>Email: <a href="mailto:support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></p>
        <p>WhatsApp: <a href="https://wa.me/256786797963">+256 786797963</a></p>
        <p>Mobile: <a href="https://wa.me/256700340576">+256 700 340 576</a></p>
      </div>
    </div>

    <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center',paddingTop: '30px'}}><strong> You can follow us on our socialplatforms:</strong></p>
                                          <div style={{ display: "flex",justifyContent: "center",  gap: "40px", fontSize: "30px",paddingTop: '10px'}}>
                                                    <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                                                      <FaFacebook />
                                                    </a>
                                                    <a href="https://instagram.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}>
                                                      <FaInstagram />
                                                    </a>
                                                    <a href="https://tiktok.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                                                      <FaTiktok />
                                                    </a>
                                                    <a href="https://twitter.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                                                      <FaTwitter />
                                                    </a>
                                                    <a href="https://wa.me/256743878261" target="_blank" rel="noopener noreferrer" style={{ color: 'green' }}>
                                                      <FaWhatsapp />
                                                    </a>
                                                  </div>
                                                  <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center'}}><strong>Or you can email us for:</strong></p>
                                                  <div style={{display: 'flex',paddingTop: '10px', flexDirection: 'row', justifyContent: 'center', gap: '30px'}}>
                                              <ul>
                                              <li><a href="mailto: info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
                                              <li><a href="mailto: support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
                                              </ul>
                                            </div>

    <div className={styles.contactContainer}>
          <h2>Contact Us</h2>
    
          <div className={styles.iconRow}>
            <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <FaFacebook />
            </a>
            <a href="https://twitter.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <FaTwitter />
            </a>
            <a href="mailto:info@zannyaafricafoundation.org" className={styles.iconLink}>
              <MdEmail />
            </a>
            <a href="https://wa.me/256786797963" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <FaWhatsapp />
            </a>
          </div>
        </div>
    <OptionalFeatures></OptionalFeatures>

    
    </div>
  );
}