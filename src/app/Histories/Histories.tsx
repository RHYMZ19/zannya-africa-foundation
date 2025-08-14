'use client';

import { useRouter } from "next/navigation";
import styles from './Histories.module.css';
import Image from "next/image";

export default function
Histories (){
    const router =useRouter();

    return(
        <div 
        id="Mission"
        className={
            styles.previewcontainer
        }>
            <Image src="/images/pic5.jpg"
            alt="Preview"
            className={
                styles.previewimage
            }></Image>
            <div 
            className={
                styles.previewtext
            }>
                <h3 className={styles.headings}>Histories</h3>
                <p>
                    &quot;In our daily life, we often come across the term 'lifestyle'...&quot;
                </p>
                <button onClick={() =>
                    router.push('/Historys')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}