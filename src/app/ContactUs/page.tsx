'use client';
import { FaFacebook, FaPhone, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import styles from './ContactUs.module.css';

export default function
ContactUs() {
    return(
        <div className={styles.contactContainer}>
              <h2>Contact Us</h2>
        
              <div className={styles.iconRow}>
                
                <a href="mailto:info@zannyaafricafoundation.org" className={styles.iconLink}>
                  <MdEmail />
                </a>
                <a href="https://wa.me/256786797963" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                  <FaWhatsapp />
                </a>
                <a href="tel:+256786797963" className={styles.iconLink}>
                    <FaPhone />
                </a>
              </div>
            </div>
    )
}