'use client';


import styles from './Resources.module.css';
import Image from "next/image";
import Link from "next/link";

export default function Resources() {
    

    return (
        <div id="Resources" className={styles.card}>
            <Image 
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758379328/zannya/uploads/images/ybuex5jd9ntcotpvz1gx.jpg"
                alt="Resources Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.heading}>Resources</h3>
                <p>REPORTS (ZAF) </p>
                <p>The Report shows Program Highlights Financial breakdown and others</p>

                <p>Download PDF</p>
                <p className={styles.text}>
                    Explore more of our resources, including reports, publications, research papers... Click in the link below.
                </p>
                
                <Link href="/Resourcess" className={styles.button}>Read More</Link>
            </div>
        </div>
    );
}