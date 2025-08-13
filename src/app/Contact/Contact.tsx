'use client';

import { useRouter } from "next/navigation";
import styles from './Contact.module.css';

export default function
Contact (){
    const router =useRouter();

    return(
        <div id="Contact"
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
                <h3 className={styles.headings}>Contact Us</h3>
                <p>
                    In our daily life, we often come across the term 'lifestyle'...
                </p>
                <button onClick={() =>
                    router.push('/Contacts')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}