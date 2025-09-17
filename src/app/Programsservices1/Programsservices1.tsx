'use client';

import { useRouter } from "next/navigation";
import styles from './Programsservices1.module.css';
import Image from "next/image";

export default function Programsservices() {
    const router = useRouter();

    return (
        <div id='Programsservices' className={styles.card}>
            <Image 
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757063238/zannya/uploads/xy9oaj6ycymkmofgv32k.jpg"
                alt="Programs Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.heading}>REPRODUCTIVE AND PHYSICAL HEALTH AWARENESS</h3>
                <p className={styles.text}>
                    ZAF uses sports such futsal, netball, football, athletics, 
                    team building activities and recreation activities to promote reproductive and 
                    physical health awareness among youth and women. Our aim is to empower 
                    young people with knowledge, skills, and confidence to make informed 
                    decisions about their reproductive health and wellbeing. In the same 
                    docket of well being, ZAF drives further towards encourage participants to 
                    live an active and healthy lifestyle, which helps in preventing and managing 
                    various health issues. This is achieved through organised sports tournaments, 
                    health camps, coaching and mentorship
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

