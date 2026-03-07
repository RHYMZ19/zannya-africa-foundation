'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import db from "../lib/firebase";
import Image from "next/image";

import { FaFacebook, FaHome, FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import ContactUs from "../ContactUs/page";
import IncreaseImage from "../components/IncreaseImage";
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
<div className={styles.page}>

{/* HERO SECTION */}
<section className={styles.hero}>
  <div className={styles.heroOverlay}>
    <h1>Zannya Africa Foundation</h1>
    <p>
      Empowering communities through sports, recreation, and youth development
      across Uganda.
    </p>

    <div className={styles.heroButtons}>
      <button onClick={() => router.push("/Donates")}>Donate</button>
      <button onClick={() => router.push("/Contacts")}>Contact Us</button>
    </div>
  </div>
</section>


{/* ABOUT SECTION */}
<section className={styles.about}>
  <div className={styles.aboutText}>
    <h2>Who We Are</h2>
    <p>
      Zannya Africa Foundation (ZAF) is a non-profit organization dedicated to
      empowering communities using sports and recreation activities for
      social and economic development in Uganda.
    </p>

    <p>
      Since 2018 we have been supporting youth and women through sports,
      education, mentorship, and life-skills development.
    </p>
  </div>

  <div className={styles.aboutImage}>
    <Image src="/log.jpg" alt="ZAF Logo" width={400} height={400}/>
  </div>
</section>


{/* MISSION VISION CARDS */}
<section className={styles.cardsSection}>

  <div className={styles.infoCard}>
    <h3>Vision</h3>
    <p>
      To change lives and build stronger and healthier communities.
    </p>
  </div>

  <div className={styles.infoCard}>
    <h3>Mission</h3>
    <p>
      To use sports as a tool for community development, empowerment,
      and sustainability.
    </p>
  </div>

  <div className={styles.infoCard}>
    <h3>Main Objective</h3>
    <p>
      Creating opportunities for youth and women through sports
      and life skills development.
    </p>
  </div>

  <div className={styles.infoCard}>
    <h3>Core Values</h3>
    <ul>
      <li>Integrity</li>
      <li>Inclusiveness</li>
      <li>Teamwork</li>
      <li>Diversity</li>
      <li>Sports for All</li>
    </ul>
  </div>

</section>



{/* LEADERSHIP */}
<section className={styles.leadershipSection}>

<h2>Meet Our Leadership</h2>

<div className={styles.leaderGrid}>

{leaders.map((leader) => (

<div key={leader.id} className={styles.leaderCard}>

  {leader.img && (
    <Image
      src={leader.img}
      alt={leader.name}
      width={300}
      height={300}
      className={styles.leaderImage}
    />
  )}

  <h3>{leader.name}</h3>
  <p className={styles.role}>{leader.role}</p>

  <p className={styles.bio}>{leader.bio}</p>

  <div className={styles.socialIcons}>
    {leader.linkedin && (
      <a href={leader.linkedin} target="_blank">
        <FaLinkedin />
      </a>
    )}

    {leader.twitter && (
      <a href={leader.twitter} target="_blank">
        <FaTwitter />
      </a>
    )}

    {leader.facebook && (
      <a href={leader.facebook} target="_blank">
        <FaFacebook />
      </a>
    )}
  </div>

</div>

))}

</div>

</section>



{/* PARTNERS */}
<section className={styles.partners}>

<h2>Our Partners</h2>

<p>
We collaborate with organizations locally and internationally
to expand our impact across Africa.
</p>

<div className={styles.partnerGrid}>
  <IncreaseImage src="/partners/KHATHA.jpg" alt="KHATHA"/>
  <IncreaseImage src="/partners/SwiftSan.jpg" alt="SwiftSan"/>
  <IncreaseImage src="/partners/USSIA.jpg" alt="USSIA"/>
  <IncreaseImage src="/partners/Hema.jpg" alt="Hema"/>
  <IncreaseImage src="/partners/FAU.jpg" alt="FAU"/>
</div>

</section>



{/* CTA SECTION */}
<section className={styles.cta}>

<h2>Join Us in Creating Change</h2>

<p>
Support our mission to empower communities and create
opportunities for young people through sports.
</p>

<button onClick={() => router.push("/Donates")}>
Donate Now
</button>

</section>



{/* SOCIAL LINKS */}
<footer className={styles.footer}>

<h3>Follow Us</h3>

<div className={styles.footerIcons}>
  <FaFacebook/>
  <FaInstagram/>
  <FaTiktok/>
  <FaXTwitter/>
</div>

<p>
© {new Date().getFullYear()} Zannya Africa Foundation
</p>

</footer>

<ContactUs />
<OptionalFeatures />

</div>
);
}