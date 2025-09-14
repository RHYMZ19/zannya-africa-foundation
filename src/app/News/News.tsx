'use client';

import { useRouter } from "next/navigation";
import styles from './News.module.css';
import Image from "next/image";

export default function
News (){
    const router =useRouter();

    return(
        <div id="News"
        className={
            styles.previewcontainer
        }>
            <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757064668/zannya/uploads/ayx5sskfqhtpperkxwqq.jpg"
            alt="Preview"
            className={
                styles.previewimage
            }></Image>
            <div 
            className={
                styles.previewtext
            }>
                <h3 className={styles.headings}>Events</h3>
                <p>
                    Discover whats happening at Zannya Africa Foundation read our latest news, follow our events, explore insightful blogs, and see how our work is featured in the media.
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