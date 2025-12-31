'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Programsservices2.module.css';
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
                src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757064571/zannya/uploads/lpux4wqm27omuk9u15ei.jpg"
                alt="Programs Preview"
                className={styles.cardImage}
                width={400}
                height={250}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.heading}>CLIMATE JUSTICE ADVOCACY</h3>
                <p ref={textRef}
                    className={`${styles.text} ${expanded ? styles.expanded : styles.clamped}`}
                    >
                    This program leverages sports to promote climate policy advocacy, education, 
                    and community engagement. This program is linked to climate action, 
                    promotes sustainability mind change and advocates for policy formulation 
                    and execution.We aim at raising awareness about climate change impacts 
                    on communities, promote climate policy advocacy and education and also 
                    foster sustainable lifestyles through sports thus empowering youth to 
                    become climate leaders
                </p>

                {showMore && (
                                    <button
                                        className={styles.moreBtn}
                                        onClick={() => setExpanded(!expanded)}
                                    >
                                        {expanded ? 'Show less' : 'Read more'}
                                    </button>
                                )}
                                
                <Link href="/Programs" className={styles.button}>View Program</Link>
            </div>
        </div>
    );
}

