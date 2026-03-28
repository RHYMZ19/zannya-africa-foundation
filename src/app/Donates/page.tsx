'use client';

import styles from './Donates.module.css';
import { onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import db from "../lib/firebase";



import IncreaseImage from "../components/IncreaseImage";


type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  pdf: string;
};

export default function Donates() {
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResourceCategory, setSelectedResourceCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

   useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "resources"), (snapshot) => {
          const items = snapshot.docs.map((doc) => {
            const data = doc.data();
      
            return {
              id: doc.id,
              title: data.title,
              description: data.description,
              category: data.category,
              pdf: data.pdf,
            };
          });
      
          setResources(items);
        });
      
        return () => unsubscribe();
      }, []);

  const presetAmounts = [10000, 25000, 50000, 100000];

  const handleDonate = async () => {
    if (!amount || amount <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setMessage('Processing donation...');

    // 🔥 Replace this with your backend (Pesapal later)
    setTimeout(() => {
      setLoading(false);
      setMessage('✅ Donation successful! Thank you ❤️');
    }, 2000);
  };

  return (
    <section className={styles.section}>

      {/* ================= NAVBAR ================= */}
                  <nav className={styles.navbar}>
                    <IncreaseImage src='/log.jpg' alt="Logo" />
                    <div className={styles.logo}>Zannya Africa Foundation</div>
                    
                    <div
                      className={`${styles.navLinks} ${
                        open ? styles.active : ""
                      }`}
                    >
                      <a href="/">Home</a>
                      
                      {/* RESOURCES DROPDOWN */}
              <div className={styles.dropdown}>
                <span className={styles.dropdownTitle}>Resources ▾</span>
            
                <div className={styles.dropdownMenu}>
            
                  <a href="/articles" className={styles.dropdownItem}>
                    📰 Articles
                  </a>
            
                  <a
                    href="#"
                    className={styles.dropdownItem}
                    onClick={() => setSelectedResourceCategory("Research Papers")}
                  >
                    📄 Research Papers
                  </a>
            
                  <a
                    href="#"
                    className={styles.dropdownItem}
                    onClick={() => setSelectedResourceCategory("Reports")}
                  >
                    📊 Reports
                  </a>
            
                  <a
                    href="#"
                    className={styles.dropdownItem}
                    onClick={() => setSelectedResourceCategory("Case Studies")}
                  >
                    📁 Case Studies
                  </a>
            
                </div>
              </div>
                      <a href="/Videos" >Gallery</a>
                      <a href="/Donates" className={styles.btnPrimary}> Donate</a>
                    </div>
            
                    <div
                      className={styles.hamburger}
                      onClick={() => setOpen(!open)}
                    >
                      ☰
                    </div>
                  </nav>
      
                  {/* ================= RESOURCE MODAL ================= */}
                  {selectedResourceCategory && (
      
                    <div className={styles.modalOverlay}
                    onClick={() => setSelectedResourceCategory(null)}
                    >
                  
                      <div className={styles.modalContent}
                      onClick={(e) => e.stopPropagation()}
                      >
                  
                        <div className={styles.modalHeader}>
                          <h3>{selectedResourceCategory}</h3>
                  
                          <button
                            className={styles.closeBtn}
                            onClick={() => setSelectedResourceCategory(null)}
                          >
                            ✕
                          </button>
                        </div>
                  
                        <div className={styles.resourceList}>
                  
                          {resources
                            .filter(res => res.category === selectedResourceCategory)
                            .map(res => (
                  
                              <div key={res.id} className={styles.resourceItem}>
                  
                                <div>
                                  <strong>{res.title}</strong>
                                  <p>{res.description}</p>
                                </div>
                  
                                <a
                                  href={res.pdf}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.downloadBtn}
                                >
                                  Download PDF
                                </a>
                  
                              </div>
                  
                          ))}
                  
                        </div>
      
                      </div>
                  
                    </div>
                  )}
      
      {/* ================= HERO ================= */}
            <section className={styles.hero}>
              <div className={styles.heroContent}>
                <h1>Zannya Africa Foundation</h1>
                <p>
                 Changing communities through sports
                </p>
                <div className={styles.heroButtons}>
                  <button className={styles.btnPrimary}>
                    Donate Now
                  </button>
                  <button className={styles.btnOutline}>
                    Get Involved
                  </button>
                </div>
              </div>
            </section>

      <div className={styles.container}>

        {/* LEFT SIDE */}
        <div className={styles.info}>
          <h1>Support Our Cause ❤️</h1>
          <p>
            Your donation helps transform lives through education,
            health, and empowerment programs.
          </p>

          <div className={styles.impact}>
            <div>
              <h3>500+</h3>
              <span>People Helped</span>
            </div>
            <div>
              <h3>20+</h3>
              <span>Projects Done</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.box}>
          <h2>Make a Donation</h2>

          {/* PRESET AMOUNTS */}
          <div className={styles.amountGrid}>
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                className={`${styles.amountBtn} ${
                  amount === amt ? styles.active : ''
                }`}
                onClick={() => setAmount(amt)}
              >
                {amt.toLocaleString()} UGX
              </button>
            ))}
          </div>

          {/* CUSTOM AMOUNT */}
          <input
            type="number"
            placeholder="Enter custom amount (UGX)"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className={styles.input}
          />

          {/* PAYMENT METHOD */}
          <div className={styles.payment}>
            <label>
              <input type="radio" name="payment" defaultChecked />
              Mobile Money
            </label>
            <label>
              <input type="radio" name="payment" />
              Card
            </label>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleDonate}
            className={styles.button}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Donate Now'}
          </button>

          {/* MESSAGE */}
          {message && <p className={styles.message}>{message}</p>}
        </div>

      </div>

      {/* ================= FOOTER ================= */}
            <footer className={styles.footer}>
              <div className={styles.footerContainer}>
                
                {/* Contact Info */}
                <div className={styles.footerSection}>
                  <h4>Contact Us</h4>
                  <div className={styles.contactLinks}>
                    <a href="mailto:info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a>
                  </div>
                </div>
            
                {/* Developer Credit */}
                <div className={styles.footerSection}>
                  <h4>Developer</h4>
                  <p>Developed by <strong>SSENABULYA RAHIM</strong></p>
                  <p>Tel: <a href="tel:+256743878261">0743878261</a></p>
                  <p>Email: <a href="mailto:rahimssenabulya82@gmail.com">rahimssenabulya82@gmail.com</a></p>
                </div>
            
                {/* Links */}
                <div className={styles.footerSection}>
                  <h4>Links</h4>
                  <a href="/Terms" className={styles.footerLink}>Privacy Policy & Legal Terms</a>
                  <a href="/adminpannel" className={styles.adminLink}>Admin Panel</a>
                </div>
            
              </div>
            
              {/* Bottom Bar */}
              <div className={styles.footerBottom}>
                <p>© {new Date().getFullYear()} Zannya Africa Foundation. All Rights Reserved.</p>
              </div>
            </footer>

    </section>
  );
}