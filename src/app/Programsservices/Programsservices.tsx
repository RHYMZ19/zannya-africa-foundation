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
            <Image src="/images/pic6.jpg"
            alt="Preview"
            className={
                styles.previewimage
            }></Image>
            <div 
            className={
                styles.previewtext
            }>
                <h3 className={styles.headings}>Programs</h3>
                <p>
                    ZAF is dedicated to serving the community through its different programs and servi...
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


