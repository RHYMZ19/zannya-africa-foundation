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
import Image from "next/image";

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
                        < Image src='/log.jpg' alt="log" width={100} height={100}></Image>
            </StickyBar>

            <div className={styles.container}>
                            <header className={`header ${visible ? 'show' : ""}`}>
                            <h1 className={styles.h1}>
                               &quot; SUCCESS STORIES&quot;
                            </h1>
                            <p className={styles.p1}>
                                &quot;Zannya Africa foundation&quot;
                            </p>
                            </header>
                        </div>

            
            <div className={styles.ss}>
                <section className={styles.testimonialssection}>
  <h2>&quot;Testimonials & Success Stories&quot;</h2>

  
  <div className={styles.testimonialcard}>
    <p className={styles.quote}>&quot;“Zannya helped me get a scholarship and become the first girl in my village to go to university.”&quot;</p>
    <p className={styles.author}>&quot;Amina, Uganda&quot;</p>
  </div>

  
  <div className={styles.storycard}>
    <h3>&quot;From Slums to School: Samuel's Journey&quot;</h3>
    <p>&quot;Zannya Africa Foundation supported Samuel through education bursaries. Now he’s a teacher helping hundreds of children in Kampala.&quot;</p>
    <a href="Samuel_story.pdf" className={styles.downloadbtn} target="_blank">Download Full Story (PDF)</a>
  </div>


  <div className={styles.cta}>
    <p>&quot;Want to support more success stories like these?&quot;</p>
    <a href="/donate" className={styles.donatebutton}>Donate Now</a>
  </div>
</section>
            </div>

            <ContactUs></ContactUs>


            <OptionalFeatures></OptionalFeatures>
        </div>
    )
}