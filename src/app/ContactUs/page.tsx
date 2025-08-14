'use client';
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import styles from './ContactUs.module.css';

export default function
ContactUs() {
    return(
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
    )
}