'use client';

import { useRouter } from "next/navigation";
import styles from './PreviewNotes.module.css';
import Image from "next/image";

export default function
PreviewNotes (){
    const router =useRouter();

    return(
        <div 
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
                <h3 className={styles.headings}>About us</h3>
                <p>
                    In our daily life, we often come across the term lifestyle...
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