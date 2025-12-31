'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Programsservices1.module.css';
import Image from "next/image";
import Link from "next/link";

export default function Programsservices() {
    const [expanded, setExpanded] = useState(false);
        const [showMore, setShowMore] = useState(false);
        const textRef = useRef<HTMLParagraphElement | null>(null);
        useEffect(() => {
            if (textRef.current) {
                // Check if text is overflowing
                setShowMore(textRef.current.scrollHeight > textRef.current.clientHeight);
            }
        }, []);


    return (
        <div id='Programsservices' className={styles.card}>
            <Image 
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758448906/zannya/uploads/cokcf4ojsqzzueeebtzh.jpg"
                alt="Programs Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.heading}>REPRODUCTIVE AND PHYSICAL HEALTH AWARENESS</h3>
                <p ref={textRef}
                    className={`${styles.text} ${expanded ? styles.expanded : styles.clamped}`}
                    
                    >
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

                {showMore && (
                    <button
                        className={styles.moreBtn}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Show less' : 'Read more'}
                    </button>
                )}

                <Link href="/Programs" className={styles.button}>Read More</Link>
            </div>
        </div>
    );
}

