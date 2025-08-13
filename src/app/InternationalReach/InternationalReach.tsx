'use client';

import { useRouter } from "next/navigation";
import styles from './InternationalReach.module.css';

export default function
InternationalReach (){
    const router =useRouter();

    return(
        <div id='InternationalReach'
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
                <h3 className={styles.headings}>International Reach</h3>
                <p>
                    In our daily life, we often come across the term 'lifestyle'...
                </p>
                <button onClick={() =>
                    router.push('/InternationalReachpage')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}