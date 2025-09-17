// scr/app/page.tsx
'use client';
import { useRouter } from "next/navigation";
import styles from './styles/CarList.module.css';
import ImageScroll from "./ImageScroll/ImageScroll";
import StickyBar from "./StickyBar/StickyBar";
import HamburgerIcon from "./HamburgerIcon/HamburgerIcon";
import OptionalFeatures from "./OptionalFeatures/OptionalFeatures";
import Divider from './Divider/Divider';
import Gallery from "./Gallery/Gallery";
import GetInvolved from "./GetInvolved/GetInvolved";
import Programsservices from "./Programsservices/Programsservices";
import Mission from "./Mission/Mission";
import News from "./News/News";
import Resources from "./Resources/Resources";
import Success from "./Success/Success";
import Donate from "./Donate/Donate";
import Contact from "./Contact/Contact";
import GetInvolve from "./GetInvolve/GetInvolve";
import DividerAboutUs from "./DividerAboutUs/DividerAboutUs";
import React,{ useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactUs from "./ContactUs/page";
import Hd from "./Hd/page";
import IncreaseImages from "./components/IncreaseImages";

// src/pages/Home.js


import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";






export default function
Home() {
    
    const router = useRouter();
    useEffect(() => {
            AOS.init({duration: 1000});
            }, []);
    

    

    
    return (
        <div style={{ overflow: 'hidden' }}>
            <div style={{ justifyItems: 'center', gap: '1%' }}>
            <StickyBar>
                    <HamburgerIcon />
                    <GetInvolved />
                    <Gallery />
                    <button onClick={() =>
                                        router.push('/Donates')
                                    }
                                    className={styles.arrowButton}>
                                        Donate
                                    </button>
                    <IncreaseImages src='/log.jpg' alt="log" />
                </StickyBar>
                </div>
                <ImageScroll></ImageScroll>
                <Hd></Hd>
        
            <div className={styles.bun}>
                    <DividerAboutUs title='A bout us'/>
                    <Mission data-aos='slide-right'></Mission>
             <Divider title="Services"/>
             <Programsservices data-aos='fade-up'/>
            <Divider title="News & Updates"/>
            <News></News>
            <Divider title="Resources"/>
            <Resources></Resources>
            <Divider title="Success Stories"/>
            <Success></Success>

            <Divider title="Support Us"/>
            <Donate></Donate>

            <Divider title="Get Involved"/>
            <GetInvolve></GetInvolve>

            <Divider title="Contact Us"/>
            <Contact></Contact>
            </div>

            


    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay">
          <h1>Zannya Africa Foundation</h1>
          <p>Changing the community through sports, education, and empowerment.</p>
          <button className="cta-btn">Get Involved</button>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Who We Are</h2>
        <p>
          Zannya Africa Foundation works with underprivileged children, youth, and women to
          create opportunities through sports, education, and community development.
        </p>
      </section>

      {/* Programs Section */}
      <section className="programs">
        <h2>Our Programs</h2>
        <div className="program-cards">
          <div className="card">
            <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757064571/zannya/uploads/lpux4wqm27omuk9u15ei.jpg" alt="Education" />
            <h3>Education</h3>
            <p>Supporting children with access to quality education and mentorship.</p>
          </div>
          <div className="card">
            <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757064544/zannya/uploads/ioeyybvowmrjwoe0llpl.jpg" alt="Sports" />
            <h3>Sports & Recreation</h3>
            <p>Using sports to inspire teamwork, discipline, and leadership.</p>
          </div>
          <div className="card">
            <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757063547/zannya/uploads/vrk7v7d0qvd1yw51oeig.jpg" alt="Community" />
            <h3>Community Empowerment</h3>
            <p>Building stronger communities through training and innovation.</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact">
        <h2>Our Impact</h2>
        <div className="stats">
          <div>
            <h3>5,000+</h3>
            <p>Children Reached</p>
          </div>
          <div>
            <h3>20+</h3>
            <p>Communities Served</p>
          </div>
          <div>
            <h3>10+</h3>
            <p>Years of Service</p>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="involved">
        <h2>Get Involved</h2>
        <p>Join us in making a difference. Support Zannya Africa Foundation today!</p>
        <div className="btn-group">
          <button>Donate</button>
          <button>Volunteer</button>
          <button>Partner With Us</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Zannya Africa Foundation. All rights reserved.</p>
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaTiktok /></a>
          <a href="#"><FaWhatsapp /></a>
        </div>
      </footer>
    </div>
  

            <ContactUs></ContactUs>
            <OptionalFeatures></OptionalFeatures>
            </div>
            );
        }

