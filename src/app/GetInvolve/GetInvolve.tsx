'use client';


import styles from './GetInvolve.module.css';
import Image from "next/image";
import Link from "next/link";

export default function GetInvolve() {
    
    return (
        <div id="GetInvolve" className={styles.card}>
            <Image 
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756887367/zannya/success/rfnvysjav4f8i6potawj.jpg"
                alt="Get Involved Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.heading}>Get Involved</h3>
                <p className={styles.text}>
                    Be part of the change! Join Zannya Africa Foundation in empowering 
                    communities through your time, skills, or resources...
                </p>
                <Link href="/Internship" className={styles.button}>Read More</Link>
            </div>
        </div>
    );
}