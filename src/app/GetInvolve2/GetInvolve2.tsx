'use client';


import styles from './GetInvolve2.module.css';
import Image from "next/image";


export default function GetInvolve() {
    
    return (
        <div id="GetInvolve" className={styles.card}>
            <Image 
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758448857/zannya/uploads/adowo0xetjy6mt4ygeqb.jpg"
                alt="Get Involved Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.heading}>Building Futures Through Fun and Football</h3>
                <p className={styles.text}>
                    Zannya Africa Foundation in collaboration with Futsal Association Uganda encouraging Education through sports and recreation activities.


                </p>
                
            </div>
        </div>
    );
}