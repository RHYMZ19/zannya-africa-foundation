'use client';

import { useRouter } from "next/navigation";
import styles from './Mission.module.css';

export default function
Mission (){
    const router =useRouter();

    return(
        <div id="Mission"
        className={
            styles.previewcontainer
        }>
            <img src="/images/pic5.jpg"
            alt="Preview"
            className={
                styles.previewimage
            }></img>
            <div 
            className={
                styles.previewtext
            }>
                <h3 className={styles.headings}>Mission & Vission</h3>
                <p>
                    To change lives and build stronger and healthier communities....
                </p>
                <button onClick={() =>
                    router.push('/Missions')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}