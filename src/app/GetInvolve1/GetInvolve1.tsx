'use client';


import styles from './GetInvolve1.module.css';
import Image from "next/image";


export default function GetInvolve() {
    
    return (
        <div id="GetInvolve" className={styles.card}>
            <Image 
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758896400/zannya/uploads/images/xwvlf5qelsdwlyxe5nxa.webp"
                alt="Get Involved Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.heading}>Your Gift, Their Future</h3>
                <p className={styles.text}>
                    Together, we can transform lives. By donating today, you become part of a movement that uplifts communities...
                </p>
                
            </div>
        </div>
    );
}