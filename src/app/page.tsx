// scr/app/page.tsx
'use client';
import { useRouter } from "next/navigation";
import styles from './styles/CarList.module.css';
import ImageScroll from "./ImageScroll/ImageScroll";
import StickyBar from "./StickyBar/StickyBar";
import HamburgerIcon from "./HamburgerIcon/HamburgerIcon";
import OptionalFeatures from "./OptionalFeatures/OptionalFeatures";
import Divider from './Divider/Divider';
import LanguageSelecter from "./LanguageSelecter/LanguageSelecter";
import Gallery from "./Gallery/Gallery";
import GetInvolved from "./GetInvolved/GetInvolved";
import Programsservices from "./Programsservices/Programsservices";
import Mission from "./Mission/Mission";
import InternationalReach from "./InternationalReach/InternationalReach";
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






export default function
Home() {
    
    const router = useRouter();
    useEffect(() => {
            AOS.init({duration: 1000});
            }, []);
    

    

    
    return (
        <div><StickyBar>
                    <HamburgerIcon />
                    <GetInvolved />
                    <LanguageSelecter />
                    <Gallery />
                    <button onClick={() =>
                                        router.push('')
                                    }
                                    className={styles.arrowButton}>
                                        Donate
                                    </button>
                    < img src='/log.jpg' alt="log" width={100} height={90}></img>
                </StickyBar>
                <ImageScroll></ImageScroll>
                <Hd></Hd>
        
            <div className={styles.bun}>
                    <DividerAboutUs title='A bout us'/>
                    <Mission data-aos='slide-right'></Mission>
             <Divider title="Services"/>
             <Programsservices data-aos='fade-up'/>
             <Divider title="International Reach"/>
            <InternationalReach></InternationalReach>
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

