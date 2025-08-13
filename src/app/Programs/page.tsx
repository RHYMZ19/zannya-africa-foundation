'use client';


import { FaHome } from "react-icons/fa";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import LanguageSelecter from "../LanguageSelecter/LanguageSelecter";
import StickyBar from "../StickyBar/StickyBar";
import styles from './Programs.module.css';
import FilterBars from "../FilterBars/FilterBars";
import { useRouter } from "next/navigation";
import Countries from "../countries/[country]/page";
import Filter from "../Filter/page";
import React,{ useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactUs from "../ContactUs/page";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import IncreaseImage from "../IncreaseImage/page";

export default function
programs(){
    const router = useRouter();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        AOS.init({duration: 1000});
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
            < IncreaseImage src='/log.jpg' alt="log" ></IncreaseImage>
            </StickyBar>
            

            <div className={styles.container}>
                <header className={`header ${visible ? 'show' : ""}`}>
                <h1 className={styles.h1}>
                    PROGRAMS AND SERVICES
                </h1>
                <p className={styles.p1}>
                    Zannya Africa Foundation
                </p>
                </header>
            </div>
            
            <div style={{width: '70vw', height: '75vh',justifyItems: 'center',gap: '1%', margin: '0%',display: 'flex',flexDirection: 'row',
                padding: '1%', paddingBottom: '0%'}}>
                <img src='/images/pic3.jpg' alt="pic" style={{display: 'block', height: '70vh', width: '30vw'}}></img>
                <img src='/images/pic1.jpg' alt="pic" style={{display: 'block', height: '70vh', width: '30vw'}}></img>
                <img src='/images/pic2.jpg' alt="pic" style={{display: 'block', height: '70vh', width: '40vw'}}></img>
            </div>

            <div style={{height: '40%', width: '100%', justifyItems: 'center', backgroundColor: 'white'}}>
                <h1 style={{fontSize: '50px',color: 'red',  margin: '20px',fontWeight: 'bold'}}>
                    WHAT WE OFFER
                </h1>
                <div data-aos='fade-up' style={{ width: '100%', justifyItems: 'center'}}>
                <Filter data-aos='slide-right'></Filter>
                </div>
            </div>
            <div style={{margin: '3%'}}>
            <ContactUs></ContactUs>
            </div>

            <div style={{margin: '0%'}}>
            <OptionalFeatures></OptionalFeatures>
            </div>

        </div>
    )
}

function Programs() {
    throw new Error("Function not implemented.");
}
