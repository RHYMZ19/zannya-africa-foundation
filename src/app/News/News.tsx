'use client';

import { useRouter } from "next/navigation";
import styles from './News.module.css';

export default function
News (){
    const router =useRouter();

    return(
        <div id="News"
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
                <h3 className={styles.headings}>Events</h3>
                <p>
                    In our daily life, we often come across the term 'lifestyle'...
                </p>
                <button onClick={() =>
                    router.push('/Newsp')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}