'use client';

import { useRouter } from "next/navigation";
import styles from './Leadership.module.css';

export default function
Leadership (){
    const router =useRouter();

    return(
        <div 
        id="Mission"
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
                <h3 className={styles.headings}>Leadership</h3>
                <p>
                    In our daily life, we often come across the term 'lifestyle'...
                </p>
                <button onClick={() =>
                    router.push('/notes')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}