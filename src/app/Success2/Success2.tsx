'use client';


import styles from './Success2.module.css';
import Image from "next/image";


export default function Success() {
    

    return (
        <div id="Success" className={styles.card}>
            <Image 
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758023192/zannya/uploads/images/evtysd6cvwkgufpbfhcm.jpg"
                alt="Success Stories Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.heading}>Success Stories</h3>
                <p>{`“My internship at Zannya helped me grow professionally and personally. I felt truly valued and learned more than I expected.”`}</p>

                <p><strong>Rahim SS., Former Software Eng Intern</strong></p>
                
            </div>
        </div>
    );
}