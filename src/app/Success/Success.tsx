'use client';

import { useRouter } from "next/navigation";
import styles from './Success.module.css';

export default function
Success (){
    const router =useRouter();

    return(
        <div id="Success"
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
                <h3 className={styles.headings}>Success Stories</h3>
                <p>
                    In our daily life, we often come across the term 'lifestyle'...
                </p>
                <button onClick={() =>
                    router.push('/Successs')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}