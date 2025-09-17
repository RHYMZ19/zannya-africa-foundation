'use client';

import { useRouter } from "next/navigation";
import styles from './Programsservices.module.css';
import Image from "next/image";

export default function Programsservices() {
    const router = useRouter();

    return (
        <div id='Programsservices' className={styles.card}>
            <Image 
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757064771/zannya/uploads/aohdz0ljs7ozcaetx3iq.jpg"
                alt="Programs Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.heading}>Programs</h3>
                <p className={styles.text}>
                    We run diverse programs in climate justice, health, education, and livelihoods to...
                </p>
                <button 
                    onClick={() => router.push('/Programs')}
                    className={styles.button}
                >
                    Read More
                </button>
            </div>
        </div>
    );
}

