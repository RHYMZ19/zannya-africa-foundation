'use client';

import { useRouter } from "next/navigation";
import styles from './Mission.module.css';
import Image from "next/image";

export default function
Mission (){
    const router =useRouter();

    return(
        <div id="Mission"
        className={
            styles.previewcontainer
        }>
            <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757063282/zannya/uploads/pryfzrizykeqtm06dmxv.jpg"
            alt="Preview"
            className={
                styles.previewimage
            }></Image>
            <div 
            className={
                styles.previewtext
            }>
                <h3 className={styles.headings}>Mission & Vission</h3>
                <p>
                    MISSION: To use sports as a tool for community development, empowerment, and sustainability.
                </p>
                <p>
                    VISSION: To change lives and build stronger and healthier communities
                </p>
                <button onClick={() =>
                    router.push('/Missions')
                }
                className={styles.arrowButton}>
                    Read More /Missions
                </button>
            </div>
        </div>
    )
}