'use client';

import { useRouter } from "next/navigation";
import styles from './Resources.module.css';
import Image from "next/image";
import Link from "next/link";

export default function Resources() {
    const router = useRouter();

    return (
        <div id="Resources" className={styles.card}>
            <Image 
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757057739/zannya/uploads/ramv1oxyxz7ajwormsgj.jpg"
                alt="Resources Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.heading}>Resources</h3>
                <p className={styles.text}>
                    Explore our resources, including reports, publications, research papers...
                </p>
                <Link href="/Resourcess" className={styles.button}>Read More</Link>
            </div>
        </div>
    );
}