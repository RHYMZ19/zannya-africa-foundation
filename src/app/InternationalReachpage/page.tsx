'use client';

import { FaFacebook, FaHome, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from "react-icons/fa";
import StickyBar from "../StickyBar/StickyBar";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import ContactUs from "../ContactUs/page";
import UgandaNews from "../Uganda/Uganda"; // Your Uganda news component
import Divider from "../Divider/Divider";
import styles from './page.module.css';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import IncreaseImaaa from "./components/IncreaseImaaa";

export default function InternationalReachPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const Maps = dynamic(() => import("../components/Maps"), { ssr: false });

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      <div style={{ justifyItems: 'center', gap: '1%' }}>
      <StickyBar>
        <FaHome style={{ width: '25%', height: '25%' }} color="black" cursor='pointer' onClick={() => router.push('/')} >
          Home
        </FaHome>
        <GetInvolved />
        <Gallery />
        <button 
          onClick={() => router.push('')}
          className={styles.arrowButton}>
          Donate
        </button>
        <IncreaseImaaa src='/log.jpg' alt="log" />
      </StickyBar>
      </div>

      <div style={{ padding: '20px', overflowY: 'scroll' }}>
        <div className={styles.container}>
          <header className={`header ${visible ? 'show' : ""}`}>
            <h1 className={styles.h1}>UGANDA IMPACT</h1>
            <p className={styles.p1}>Zannya Africa Foundation</p>
          </header>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
          <div style={{ width: '70%', maxHeight: '400px' }}>
            <Maps />
          </div>
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
                  <a href="https://facebook.com/zannyaafrica" target="_blank">Facebook</a>
                  <a href="https://twitter.com/zannyaafrica" target="_blank">Twitter/X</a>
                  <a href="https://instagram.com/zannyaafrica" target="_blank">Instagram</a>
                  <a href="https://linkedin.com/company/zannyaafrica" target="_blank">LinkedIn</a>
                </div>
              </div>
        </div>

        <Divider title="News From Uganda" />
        <div style={{ width: '80%', margin: '0 auto' }}>
          <UgandaNews />
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

      <ContactUs />
      <OptionalFeatures />
    </div>
  );
}