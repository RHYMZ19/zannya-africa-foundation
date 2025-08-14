'use client';
import { useRouter } from "next/navigation";
import styles from './Success.module.css';
import Image from "next/image";
export default function
Success (){
    const router =useRouter();

    return(
        <div id="Success"
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
                <h3 className={styles.headings}>&quot;Success Stories&quot;</h3>
                <p>
                    &quot;In our daily life, we often come across the term 'lifestyle'...&quot;
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