'use client'


import { FaHome } from "react-icons/fa";
import Divider from "../Divider/Divider";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";

import LanguageSelecter from "../LanguageSelecter/LanguageSelecter";

import StickyBar from "../StickyBar/StickyBar";
import Uganda from "../Uganda/Uganda";
import styles from './page.module.css';
import {  useRouter } from "next/navigation";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import { useState, useEffect } from "react";
import ContactUs from "../ContactUs/page";
import Image from "next/image";
import dynamic from "next/dynamic";



export default function
InternationalReachPage() {
    const Maps = dynamic(() => import ("../Maps/page"), { ssr: false });
    const Graphs = dynamic(() => import("../Graphs/page"), { ssr: false });

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
                                        router.push('')
                                    }
                                    className={styles.arrowButton}>
                                        Donate
                                    </button>
                    < Image src='/log.jpg' alt="log" width={100} height={100}></Image>
                </StickyBar>
        <div 
        style={{padding: '20px', overflowY: 'scroll'}}>
            <div className={styles.container}>
                            <header className={`header ${visible ? 'show' : ""}`}>
                            <h1 className={styles.h1}>
                                GROBAL IMPACT
                            </h1>
                            <p className={styles.p1}>
                                {`zannya africa foundation`}
                            </p>
                            </header>
                        </div>

                        
            <Maps></Maps>
            <p  style={{color: 'red'}}><strong>Zannya Africa foundation</strong> opparates in maltiple countries across east and west
             Africa partnering with local communities to implement sustainable programs in education, health, and empowerment.</p>
            <div style={{padding: '10px'}}>
                <h1 style={{fontSize: '40px', color: 'black', fontWeight: 'bold', fontStyle: 'italic'}}>List of countries available</h1>

                <div style={{margin: '15px'}}>
                <h2 style={{fontStyle: 'italic', fontWeight: '15px'}}>Uganda</h2>
                <p><strong>Head office in </strong> Kampala</p>
                <p><strong>Focus: </strong> Education Programs, Youth camps, HIV / TB protection</p>
                </div>

                <div style={{margin: '15px'}}>
                <h2 style={{fontStyle: 'italic', fontWeight: '15px'}}>Kenya</h2>
                <p><strong>Head office in </strong> Kampala</p>
                <p><strong>Focus: </strong> Education Programs, Youth camps, HIV / TB protection</p>
                </div>

                <div style={{margin: '15px'}}>
                <h2 style={{fontStyle: 'italic', fontWeight: '15px'}}>Ghana</h2>
                <p><strong>Head office in </strong> Kampala</p>
                <p><strong>Focus: </strong> Education Programs, Youth camps, HIV / TB protection</p>
                </div>

                <div style={{margin: '15px'}}>
                <h2 style={{fontStyle: 'italic', fontWeight: '15px'}}>Nigeria</h2>
                <p><strong>Head office in </strong> Kampala</p>
                <p><strong>Focus: </strong> Education Programs, Youth camps, HIV / TB protection</p>
                </div>

            </div>
            <div style={{height: '80%', width: '50%',paddingTop: '50px',}}>
                <h1 style={{color: 'black', fontSize: '25px'}}>The graph shows percentage performance by  each country</h1>
            <Graphs></Graphs>
            </div>
            <Divider title={"News From Uganda"}></Divider>
            <div style={{height: '50%', width: '80%'}}>
            <Uganda></Uganda>
            </div>
            <div style={{height: '50%', width: '80%'}}>
            <Divider title={"News From Kenya"}></Divider>
            <Uganda></Uganda>
            </div>
            <div style={{height: '50%', width: '80%'}}>
            <Divider title={"News From Nigeria"}></Divider>
            <Uganda></Uganda>
            </div>
        </div>

        <ContactUs></ContactUs>
        <OptionalFeatures></OptionalFeatures>
        </div>
    )
}