'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './GetInvolved.module.css';

export default function 
GetInvolved () {
    const router = useRouter();
    const [showPage, setShowPage] = useState(false);
    return(
        <div 
        onMouseEnter={() => setShowPage(true)}
        onMouseLeave={() => setShowPage(false)}
        style={{
            display: 'inline-block',
            position: 'relative',
        }}>
        <button
        onClick={() => router.push('')}
        style={{
            padding: '20px 20px',
            background: 'none',
            border: 'none',
            color: 'blue',
            cursor: 'pointer',
            fontSize: '16px',
            textDecoration: 'underline',
        }}> Get Involved</button>
        {showPage && (
            <div className={styles.page}>
                <h2 style={{color: 'blue', fontWeight: 'bold'}}>Get Involved</h2>
                <p style={{color: 'blue', fontWeight: 'bold'}}>Be part of the change!!</p>

                <h3 className={styles.Q}>
                    <p onClick={() => router.push('')}>Testimonial or Quote(/Successs)</p>
                </h3>

                <h3 className={styles.Q}>
                    <p onClick={() => router.push('')}>Stay Connected / Newsletter(/Newsp)</p>
                </h3>

                <h3 className={styles.Q}>
                    <p onClick={() => router.push('')}>Internships or Career Opportunities (/Internship)</p>
                </h3>

                <h3 className={styles.Q}>
                    <p>Start a Fundraiser</p>
                </h3>

                <h3 className={styles.Q}>
                    <p onClick={() => router.push('')}>Join Our Campaigns / Events (/Newsp)</p>
                </h3>

                <h3 className={styles.Q}>
                    <p onClick={() => router.push('')}>Partnerships & Sponsorships (/Missions)</p>
                </h3>

                <h3 className={styles.Q}>
                    <p onClick={() => router.push('')}>Donate / Support Financially (/Donates)</p>
                </h3>

                <h3 className={styles.Q}>
                    <p onClick={() => router.push('')}>Volunteer Opportunities (/Internship)</p>
                </h3>

                

            </div>
        )}
        </div>
    )
}