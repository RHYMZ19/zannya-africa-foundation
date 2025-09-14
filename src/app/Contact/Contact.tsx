'use client';

import { useRouter } from "next/navigation";
import styles from './Contact.module.css';
import Image from "next/image";
export default function
Contact (){
    const router =useRouter();

    return(
        <div id="Contact"
        className={
            styles.previewcontainer
        }>
            <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757057933/zannya/uploads/x7wbc9fihssmebwha84c.jpg"
            alt="Preview"
            className={
                styles.previewimage
            }></Image>
            <div 
            className={
                styles.previewtext
            }>
                <h3 className={styles.headings}>Contact Us</h3>
                <p style={{overflow: 'hidden'}}>
                    Contact us today to learn more about our programs, activities, and how you can be part of creating lasting change.
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