'use client';

import { useRouter } from "next/navigation";
import styles from './Programsservices.module.css';

export default function
Programsservices (){
    const router =useRouter();

    return(
        <div id='Programsservices'
        className={
            styles.previewcontainer
        }>
            <img src="/images/pic6.jpg"
            alt="Preview"
            className={
                styles.previewimage
            }></img>
            <div 
            className={
                styles.previewtext
            }>
                <h3 className={styles.headings}>Programs</h3>
                <p>
                    In our daily life, we often come across the term 'lifestyle'...
                </p>
                <button onClick={() =>
                    router.push('/Programs')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}

function services() {
    throw new Error("Function not implemented.");
}
