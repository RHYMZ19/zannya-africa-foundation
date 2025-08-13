'use client';

import { useRouter } from "next/navigation";
import styles from './Donate.module.css';

export default function
Donate (){
    const router =useRouter();

    return(
        <div id="Donate"
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
                <h3 className={styles.headings}>Support Us</h3>
                <p>
                    In our daily life, we often come across the term 'lifestyle'...
                </p>
                <button onClick={() =>
                    router.push('/Donates')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}