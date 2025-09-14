'use client';

import { useRouter } from "next/navigation";
import styles from './Donate.module.css';
import Image from "next/image";
export default function
Donate (){
    const router =useRouter();

    return(
        <div id="Donate"
        className={
            styles.previewcontainer
        }>
            <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757063547/zannya/uploads/vrk7v7d0qvd1yw51oeig.jpg"
            alt="Preview"
            className={
                styles.previewimage
            }></Image>
            <div 
            className={
                styles.previewtext
            }>
                <h3 className={styles.headings}>Support Us</h3>
                <p style={{overflow: 'hidden'}}>
                    Together, we can transform lives. By donating today, you become part of a movement that uplifts communities and gives hope to those who need it most....
                </p>
                <button onClick={() =>
                    router.push('/Donates')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}