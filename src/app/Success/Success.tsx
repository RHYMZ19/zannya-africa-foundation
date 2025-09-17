'use client';

import { useRouter } from "next/navigation";
import styles from './Success.module.css';
import Image from "next/image";

export default function Success() {
    const router = useRouter();

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
                <p className={styles.text}>
                    Read inspiring stories of transformation and impact from communities we serve.
                </p>
                <button 
                    onClick={() => router.push('/Successs')}
                    className={styles.button}
                >
                    Read More
                </button>
            </div>
        </div>
    );
}