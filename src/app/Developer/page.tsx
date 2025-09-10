'use client';
import React from 'react';
import styles from './Developer.module.css'
import { useRouter } from 'next/navigation';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function 
Developer() {
    const router =useRouter();
    return (
     <div className={styles.container}>
        <p className={styles.words}>Developed by eng.SSENABULYA RAHIM Tel: 0743878261</p>
        <p 
        style={{cursor: 'pointer'}}
        onClick={() => router.push('/Terms')}
        >Privacy Policy and Legal Terms</p>
        <p 
        style={{cursor: 'pointer'}}
        onClick={() => router.push('/adminpannel')}
        >Admin(/adminpannel)</p>
        <div className={styles.contactContainer}>
              <h2></h2>
        
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
                <a href="https://wa.me/256743878261" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                  <FaWhatsapp />
                </a>
              </div>
            </div>
       </div>
)}