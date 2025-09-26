'use client';


import styles from './Success.module.css';
import Image from "next/image";
import Link from "next/link";

export default function Success() {
    

    return (
        <div id="Success" className={styles.card}>
            <Image 
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756890840/zannya/success/mfh1xjdphnjokfqxtwqp.jpg"
                alt="Success Stories Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.heading}>Success Stories</h3>
                <p className={styles.text}>{`"Thanks to ZAF, i have learned valuable leadership skills and now run a successful women sports club in my village. We are making a real difference."`}</p>

                <p><strong>Trained Sports Leader</strong></p>
                <p className={styles.text}>
                    Read inspiring stories of transformation and impact from communities we serve.Click in the link below
                </p>
                <Link href="/Successs" className={styles.button}>Read More</Link>
            </div>
        </div>
    );
}