'use client';


import styles from './Resources1.module.css';
import Image from "next/image";


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
                <p className={styles.text}>RESEARCH PAPER</p>
                <p className={styles.text}>This Research paper is Based on participatory methodology (ZAF) In Uganda</p>

                <p>Download PDF</p>
                
            </div>
        </div>
    );
}