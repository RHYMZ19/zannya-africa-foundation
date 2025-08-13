'use client';

import  { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import LanguageSelecter from "../LanguageSelecter/LanguageSelecter";
import StickyBar from "../StickyBar/StickyBar";
import styles from './Missions.module.css';
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import { useState, useEffect } from "react";
import ContactUs from "../ContactUs/page";
import ImageOverlayViewer from "../IncreaseImage/page";
import IncreaseImage from "../IncreaseImage/page";
import IncreaseImageM from "./IncreaseImageM/page";
import { getDocs, collection } from "firebase/firestore";
import db from "../lib/firebase";


interface Leader {
  id?: string;
  name: string;
  role: string;
  bio?: string;
  img?: string;
  linkedin?: string;
  twitter?: string;
}

export default function
Missions() {

      const [leaders, setLeaders] = useState<Leader[]>([]);

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
  }, []);

    const router = useRouter();
        const [visible, setVisible] = useState(false);
    
        useEffect(() => {
            setTimeout(() =>
        setVisible(true), 100);}, []);



    return(
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
            < IncreaseImage src='/log.jpg' alt="log"  ></IncreaseImage>
            </StickyBar>


            <div className={styles.container}>
                <header className={`header ${visible ? 'show' : ""}`}>
                <h1 className={styles.h1}>
                    ABOUT US
                </h1>
                <p className={styles.p1}>
                    Mission && Vision
                </p>
                </header>
            </div>


            <div className={styles.mision}>
                <h1 style={{fontSize: '25px', fontStyle: 'italic'}}>Mission</h1>
                <p>
                    Zaanya Africa Foundation exists to 
                    empower young Africans thorugh innovate education, leadership, development and 
                    sustainable community programs that promote health, creativity and opportunity.
                </p>
            </div>

            <div className={styles.Vision}>
                <h1 style={{fontSize: '25px', fontStyle: 'italic'}}>Vission</h1>
                <p>
                    To change lives and build stronger and healthier communities.
                </p>
                <p>
                    To create a future where every young African has tools, confidance and 
                    platforms to lead positive change in their communities and beyond.
                </p>
            </div>

            <div className={styles.History}>
                <h1 style={{fontSize: '25px', fontStyle: 'italic'}}>History</h1>
            </div>

            <div className={styles.Leaders}>
                <h1 style={{fontStyle: 'italic', fontSize: '50px'}}>Leadership</h1>
                <p>
                    Zannya Africa Foundation is driven by a dedicated leadership team that brings 
                    expertise in youth development,
                    policy and community emporment.
                </p>

                <div>
                    <section className={styles.leadershipSection}>
      <h2 className={styles.title}>Our Leadership</h2>
      <div className={styles.grid}>
        {leaders.map((leader) => (
          <div key={leader.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={leader.img} alt={leader.name} className={styles.image} />
            </div>
            <h3 className={styles.name}>{leader.name}</h3>
            <p className={styles.role}>{leader.role}</p>
            <p className={styles.bio}>{leader.bio}</p>
            <div className={styles.socials}>
              {leader.linkedin && (
                <a href={leader.linkedin} target="_blank" rel="noreferrer">
                  <img src="/icons/linkedin.svg" alt="LinkedIn" />
                </a>
              )}
              {leader.twitter && (
                <a href={leader.twitter} target="_blank" rel="noreferrer">
                  <img src="/icons/twitter.svg" alt="Twitter" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
                </div>
            </div>

            <div style={{display: 'flex', margin: '30px'}}>
                <h1 style={{color: 'red', fontStyle: 'italic',textDecoration: 'underline', 
                    cursor: 'pointer',
                    }} onClick={() => router.push('/InternationalReachpage')}>
                    Grobal Presence
                </h1>
            </div>

            <div>
                <section className={styles.partnerssection}>
  <h2 className={styles.sectiontitle}>Our Partners & Affiliations</h2>

  <p className={styles.intro}>
    Zannya Africa Foundation collaborates with local and international partners to drive social innovation and sustainable development. These partnerships enhance our ability to create lasting change across Africa.
  </p>

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
      <li></li>
    </ul>
  </div>

  

  <div className={styles.partnerlogos}>
    <IncreaseImage src="/partners/KHATHA.jpg" alt="KHATHA" />
    <IncreaseImage src="/partners/SwiftSan.jpg" alt="SwiftSan" />
    <IncreaseImage src="/partners/USSIA.jpg" alt="USSIA" />
    <IncreaseImage src="/partners/JOEL.jpg" alt="JOEL" />
    <IncreaseImage src="/partners/Hema.jpg" alt="Hema" />
    <IncreaseImage src="/partners/FAU.jpg" alt="FAU" />
    <IncreaseImage src="/partners/DUYROFIT.jpg" alt="DUYROFIT" />
    {/* Add more logos as needed */}
  </div>

  <div className={styles.ctabox}>
    <p>Interested in partnering with us?</p>
    <a className={styles.ctabutton} href="/contact">Contact Us</a>
  </div>
</section>
            </div>
            <ContactUs></ContactUs>
            <OptionalFeatures></OptionalFeatures>
        </div>
    )
}