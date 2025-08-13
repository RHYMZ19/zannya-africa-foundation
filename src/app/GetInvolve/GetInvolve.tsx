'use client';

import { useRouter } from "next/navigation";
import styles from './GetInvolve.module.css';

export default function
GetInvolve (){
    const router =useRouter();

    return(
        <div 
        id="GetInvolve"
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
                <h3 className={styles.headings}>Get Involved</h3>
                <p>
                    In our daily life, we often come across the term 'lifestyle'...
                </p>
                <button 
                onClick={() =>
                    router.push('/Internship')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}