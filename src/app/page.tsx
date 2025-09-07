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
            <ContactUs></ContactUs>
            <OptionalFeatures></OptionalFeatures>
            </div>
            );
        }

