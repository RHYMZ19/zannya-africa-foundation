'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import db from "../lib/firebase";
import Image from "next/image";

import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import IncreaseImage from "../components/IncreaseImage";
import styles from "./Missions.module.css";
import { onSnapshot } from "firebase/firestore";

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

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  pdf: string;
};

export default function MissionsClient() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [activeSection, setActiveSection] = useState("Board");
  const [visible, setVisible] = useState(false);
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


{/* ABOUT SECTION */}
<section className={styles.about}>
  <div className={styles.aboutText}>
    <h2>INTRODUCTION</h2>
    <p>
      Zannya Africa Foundation (ZAF) is a non-profit organization dedicated to empowering the community 
      using sports and recreation activities for social economic development and sustainability in Uganda. 
      Established in 2018 and registered in 2019, Reg No; 80020002286206, 
      with a vision to change lives and build stronger, healthier communities, 
      
    </p>

    <p>
      ZAF provides access to sports and recreation activities to foster transformative 
      skilling for youths and women through play, fun, learning, and catalyzing engagement 
      in life promoting activities. Our work cascades into the SDGs and other international 
      aspirations.We use strategic sportive and recreational activities to leverage structured 
      community activities that involve whole communities. We operate in Urban and rural areas of Uganda.
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



{/* ================= LEADERSHIP AGAIN NEW================= */}

<section className={styles.leadershipSection}>

<h2>Leadership & Governance</h2>

<div className={styles.leadershipFilter}>

<button
className={activeSection==="Board" ? styles.activeFilter : ""}
onClick={()=>setActiveSection("Board")}
>
Board Members
</button>


<button
className={activeSection==="Executive" ? styles.activeFilter : ""}
onClick={()=>setActiveSection("Executive")}
>
Executive Director
</button>


<button
className={activeSection==="Management" ? styles.activeFilter : ""}
onClick={()=>setActiveSection("Management")}
>
Management Team
</button>


<button
className={activeSection==="Officers" ? styles.activeFilter : ""}
onClick={()=>setActiveSection("Officers")}
>
Project Officers
</button>


<button
className={activeSection==="Intern" ? styles.activeFilter : ""}
onClick={()=>setActiveSection("Intern")}
>
Intern
</button>

</div>

{/* ================= BOARD ================= */}

{activeSection==="Board" && (

<>
<h3 className={styles.groupTitle}>Board of Directors</h3>

<div className={styles.levelOne}>

{leaders
.filter(person => person.role.toLowerCase().includes("chair"))
.map(person => (

<div key={person.id} className={styles.leaderCardLarge}>

<div className={styles.imageWrapper}>
<Image
src={person.img || "/default.png"}
alt={person.name}
width={180}
height={180}
className={styles.leaderImage}
/>
</div>

<h3>{person.name}</h3>

<p className={styles.role}>{person.role}</p>

<p>
  {person.bio
    ? person.bio.length > 50
      ? `${person.bio.slice(0, 50)}...`
      : person.bio
    : "Biography coming soon."}
</p>

<button
  className={styles.readMoreBtn}
  onClick={() => setSelectedLeader(person)}
>
  Read More
</button>

<div className={styles.socialIcons}>

{person.linkedin &&
<a href={person.linkedin} target="_blank">
<FaLinkedin/>
</a>}

{person.twitter &&
<a href={person.twitter} target="_blank">
<FaTwitter/>
</a>}

{person.facebook &&
<a href={person.facebook} target="_blank">
<FaFacebook/>
</a>}

</div>

</div>

))}

</div>

<div className={styles.connector}></div>
</>

)}

{/* ================= BOARD MEMBERS ================= */}

<div className={styles.levelGrid}>

{leaders
.filter(person => person.role.toLowerCase().includes("board member"))
.map(person => (

<div key={person.id} className={styles.leaderCard}>

<div className={styles.imageWrapper}>
<Image
src={person.img || "/default.png"}
alt={person.name}
width={160}
height={160}
className={styles.leaderImage}
/>
</div>

<h3>{person.name}</h3>

<p className={styles.role}>{person.role}</p>

<p>
  {person.bio
    ? person.bio.length > 50
      ? `${person.bio.slice(0, 50)}...`
      : person.bio
    : "Biography coming soon."}
</p>

<button
  className={styles.readMoreBtn}
  onClick={() => setSelectedLeader(person)}
>
  Read More
</button>

<div className={styles.socialIcons}>

{person.linkedin &&
<a href={person.linkedin} target="_blank">
<FaLinkedin/>
</a>}

{person.twitter &&
<a href={person.twitter} target="_blank">
<FaTwitter/>
</a>}

{person.facebook &&
<a href={person.facebook} target="_blank">
<FaFacebook/>
</a>}

</div>

</div>

))}

</div>

<div className={styles.connector}></div>

{/* ================= EXECUTIVE DIRECTOR ================= */}

{activeSection==="Executive" && (

<>
<h3 className={styles.groupTitle}>Executive Director</h3>

<div className={styles.levelOne}>

{leaders
.filter(person => person.role.toLowerCase().includes("executive director"))
.map(person => (

<div key={person.id} className={styles.leaderCardLarge}>

<div className={styles.imageWrapper}>
<Image
src={person.img || "/default.png"}
alt={person.name}
width={180}
height={180}
className={styles.leaderImage}
/>
</div>

<h3>{person.name}</h3>

<p className={styles.role}>{person.role}</p>

<p>
  {person.bio
    ? person.bio.length > 50
      ? `${person.bio.slice(0, 50)}...`
      : person.bio
    : "Biography coming soon."}
</p>

<button
  className={styles.readMoreBtn}
  onClick={() => setSelectedLeader(person)}
>
  Read More
</button>

<div className={styles.socialIcons}>

{person.linkedin &&
<a href={person.linkedin} target="_blank">
<FaLinkedin/>
</a>}

{person.twitter &&
<a href={person.twitter} target="_blank">
<FaTwitter/>
</a>}

{person.facebook &&
<a href={person.facebook} target="_blank">
<FaFacebook/>
</a>}

</div>

</div>

))}

</div>

<div className={styles.connector}></div>
</>

)}

{/* ================= MANAGEMENT ================= */}

{activeSection==="Management" && (

<>
<h3 className={styles.groupTitle}>Executive & Management Team</h3>

<div className={styles.levelGrid}>

{leaders
.filter(person =>
person.role.toLowerCase().includes("lead") ||

person.role.toLowerCase().includes("communications officer") ||

person.role.toLowerCase().includes("digital communications officer")
)
.map(person => (

<div key={person.id} className={styles.leaderCard}>

<div className={styles.imageWrapper}>
<Image
src={person.img || "/default.png"}
alt={person.name}
width={160}
height={160}
className={styles.leaderImage}
/>
</div>

<h3>{person.name}</h3>

<p className={styles.role}>{person.role}</p>

<p>
  {person.bio
    ? person.bio.length > 50
      ? `${person.bio.slice(0, 50)}...`
      : person.bio
    : "Biography coming soon."}
</p>

<button
  className={styles.readMoreBtn}
  onClick={() => setSelectedLeader(person)}
>
  Read More
</button>

<div className={styles.socialIcons}>

{person.linkedin &&
<a href={person.linkedin} target="_blank">
<FaLinkedin/>
</a>}

{person.twitter &&
<a href={person.twitter} target="_blank">
<FaTwitter/>
</a>}

{person.facebook &&
<a href={person.facebook} target="_blank">
<FaFacebook/>
</a>}

</div>

</div>

))}

</div>

<div className={styles.connector}></div>
</>

)}

{/* ================= PROJECT OFFICERS ================= */}

{activeSection==="Officers" && (

<>
<h3 className={styles.groupTitle}>Project Officers</h3>

<div className={styles.levelGrid}>

{leaders
.filter(person => person.role.toLowerCase().includes("project officer"))
.map(person => (

<div key={person.id} className={styles.leaderCard}>

<div className={styles.imageWrapper}>
<Image
src={person.img || "/default.png"}
alt={person.name}
width={160}
height={160}
className={styles.leaderImage}
/>
</div>

<h3>{person.name}</h3>

<p className={styles.role}>{person.role}</p>

<p>
  {person.bio
    ? person.bio.length > 50
      ? `${person.bio.slice(0, 50)}...`
      : person.bio
    : "Biography coming soon."}
</p>

<button
  className={styles.readMoreBtn}
  onClick={() => setSelectedLeader(person)}
>
  Read More
</button>

</div>

))}

</div>

<div className={styles.connector}></div>
</>

)}

{/* ================= INTERN ================= */}

{activeSection==="Intern" && (

<>
<h3 className={styles.groupTitle}>Intern</h3>

<div className={styles.levelOne}>

{leaders
.filter(person => person.role.toLowerCase().includes("intern"))
.map(person => (

<div key={person.id} className={styles.leaderCardLarge}>

<div className={styles.imageWrapper}>
<Image
src={person.img || "/default.png"}
alt={person.name}
width={180}
height={180}
className={styles.leaderImage}
/>
</div>

<h3>{person.name}</h3>

<p className={styles.role}>{person.role}</p>

<p>
  {person.bio
    ? person.bio.length > 50
      ? `${person.bio.slice(0, 50)}...`
      : person.bio
    : "Biography coming soon."}
</p>

<button
  className={styles.readMoreBtn}
  onClick={() => setSelectedLeader(person)}
>
  Read More
</button>

</div>

))}

</div>
</>

)}


{selectedLeader && (
  <div
    className={styles.modalOverlay}
    onClick={() => setSelectedLeader(null)}
  >
    <div
      className={styles.modal}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className={styles.closeBtn}
        onClick={() => setSelectedLeader(null)}
      >
        ✕
      </button>

      <Image
        src={selectedLeader.img || "/default.png"}
        alt={selectedLeader.name}
        width={180}
        height={180}
        className={styles.modalImage}
      />

      <h2>{selectedLeader.name}</h2>

      <h4>{selectedLeader.role}</h4>

      <p>{selectedLeader.bio}</p>
    </div>
  </div>
)}
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

</div>
);
}