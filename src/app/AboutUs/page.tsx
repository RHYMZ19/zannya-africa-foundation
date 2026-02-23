'use client';

import Histories from "../Histories/Histories";
import Leadership from "../Leadership/Leadership";
import Locations from "../Locations/Locations";
import Mission from "../Mission/Mission";
import Partners from "../Partners/Partners";
import styles from './AboutUs.module.css';

export default function 
AboutUs() {
    return(
        <div className={styles.bun}>
            <h1 className={styles.headings}></h1>
            <Histories></Histories> 
            <Leadership></Leadership>
            <Locations></Locations>
            <Partners></Partners>
            <Mission></Mission>
        </div>
    )
}