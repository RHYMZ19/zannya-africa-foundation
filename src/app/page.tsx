// scr/app/page.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import StickyBar from "./StickyBar/StickyBar";
import HamburgerIcon from "./HamburgerIcon/HamburgerIcon";
import IncreaseImages from "./components/IncreaseImages";

import Mission from "./Mission/Mission";
import Programsservices from "./Programsservices/Programsservices";
import News from "./News/News";
import Resources from "./Resources/Resources";
import Success from "./Success/Success";
import Donate from "./Donate/Donate";
import GetInvolve from "./GetInvolve/GetInvolve";
import Contact from "./Contact/Contact";
import OptionalFeatures from "./OptionalFeatures/OptionalFeatures";
import Divider from './Divider/Divider';

import Image from 'next/image';
import styles from './styles/CarList.module.css';
import Programsservices1 from './Programsservices1/Programsservices1';
import Programsservices2 from './Programsservices2/Programsservices2';
import NewsA from './NewsA/NewsA';
import NewsE from './NewsE/NewsE';
import NewsM from './NewsM/NewsM';
import Gallery from './Gallery/Gallery';
import GetInvolved from './GetInvolved/GetInvolved';
import Link from 'next/link';
import NewsC from './NewsC/NewsC';

export default function Home() {
    
    const [counts, setCounts] = useState({ people: 0, projects: 0, partners: 0 });
    

    // scroll refs
    const programRef = useRef<HTMLDivElement | null>(null);
    const newsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        AOS.init({ duration: 1200 });

        // ---- START: Intersection Observer for counters ----
        const counterSection = document.querySelector(`.${styles.counterGrid}`);
        if (counterSection) {
            const observer = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Trigger the counter animation
                            const target = { people: 1000, projects: 120, partners: 20 };
                            const duration = 2000;
                            const steps = 60;
                            let frame = 0;

                            const counter = setInterval(() => {
                                frame++;
                                setCounts({
                                    people: Math.min(Math.floor((target.people / steps) * frame), target.people),
                                    projects: Math.min(Math.floor((target.projects / steps) * frame), target.projects),
                                    partners: Math.min(Math.floor((target.partners / steps) * frame), target.partners),
                                });
                                if (frame >= steps) clearInterval(counter);
                            }, duration / steps);

                            obs.unobserve(counterSection); // only trigger once
                        }
                    });
                },
                { threshold: 0.5 }
            );
            observer.observe(counterSection);

            return () => observer.disconnect();
        }
        // ---- END: Intersection Observer for counters ----

    }, []);


    // Scroll function
    const scroll = (ref: React.RefObject<HTMLDivElement | null>, dir: 'left' | 'right') => {
  if (ref.current) {
    ref.current.scrollBy({
      left: dir === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  }
 };

    return (
        <div className={styles.homeWrapper}>

            {/* Sticky Top Bar */}
            <div style={{justifyItems: 'center', gap: '1%'}}>
            <StickyBar>
                <HamburgerIcon />
                <GetInvolved />
                <Gallery />
                <Link href="/Donates" className={styles.arrowButton}>
                  Donate
                </Link>
                <IncreaseImages src='/log.jpg' alt="Logo" />
            </StickyBar>
            </div>
            
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}>
                    <h1 className={`${styles.heroTitle} ${styles.animateFadeIn}`}>Zannya Africa Foundation</h1>
                    <p className={`${styles.heroSubtitle} ${styles.animateFadeIn} ${styles.delay200}`}>
                        Changing communities through sports, education, and empowerment.
                    </p>
                    <div className={`${styles.heroButtons} ${styles.animateFadeIn} ${styles.delay400}`}>
                        <Link href="/Internship" className={styles.ctaButton}>Get Involved</Link>
                        <Link href="/Donates" className={styles.ctaButtonSecondary}>Donate</Link>
                    </div>
                </div>
            </section>

            {/* About / Mission */}
            <section className={styles.aboutSection}>
                <div className={styles.aboutContent} data-aos="fade-right">
                    <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758376508/zannya/uploads/images/t614e7cy9pkrpcibktnv.jpg" alt="About us" className={styles.aboutImage} width={500} height={300}/>
                </div>
                <div className={styles.aboutContentText} data-aos="fade-left">
                    <h2>Who We Are</h2>
                    <p>Changing the community through sports. We work with unprivileged children, youth and women for their own development and the community at large using sports and recreation activities as an engine.</p>
                    <Mission />
                </div>
            </section>

            {/* Impact Section */}
            <section className={styles.impactSection}>
                <Divider title="Our Impact" />
                <div className={styles.counterGrid}>
                    <div className={styles.counterCard}>
                        <h3>{counts.people.toLocaleString()}+</h3>
                        <p>Lives Impacted</p>
                    </div>
                    <div className={styles.counterCard}>
                        <h3>{counts.projects}</h3>
                        <p>Projects Completed</p>
                    </div>
                    <div className={styles.counterCard}>
                        <h3>{counts.partners}</h3>
                        <p>Partners Worldwide</p>
                    </div>
                </div>
            </section>

            {/* Programs / Services Carousel */}
            <section className={styles.programSection}>
                <Divider title="Programs & Activities" />
                <div className={styles.scrollControls}>
                    <button onClick={() => scroll(programRef, 'left')}>◀</button>
                    <button onClick={() => scroll(programRef, 'right')}>▶</button>
                </div>
                <div className={styles.scrollWrapper} ref={programRef}>
                    <Programsservices />
                    <Programsservices1 />
                    <Programsservices2 />
                </div>
            </section>

            {/* News Section Horizontal Scroll */}
            <section className={styles.newsSection}>
                <Divider title="News & Updates" />
                <div className={styles.scrollControls}>
                    <button onClick={() => scroll(newsRef, 'left')}>◀</button>
                    <button onClick={() => scroll(newsRef, 'right')}>▶</button>
                </div>
                <div className={styles.scrollWrapper} ref={newsRef}>
                    <NewsC />
                    <News />
                    <NewsA />
                    <NewsE />
                    <NewsM />
                    
                </div>
            </section>

            {/* Resources */}
            <section className={styles.resourcesSection}>
                <Divider title="Resources" />
                <Resources />
            </section>

            {/* Success Stories */}
            <section className={styles.successSection}>
                <Divider title="Success Stories" />
                <Success />
            </section>

            {/* Support Us */}
            <section className={styles.supportSection}>
                <Divider title="Support Us" />
                <Donate />
            </section>

            {/* Get Involved */}
            <section className={styles.getInvolvedSection}>
                <Divider title="Get Involved" />
                <GetInvolve />
            </section>

            {/* Contact & Optional Features */}
            <section className={styles.contactSection}>
                <Divider title="Contact & Features" />
                <div className={styles.contactGrid}>
                    <Contact />
                    <OptionalFeatures />
                </div>
            </section>
        </div>
    );
}