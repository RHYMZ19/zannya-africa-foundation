'use client';


import styles from './Success1.module.css';
import Image from "next/image";


export default function Success() {
    

    return (
        <div id="Success" className={styles.card}>
            <Image 
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758023066/zannya/uploads/images/sps7gaj21stmytn7outn.jpg"
                alt="Success Stories Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.heading}>Success Stories</h3>
                <p>{`"ZAF has transformed our community. Our children now have a safe space to play and grow. The sportsprograms have give them a new sense of purpose and direction."`}</p>

                <p><strong>Local Community Leader</strong></p>
                
                
            </div>
        </div>
    );
}