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
    <div style={{ overflow: 'hidden',background: 'linear-gradient(to right, #e0f7fa, #e1bee7)', }}>
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
                <h1 style={{fontWeight: 'bold', fontSize: '35px'}}>INTRODUCTION</h1>
                <p style={{}}>Zannya Africa Foundation (ZAF) is a non-profit organization dedicated to empowering the community using sports and
                   recreation activities for social economic development and sustainability in Uganda. Established in 2018 and registered in 2019,
                   Reg No; 80020002286206, with a vision to change lives and build stronger, healthier communities, ZAF provides access to
                   sports and recreation activities to foster transformative skilling for youths and women through play, fun, learning, and catalyzing engagement in life promoting activities. Our work cascades into the SDGs and other international aspirations.We use
                   strategic sportive and recreational activities to leverage structured community activities that involve whole communities. We
                    operate in Urban and rural areas of Uganda.
                    </p>
              </div>
              <div className={styles.intro3}></div>
            </section>
      
            {/* Vision, Mission, Objectives, Core Values */}
            <div className={styles.vis}>
                          <p style={{marginLeft: '2%', marginTop: '10%'}}>
                            <h1 style={{color: 'white'}}>Vision</h1>
                            <p style={{fontSize: '100%', fontFamily: 'initial'}}>To change lives and build stronger and healthier communities</p>
                          </p>
            
                          <p style={{marginLeft: '2%', marginTop: '2.5%'}}>
                            <h1 style={{color: 'white'}}>Mission</h1>
                            <p style={{fontSize: '100%', fontFamily: 'initial'}}>To use sports as a tool for community development, empowerment, and sustainability.</p>
                          </p>
            
                          <p style={{marginLeft: '2%', marginTop: '5%'}}>
                            <h1 style={{color: 'white'}}>Main Objective</h1>
                            <p style={{fontSize: '100%', fontFamily: 'initial'}}>To create contexts fostering growth and development for women and young people through sports,
                              enabling them to achieve their full potential.
                            </p>
                            <p style={{fontSize: '100%', fontFamily: 'initial'}}><strong style={{fontWeight: 'bold', color: 'white'}}>Area of operation: </strong>Urban slums of Uganda specifically central region of Kawempe,
                            Bwaise, Ndeeba, and outreaches in rural areas of Uganda.</p>
                          </p>
            
                          <p style={{marginLeft: '2%', marginTop: '5%'}}>
                            <h1 style={{color: 'white'}}>Core Values</h1>
                            <p style={{fontSize: '100%', fontFamily: 'initial'}}><strong style={{fontWeight: 'bold', color: 'white'}}>Integrity:  </strong>We upholds the highest standards of honesty and transparency in all our actions.</p>
                            <p style={{fontSize: '100%', fontFamily: 'initial'}}><strong style={{fontWeight: 'bold', color: 'white'}}>Inclusiveness: </strong>We believe in creating opportunities for everyone, regardless of their background.</p>
                            <p style={{fontSize: '100%', fontFamily: 'initial'}}><strong style={{fontWeight: 'bold', color: 'white'}}>Teamwork:  </strong>We work collaboratively tp achieve our goal and support each other.</p>
                            <p style={{fontSize: '100%', fontFamily: 'initial'}}><strong style={{fontWeight: 'bold', color: 'white'}}>Diversity:  </strong>We embrace and celebrate differances, promoting equality and understanding.</p>
                            <p style={{fontSize: '100%', fontFamily: 'initial'}}><strong style={{fontWeight: 'bold', color: 'white'}}>Sports for All: </strong>We believe that everyone should have the opportunity to participate in sports.</p>
                          </p>
                        </div>
            
      
            {/* Organizational structure */}
            <div className={styles.le}>
              <h1 style={{color: 'maroon', fontSize: '100%', marginTop: '2%'}}>ZAF Organisation Structure</h1>
              <div className={styles.line}></div>
              <div style={{justifyItems: 'center',marginTop: '1%'}}>
              <div className={styles.cir1}>EXECUTIVE COUCIL/ BOARD OF DIRECTORS</div>
              </div>
              <div style={{justifyItems: 'center',marginTop: '3%'}}>
              <div className={styles.cir2}>EXECUTIVE DIRECTOR</div>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', justifyItems: 'center', gap: '7%',marginTop: '3%'}}>
              <div className={styles.cir3}>FINANCIAL MANAGER</div>
              <div className={styles.cir7}>OPERATIONS & PROGRAMS MANAGER</div>
              <div className={styles.cir5}>COMMUNICATIONS MANAGER</div>
              </div>
              <div style={{display: 'flex',marginBottom: '2%', flexDirection: 'row', justifyItems: 'center', gap: '7%',marginTop: '3%'}}>
              <div className={styles.cir6}>SOCIAL MEDIA HANDLER</div>
              <div className={styles.cir4}>TRAINING ASISTANTS, FIELD STUFF CONSULTANTS & VOLUNTEERS</div>
              <div className={styles.cir8}>PROGRAMS CO-ORDINATOR</div>
              </div>
            </div>
      
            {/* Leaders */}
            <div className={styles.Leaders}>
                

                <div style={{width: '100%', display: 'flex', flexDirection: 'column',height: '100%',background: 'linear-gradient(to right, #e0f7fa, #e1bee7)'}}>
        <section className={styles.leadershipSection}>
      <h2 className={styles.title}>Our Leaders</h2>
      <div className={styles.grid}>
        {leaders.map((leader) => (
          <div key={leader.id} className={styles.leaderCard}>
  {leader.img && (
    <div className={styles.leaderImage}>
      <Image src={leader.img} alt={leader.name} className={styles.image} loading="lazy" />
    </div>
  )}
  <div className={styles.leaderDetails}>
    <h3 className={styles.name}>{leader.name}</h3>
    <p className={styles.role}>{leader.role}</p>
    <p className={styles.bio}>{leader.bio}</p>
    <div className={styles.socials}>
      {leader.linkedin && (
        <a href={leader.linkedin} target="_blank" rel="noreferrer">
          <FaLinkedin style={{ color: "#0077B5", fontSize: "24px" }} />
        </a>
      )}
      {leader.twitter && (
        <a href={leader.twitter} target="_blank" rel="noreferrer">
          <FaTwitter style={{ color: "#1DA1F2", fontSize: "24px" }} />
        </a>
      )}
      {leader.facebook && (
        <a href={leader.facebook} target="_blank" rel="noreferrer">
          <FaFacebook style={{ color: "#1877F2", fontSize: "24px" }} />
        </a>
      )}
    </div>
  </div>
</div>
        ))}
      </div>
    </section>
                </div>
            </div>
      
            {/* Partners */}
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
    <a className={styles.ctabutton} href="/Contacts">Contact Us</a>
  </div>
</section>
            </div>
            {/* Conclusion */}
            <div className={styles.conc}>
              <div className={styles.conc1}>
                <p style={{marginLeft: '3%'}}>
                  <h1 style={{marginTop: '1.5%'}}>Conclusion</h1>
                  <p style={{color: ' #ccc'}}>Zannya Africa Foundation (ZAF) is at the forefront of using sports as a powerful tool for driving community engagement, empowerment,
                     development and sustainability. With a clear vision, dedicated mission and a set of core values guiding its efforts. ZAF is 
                     making a tangible difference in the lives of underprivileged individuals. through our comprehensive programs and unwavering
                     commitment, ZAF continues to build stronger, healthier, an dmore resilient communities in Uganda.
                  </p>
                </p>

                <p style={{marginLeft: '5%',marginTop: '1.5%'}}>
                  <p><strong>To join or to support us please contact us:</strong></p>
                  <div className={styles.line1}></div>
                  <p><strong>Tel:+256786797963 / +256700340576</strong></p>
                  <p><strong>Email:<a href="mailto: zannyaafricafoundation@gmail.com">zannyaafricafoundation@gmail.com</a></strong></p>
                  <p><strong>Email:<a href="mailto: contact@zannyaafricafoundation.org">contact@zannyaafricafoundation.org</a></strong></p>
                </p>
              </div>

            </div>
      
            {/* Socials */}
            <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center',paddingTop: '30px'}}><strong>For more News updates you can follow us on our socialplatforms:</strong></p>
                                                  <div style={{ display: "flex",justifyContent: "center",  gap: "40px", fontSize: "30px",paddingTop: '10px'}}>
                                                            <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                                                              <FaFacebook />
                                                            </a>
                                                            <a href="https://instagram.com/zannya_africa_foundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}>
                                                              <FaInstagram />
                                                            </a>
                                                            <a href="https://tiktok.com/@zannyaafricafdn" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                                                              <FaTiktok />
                                                            </a>
                                                            <a href="https://x.com/zannyaafrica" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                                                                <FaXTwitter />   
                                                            </a>
                                                            
                                                          </div>
                                                          <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center'}}><strong>Or you can email us for:</strong></p>
                                                          <div style={{display: 'flex',paddingTop: '10px', flexDirection: 'row', justifyContent: 'center', gap: '30px'}}>
                                                      <ul>
                                                      <li><a href="mailto: info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
                                                      <li><a href="mailto: support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
                                                      </ul>
                                                    </div>
      
            {/* Components */}
            <ContactUs />
            <OptionalFeatures />
      
    </div>
  );
}