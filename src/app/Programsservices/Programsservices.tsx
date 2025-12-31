'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Programsservices.module.css';
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
        <div id="Programsservices" className={styles.card}>
            <Image 
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1758450150/zannya/uploads/h5anrmy2jcid8qjrbbls.jpg"
                alt="Programs Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />

            <div className={styles.cardContent}>
                <h3 className={styles.heading}>SKILLING AND LIVELIHOOD</h3>

                <p
                    ref={textRef}
                    className={`${styles.text} ${expanded ? styles.expanded : styles.clamped}`}
                >
                    ZAF utilizes sports and recreation activities as a tool to enhance the 
                    livelihood skills of underprivileged youth and women. This holistic program 
                    fosters self-reliance, financial independence, life skills and sustainable 
                    development thereby improving employability and entrepreneurship skills. 
                    This initiative ensures that the benefits of ZAF programs are sustainable and 
                    have a long-term impact. By engaging youths and women in sports, ZAF provides 
                    them with a constructive outlet and a platform to develop essential life skills, 
                    build self-esteem, and foster a sense of belonging.
                </p>

                {showMore && (
                    <button
                        className={styles.moreBtn}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Show less' : 'Read more'}
                    </button>
                )}

                <Link href="/Programs" className={styles.button}>
                    View Program
                </Link>
            </div>
        </div>
    );
}
