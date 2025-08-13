'use client';

import  { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import LanguageSelecter from "../LanguageSelecter/LanguageSelecter";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import StickyBar from "../StickyBar/StickyBar";
import styles from './Successs.module.css';
import { useState, useEffect } from "react";
import ContactUs from "../ContactUs/page";

export default function
Successs() {

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
                        router.push('')}
                        className={styles.arrowButton}>Donate
                        </button>
                        < img src='/log.jpg' alt="log" width={100} height={100}></img>
            </StickyBar>

            <div className={styles.container}>
                            <header className={`header ${visible ? 'show' : ""}`}>
                            <h1 className={styles.h1}>
                                SUCCESS STORIES
                            </h1>
                            <p className={styles.p1}>
                                Zannya Africa foundation
                            </p>
                            </header>
                        </div>

            
            <div className={styles.ss}>
                <section className={styles.testimonialssection}>
  <h2>Testimonials & Success Stories</h2>

  
  <div className={styles.testimonialcard}>
    <p className={styles.quote}>“Zannya helped me get a scholarship and become the first girl in my village to go to university.”</p>
    <p className={styles.author}>— Amina, Uganda</p>
  </div>

  
  <div className={styles.storycard}>
    <h3>From Slums to School: Samuel's Journey</h3>
    <p>Zannya Africa Foundation supported Samuel through education bursaries. Now he’s a teacher helping hundreds of children in Kampala.</p>
    <a href="Samuel_story.pdf" className={styles.downloadbtn} target="_blank">Download Full Story (PDF)</a>
  </div>


  <div className={styles.cta}>
    <p>Want to support more success stories like these?</p>
    <a href="/donate" className={styles.donatebutton}>Donate Now</a>
  </div>
</section>
            </div>

            <ContactUs></ContactUs>


            <OptionalFeatures></OptionalFeatures>
        </div>
    )
}