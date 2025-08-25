'use client';


import { FaHome } from "react-icons/fa";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import StickyBar from "../StickyBar/StickyBar";
import styles from './Programs.module.css';
import { useRouter } from "next/navigation";
import Filter from "../Filter/page";
import React,{ useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactUs from "../ContactUs/page";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import Image from "next/image";
import IncreaseIma from "./components/IncreaseIma";

export default function
Programs(){
    const router = useRouter();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        AOS.init({duration: 1000});
        setTimeout(() =>
    setVisible(true), 100);}, []);
    return(
        <div>
            <div style={{justifyItems: 'center', gap: '2%'}}>
            <StickyBar>
            <FaHome style={{width: '10px', height: '10px'}} color="black" cursor='pointer' onClick={() => router.push('/')} >
            Home</FaHome>
            <GetInvolved />
            <Gallery />
            <button onClick={() =>
            router.push('')}
            className={styles.arrowButton}>Donate
            </button>
            < IncreaseIma src='/log.jpg' alt="log" ></IncreaseIma>
            </StickyBar>
            </div>

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
            
            <div style={{width: '100%', height: '50%',justifyItems: 'center',gap: '1%', margin: '0%',display: 'flex',flexDirection: 'row',
                padding: '1%', paddingBottom: '0%'}}>
                <Image src='/images/pic3.jpg' alt="pic" style={{display: 'block', height: '100%', width: '33%'}}></Image>
                <Image src='/images/pic1.jpg' alt="pic" style={{display: 'block', height: '100%', width: '33%'}}></Image>
                <Image src='/images/pic4.jpg' alt="pic" style={{display: 'block', height: '100%', width: '33%'}}></Image>
            </div>

            <div style={{height: '40%', width: '100%', justifyItems: 'center', backgroundColor: 'white'}}>
                <h1 style={{fontSize: '40px',color: 'red',  margin: '20px',fontWeight: 'bold'}}>
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

