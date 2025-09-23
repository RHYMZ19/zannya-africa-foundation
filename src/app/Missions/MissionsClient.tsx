'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import db from "../lib/firebase";
import Script from "next/script";
import Image from "next/image";

import { FaFacebook, FaHome, FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import StickyBar from "../StickyBar/StickyBar";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import ContactUs from "../ContactUs/page";
import IncreaseImage from "../components/IncreaseImage";
import IncreaseImge from "./components/IncreaseImge";

import styles from "./Missions.module.css";

interface Leader {
  id?: string;
  name: string;
  role: string;
  bio?: string;
  img?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
}

export default function MissionsClient() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "leadership"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Leader)
        }));
        setLeaders(data);
      } catch (error) {
        console.error("Error fetching leadership data:", error);
      }
    };
    fetchLeaders();

    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Structured Data for AI and SEO */}
            <Script type="application/ld+json" strategy="afterInteractive" id="zaf-structured-data">
              {`
              {
                "@context": "https://schema.org",
                "@type": "NGO",
                "name": "Zannya Africa Foundation",
                "url": "https://www.zannyaafrica.org",
                "logo": "https://www.zannyaafrica.org/logo.jpg",
                "foundingDate": "2018",
                "founders": [{"@type": "Person","name": "Executive Director Name"}],
                "description": "Zannya Africa Foundation (ZAF) empowers communities in Uganda using sports and recreation for social and economic development.",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Plot 2 Kati House, Nakasero, Ground Floor",
                  "addressLocality": "Kampala",
                  "postalCode": "P.O.Box 168040",
                  "addressCountry": "UG"
                },
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "email": "zannyaafricafoundation@gmail.com",
                    "telephone": "+256786797963",
                    "contactType": "customer support"
                  }
                ],
                "sameAs": [
                  "https://facebook.com/zannyaafricafoundation",
                  "https://instagram.com/zannya_africa_foundation",
                  "https://tiktok.com/@zannyaafricafdn",
                  "https://x.com/zannyaafrica"
                ]
              }
              `}
            </Script>
      
            {/* Sticky bar */}
            <div style={{ justifyItems: 'center', gap: '1%' }}>
              <StickyBar>
                <FaHome style={{ width: '25%', height: '25%' }} color="black" cursor='pointer' onClick={() => router.push('/')} />
                <GetInvolved />
                <Gallery />
                <button onClick={() => router.push('/Donates')} className={styles.arrowButton}>Donate</button>
                <IncreaseImge src='/log.jpg' alt="ZAF Logo" />
              </StickyBar>
            </div>
      
            {/* About us */}
            <section className={styles.container}>
              <header className={`header ${visible ? 'show' : ""}`}>
                <h1 className={styles.h1}>ABOUT US</h1>
                <p className={styles.p1}>Zannya Africa Foundation</p>
              </header>
            </section>
      
            {/* Profile */}
            <section className={styles.test}>
              <div className={styles.test2}></div>
              <div className={styles.test1}>
                <div className={styles.pro}>
                  <p style={{ fontWeight: 'bold', fontSize: '30px', marginLeft: '15%' }}>ZANNYA</p>
                  <p style={{ fontWeight: 'bold', fontSize: "15px", marginLeft: '15%', lineHeight: '55%' }}>AFRICA FOUNDATION (ZAF)</p>
                  <p style={{ fontSize: '15px', marginLeft: '15%', marginBottom: '3%' }}>PROFILE</p>
                </div>
              </div>
              <div className={styles.we}>
                <div className={styles.em1}>
                  <p>Plot 2 Kati House, Nakasero, Ground Floor,</p>
                  <p>P.O.Box 168040 Kampala, Uganda</p>
                </div>
                <div className={styles.em2}>
                  <p>Phone:+256 786797963</p>
                  <p>Mobile:+256 700340576</p>
                </div>
                <div className={styles.em3}>
                  <p>Email: <a href="mailto:zannyaafricafoundation@gmail.com">zannyaafricafoundation@gmail.com</a></p>
                  <p>Website: www.zannyaafrica.org</p>
                </div>
              </div>
            </section>
      
            {/* Introduction */}
            <section className={styles.intro1}>
              <div className={styles.intro2}>
                <h2>INTRODUCTION</h2>
                <p>Zannya Africa Foundation (ZAF) is a non-profit organization dedicated to empowering communities through sports and recreation activities for social and economic development in Uganda. Established in 2018 and registered in 2019 (Reg No: 80020002286206), ZAF provides access to sports and recreation to foster transformative skilling for youths and women through play, fun, and learning, cascading into SDGs and other international aspirations.</p>
              </div>
              <div className={styles.intro3}></div>
            </section>
      
            {/* Vision, Mission, Objectives, Core Values */}
            <section className={styles.vis}>
              <div>
                <h2>Vision</h2>
                <p>To change lives and build stronger and healthier communities.</p>
              </div>
              <div>
                <h2>Mission</h2>
                <p>To use sports as a tool for community development, empowerment, and sustainability.</p>
              </div>
              <div>
                <h2>Main Objective</h2>
                <p>To create contexts fostering growth and development for women and young people through sports, enabling them to achieve their full potential.</p>
                <p><strong>Area of operation:</strong> Urban slums of Uganda (Kawempe, Bwaise, Ndeeba) and outreaches in rural areas.</p>
              </div>
              <div>
                <h2>Core Values</h2>
                <ul>
                  <li><strong>Integrity:</strong> Uphold honesty and transparency in all actions.</li>
                  <li><strong>Inclusiveness:</strong> Opportunities for everyone, regardless of background.</li>
                  <li><strong>Teamwork:</strong> Collaborate to achieve goals and support each other.</li>
                  <li><strong>Diversity:</strong> Embrace differences and promote equality.</li>
                  <li><strong>Sports for All:</strong> Encourage participation in sports for everyone.</li>
                </ul>
              </div>
            </section>
      
            {/* Organizational structure */}
            <section className={styles.le}>
              <h2>ZAF Organisation Structure</h2>
              <div className={styles.line}></div>
              <div style={{ justifyItems: 'center', marginTop: '1%' }}>
                <div className={styles.cir1}>EXECUTIVE COUNCIL / BOARD OF DIRECTORS</div>
              </div>
              <div style={{ justifyItems: 'center', marginTop: '3%' }}>
                <div className={styles.cir2}>EXECUTIVE DIRECTOR</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', gap: '7%', marginTop: '3%' }}>
                <div className={styles.cir3}>FINANCIAL MANAGER</div>
                <div className={styles.cir7}>OPERATIONS & PROGRAMS MANAGER</div>
                <div className={styles.cir5}>COMMUNICATIONS MANAGER</div>
              </div>
              <div style={{ display: 'flex', marginBottom: '2%', flexDirection: 'row', justifyItems: 'center', gap: '7%', marginTop: '3%' }}>
                <div className={styles.cir6}>SOCIAL MEDIA HANDLER</div>
                <div className={styles.cir4}>TRAINING ASSISTANTS, FIELD STAFF CONSULTANTS & VOLUNTEERS</div>
                <div className={styles.cir8}>PROGRAMS COORDINATOR</div>
              </div>
            </section>
      
            {/* Leaders */}
            <section className={styles.Leaders}>
              <h2>Our Leaders</h2>
              <div className={styles.grid}>
                {leaders.map((leader) => (
                  <div key={leader.id} className={styles.leaderCard}>
                    {leader.img && (
                      <div className={styles.leaderImage}>
                        <Image src={leader.img} alt={`Photo of ${leader.name}, ${leader.role} at ZAF`} className={styles.image} loading="lazy" />
                      </div>
                    )}
                    <div className={styles.leaderDetails}>
                      <h3>{leader.name}</h3>
                      <p>{leader.role}</p>
                      <p>{leader.bio}</p>
                      <div className={styles.socials}>
                        {leader.linkedin && <a href={leader.linkedin} target="_blank" rel="noreferrer"><FaLinkedin style={{ color: "#0077B5", fontSize: "24px" }} /></a>}
                        {leader.twitter && <a href={leader.twitter} target="_blank" rel="noreferrer"><FaTwitter style={{ color: "#1DA1F2", fontSize: "24px" }} /></a>}
                        {leader.facebook && <a href={leader.facebook} target="_blank" rel="noreferrer"><FaFacebook style={{ color: "#1877F2", fontSize: "24px" }} /></a>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
      
            {/* Partners */}
            <section className={styles.partnerssection}>
              <h2>Our Partners & Affiliations</h2>
              <p>ZAF collaborates with local and international partners to drive social innovation and sustainable development.</p>
              <div className={styles.partnertypes}>
                <h3>Funding & Strategic Partners</h3>
                <ul>
                  <li>KHATHA</li>
                  <li>Hema</li>
                  <li>USSIA</li>
                </ul>
                <h3>Implementation Partners</h3>
                <ul>
                  <li>Swiftsan Hygienic Solutions</li>
                  <li>Duyrofit</li>
                  <li>DEI Embrace foundation</li>
                </ul>
                <h3>Affiliations</h3>
                <ul>
                  <li>ECOFIT CAMP</li>
                </ul>
              </div>
              <div className={styles.partnerlogos}>
                <IncreaseImage src="/partners/KHATHA.jpg" alt="KHATHA - Partner" />
                <IncreaseImage src="/partners/SwiftSan.jpg" alt="SwiftSan - Partner" />
                <IncreaseImage src="/partners/USSIA.jpg" alt="USSIA - Partner" />
                <IncreaseImage src="/partners/JOEL.jpg" alt="JOEL - Partner" />
                <IncreaseImage src="/partners/Hema.jpg" alt="Hema - Partner" />
                <IncreaseImage src="/partners/FAU.jpg" alt="FAU - Partner" />
                <IncreaseImage src="/partners/DUYROFIT.jpg" alt="DUYROFIT - Partner" />
              </div>
              <div className={styles.ctabox}>
                <p>Interested in partnering with us?</p>
                <a className={styles.ctabutton} href="/Contacts">Contact Us</a>
              </div>
            </section>
      
            {/* Conclusion */}
            <section className={styles.conc}>
              <h2>Conclusion</h2>
              <p>ZAF is at the forefront of using sports for community engagement, empowerment, and sustainability. With a clear vision, mission, and core values, ZAF continues to make a tangible difference in the lives of underprivileged individuals through comprehensive programs.</p>
              <p><strong>Contact us to join or support:</strong></p>
              <ul>
                <li>Tel: +256786797963 / +256700340576</li>
                <li>Email: <a href="mailto:zannyaafricafoundation@gmail.com">zannyaafricafoundation@gmail.com</a></li>
                <li>Email: <a href="mailto:contact@zannyaafricafoundation.org">contact@zannyaafricafoundation.org</a></li>
              </ul>
            </section>
      
            {/* Socials */}
            <section style={{ textAlign: 'center', marginTop: '20px' }}>
              <p><strong>Follow us on social platforms:</strong></p>
              <div style={{ display: "flex", justifyContent: "center", gap: "40px", fontSize: "30px", paddingTop: '10px' }}>
                <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}><FaFacebook /></a>
                <a href="https://instagram.com/zannya_africa_foundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}><FaInstagram /></a>
                <a href="https://tiktok.com/@zannyaafricafdn" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}><FaTiktok /></a>
                <a href="https://x.com/zannyaafrica" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}><FaXTwitter /></a>
              </div>
            </section>
      
            {/* Emails */}
            <section style={{ textAlign: 'center', paddingTop: '10px' }}>
              <p><strong>Or email us:</strong></p>
              <ul style={{ display: 'inline-block', textAlign: 'left' }}>
                <li><a href="mailto:info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
                <li><a href="mailto:support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
              </ul>
            </section>
      
            {/* Components */}
            <ContactUs />
            <OptionalFeatures />
      
    </div>
  );
}