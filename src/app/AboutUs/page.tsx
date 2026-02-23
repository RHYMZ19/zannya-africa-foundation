'use client';


import Mission from "../Mission/Mission";
import styles from './AboutUs.module.css';

export default function 
AboutUs() {
    return(
        <div className={styles.bun}>
            <h1 className={styles.headings}></h1>
            <Mission></Mission>
        </div>
    )
}