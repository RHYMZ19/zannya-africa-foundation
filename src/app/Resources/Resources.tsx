'use client';

import { useRouter } from "next/navigation";
import styles from './Resources.module.css';

export default function
Resources (){
    const router =useRouter();

    return(
        <div id="Resources"
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
                <h3 className={styles.headings}>Resources</h3>
                <p>
                    In our daily life, we often come across the term 'lifestyle'...
                </p>
                <button onClick={() =>
                    router.push('/Resourcess')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}