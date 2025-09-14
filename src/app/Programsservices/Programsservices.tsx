'use client';

import { useRouter } from "next/navigation";
import styles from './Programsservices.module.css';
import Image from "next/image";

export default function
Programsservices (){
    const router =useRouter();

    return(
        <div id='Programsservices'
        className={
            styles.previewcontainer
        }>
            <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757064771/zannya/uploads/aohdz0ljs7ozcaetx3iq.jpg"
            alt="Preview"
            className={
                styles.previewimage
            }></Image>
            <div 
            className={
                styles.previewtext
            }>
                <h3 className={styles.headings}>Programs</h3>
                <p style={{overflow: 'hidden'}}>
                    We run diverse programs in climate justice, health, education, and livelihoods to...
                </p>
                <button onClick={() =>
                    router.push('/Programs')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}


