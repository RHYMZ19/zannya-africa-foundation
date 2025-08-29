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
            <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756115378/zannya/uploads/lodarcpovidhux7eeiil.jpg"
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
                    Zannya Africa Foundation (ZAF) is a non-profit organization dedicated to empowering the community....
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