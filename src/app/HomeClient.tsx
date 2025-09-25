// src/app/HomeClient.tsx
'use client';

import React, { useState,  useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import StickyBar from "./StickyBar/StickyBar";
import HamburgerIcon from "./HamburgerIcon/HamburgerIcon";
import IncreaseImages from "./components/IncreaseImages";
import Mission from "./Mission/Mission";
import Programsservices from "./Programsservices/Programsservices";
import Programsservices1 from './Programsservices1/Programsservices1';
import Programsservices2 from './Programsservices2/Programsservices2';
import NewsC from './NewsC/NewsC';

import Resources from './Resources/Resources';
import Success from './Success/Success';
import Donate from './Donate/Donate';
import GetInvolve from './GetInvolve/GetInvolve';
import Contact from './Contact/Contact';
import OptionalFeatures from './OptionalFeatures/OptionalFeatures';
import Divider from './Divider/Divider';
import ImageScroll from './ImageScroll/ImageScroll';
import Gallery from './Gallery/Gallery';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/CarList.module.css';

import { NewsItem } from "./Newsp/NewsList";
import GetInvolved from './GetInvolved/GetInvolved';
import UpcomingEvents from './UpcomingEvents/UpcomingEvents';
import { MyEvent } from './lib/events';


type HomeClientProps = {
  news: NewsItem[];
  events: MyEvent[];
};


export default function HomeClient({news, events }: HomeClientProps) {
  const [counts, setCounts] = useState({ people: 0, projects: 0, partners: 0 });
  const programRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const programInterval = useRef<NodeJS.Timeout | null>(null);
  const newsInterval = useRef<NodeJS.Timeout | null>(null);

  const scrollByCard = (ref: React.RefObject<HTMLDivElement | null>) => {
  if (!ref.current) return;
  const cardWidth = ref.current.firstElementChild instanceof HTMLElement
    ? ref.current.firstElementChild.clientWidth
    : 300;
  ref.current.scrollBy({ left: cardWidth, behavior: 'smooth' });

  if (
    ref.current.scrollLeft + ref.current.clientWidth >=
    ref.current.scrollWidth
  ) {
    setTimeout(() => {
      ref.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }, 1000);
  }
};

const startAutoScroll = (
  ref: React.RefObject<HTMLDivElement | null>,
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>
) => {
  stopAutoScroll(intervalRef);
  intervalRef.current = setInterval(() => {
    scrollByCard(ref);
  }, 3000);
};

  const stopAutoScroll = (intervalRef: React.MutableRefObject<NodeJS.Timeout | null>) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoScroll(programRef, programInterval);
    startAutoScroll(newsRef, newsInterval);

    return () => {
      stopAutoScroll(programInterval);
      stopAutoScroll(newsInterval);
    };
  }, []);


  
  

  useEffect(() => {
    AOS.init({ duration: 1200 });

    const counterSection = document.querySelector(`.${styles.counterGrid}`);
    if (counterSection) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
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

              obs.unobserve(counterSection);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(counterSection);

      return () => observer.disconnect();
    }
  }, []);

  

  return (
    <div className={styles.homeWrapper}>
      {/* Sticky Top Bar */}
      <div style={{ justifyItems: 'center', gap: '1%' }}>
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
        <ImageScroll />
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
          <Image
            src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758376508/zannya/uploads/images/t614e7cy9pkrpcibktnv.jpg"
            alt="About us"
            className={styles.aboutImage}
            width={500}
            height={300}
          />
        </div>
        <div className={styles.aboutContentText} data-aos="fade-left">
          <h2>Who We Are</h2>
          <p>
            Changing the community through sports. We work with unprivileged children, youth and women for their own development and the community at large using sports and recreation activities as an engine.
          </p>
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

      {/* Programs Section */}
      <section className={styles.programSection}>
        <Divider title="Programs & Activities" />
        
        <div
          className={styles.scrollWrapper}
          ref={programRef}
          onMouseEnter={() => stopAutoScroll(programInterval)}
          onMouseLeave={() => startAutoScroll(programRef, programInterval)}
        >
          <Programsservices />
          <Programsservices1 />
          <Programsservices2 />
        </div>
        
      </section>
      
      {/* News Section */}
      <section className={styles.newsSection}>
        <Divider title="News & Updates" />

        <NewsC />
        
        <div
          className={styles.newsScrollWrapper}
          ref={newsRef}
          onMouseEnter={() => stopAutoScroll(newsInterval)}
          onMouseLeave={() => startAutoScroll(newsRef, newsInterval)}
        >
    {news.map((item) => (
      <div key={item.id} className={styles.newsItem}>
        {item.images && item.images.length > 0 && (
          <Image
            src={item.images[0]}
            alt={item.title}
            width={400}
            height={220}
            className={styles.newsItemImage}
          />
        )}


        <span className={styles.newsType}>{item.type}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>

        {item.timestamp && (
          <small className={styles.newsItemDate}>
            {new Date(item.timestamp).toLocaleDateString()}{" "}
            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </small>
        )}
      </div>
    ))}

    </div>
      </section>

      {/* Upcoming Events */}
      <UpcomingEvents events={events} />


      {/* Resources, Success, Donate, Get Involved, Contact */}
      <section className={styles.resourcesSection}>
        <Divider title="Resources" />
        <Resources />
      </section>

      <section className={styles.successSection}>
        <Divider title="Success Stories" />
        <Success />
      </section>

      <section className={styles.supportSection}>
        <Divider title="Support Us" />
        <Donate />
      </section>

      <section className={styles.getInvolvedSection}>
        <Divider title="Get Involved" />
        <GetInvolve />
      </section>

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