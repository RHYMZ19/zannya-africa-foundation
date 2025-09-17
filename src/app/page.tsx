// scr/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
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

export default function Home() {
    const router = useRouter();
    const [counts, setCounts] = useState({ people: 0, projects: 0, partners: 0 });

    useEffect(() => {
        AOS.init({ duration: 1200 });

        // Animated counters
        const target = { people: 10000, projects: 120, partners: 45 };
        let start = 0;
        const interval = setInterval(() => {
            start += 200;
            setCounts({
                people: Math.min(start * 5, target.people),
                projects: Math.min(start / 10, target.projects),
                partners: Math.min(start / 25, target.partners),
            });
            if (start > 2000) clearInterval(interval);
        }, 50);
    }, []);

    return (
        <div className={styles.homeWrapper}>

            {/* Sticky Top Bar */}
            <StickyBar>
                <HamburgerIcon />
                <IncreaseImages src='/log.jpg' alt="Logo" />
            </StickyBar>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}>
                    <h1 className={`${styles.heroTitle} ${styles.animateFadeIn}`}>Zannya Africa Foundation</h1>
                    <p className={`${styles.heroSubtitle} ${styles.animateFadeIn} ${styles.delay200}`}>
                        Changing communities through sports, education, and empowerment.
                    </p>
                    <div className={`${styles.heroButtons} ${styles.animateFadeIn} ${styles.delay400}`}>
                        <button onClick={() => router.push('/Internship')} className={styles.ctaButton}>Get Involved</button>
                        <button onClick={() => router.push('/Donates')} className={styles.ctaButtonSecondary}>Donate</button>
                    </div>
                </div>
            </section>

            {/* About / Mission */}
            <section className={styles.aboutSection}>
                <div className={styles.aboutContent} data-aos="fade-right">
                    <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756887367/zannya/success/rfnvysjav4f8i6potawj.jpg" alt="About us" className={styles.aboutImage} width={500} height={300}/>
                </div>
                <div className={styles.aboutContentText} data-aos="fade-left">
                    <h2>Who We Are</h2>
                    <p>Zannya Africa Foundation works with underprivileged children, youth, and women to create opportunities through sports, education, and community development.</p>
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
                <div className={styles.scrollWrapper}>
                    <Programsservices />
                    <Programsservices1 />
                    <Programsservices2 />
                </div>
            </section>

            {/* News Section Horizontal Scroll */}
            <section className={styles.newsSection}>
                <Divider title="News & Updates" />
                <div className={styles.scrollWrapper}>
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