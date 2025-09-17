'use client';

import { useRouter } from "next/navigation";
import styles from './Programsservices.module.css';
import Image from "next/image";

export default function Programsservices() {
    const router = useRouter();

    return (
        <div id='Programsservices' className={styles.card}>
            <Image 
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757057820/zannya/uploads/hfq0y9lrapgjlbdogzte.jpg"
                alt="Programs Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.heading}>SKILLING AND LIVELIHOOD</h3>
                <p className={styles.text}>
                    ZAF utilizes sports and recreation activities as a tool to enhance the 
                    livelihood skills of underprivileged youth and women. This holistic program 
                    fosters self-reliance, financial independence, life skills and sustainable 
                    development thereby Improving employability and entrepreneurship skillsThis 
                    initiative ensures that the benefits of ZAFs programs are sustainable and 
                    have a long term impact. By engaging youths and women in sports, ZAF provides 
                    them with a constructive outlet and a platform to develop essential life skills, 
                    build self-esteem, and foster a sense of belonging.
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

