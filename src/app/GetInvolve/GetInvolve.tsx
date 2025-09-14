'use client';

import { useRouter } from "next/navigation";
import styles from './GetInvolve.module.css';
import Image from "next/image";

export default function
GetInvolve (){
    const router =useRouter();

    return(
        <div 
        id="GetInvolve"
        className={
            styles.previewcontainer
        }>
            <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756887367/zannya/success/rfnvysjav4f8i6potawj.jpg"
            alt="Preview"
            className={
                styles.previewimage
            }></Image>
            <div 
            className={
                styles.previewtext
            }>
                <h3 className={styles.headings}>Get Involved</h3>
                <p>
                    Be part of the change! Join Zannya Africa Foundation in empowering communities through your time, skills, or resources. Whether you volunteer, partner, or donate, your involvement helps us create lasting impact.
                </p>
                <button 
                onClick={() =>
                    router.push('/Internship')
                }
                className={styles.arrowButton}>
                    Read More
                </button>
            </div>
        </div>
    )
}