'use client';

import  { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import LanguageSelecter from "../LanguageSelecter/LanguageSelecter";
import StickyBar from "../StickyBar/StickyBar";
import styles from './Historys.module.css';
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import { useState, useEffect } from "react";
import ContactUs from "../ContactUs/page";
import Image from "next/image";

export default function
Historys() {

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
                    HISTORY
                </h1>
                <p className={styles.p1}>
                    Mission && Vision
                </p>
                </header>
            </div>
            <ContactUs></ContactUs>
            
            <OptionalFeatures></OptionalFeatures>
        </div>
    )
}