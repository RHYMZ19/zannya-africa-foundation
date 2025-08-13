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
            position: 'relative'
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
                    <p onClick={() => router.push('/Successs')}>Testimonial or Quote</p>
                </h3>

                <h3 className={styles.Q}>
                    <p onClick={() => router.push('/Newsp')}>Stay Connected / Newsletter</p>
                </h3>

                <h3 className={styles.Q}>
                    <p onClick={() => router.push('/Internship')}>Internships or Career Opportunities</p>
                </h3>

                <h3 className={styles.Q}>
                    <p>Start a Fundraiser</p>
                </h3>

                <h3 className={styles.Q}>
                    <p onClick={() => router.push('/Newsp')}>Join Our Campaigns / Events</p>
                </h3>

                <h3 className={styles.Q}>
                    <p onClick={() => router.push('/Missions')}>Partnerships & Sponsorships</p>
                </h3>

                <h3 className={styles.Q}>
                    <p onClick={() => router.push('/Donates')}>Donate / Support Financially</p>
                </h3>

                <h3 className={styles.Q}>
                    <p onClick={() => router.push('/Internship')}>Volunteer Opportunities</p>
                </h3>

                

            </div>
        )}
        </div>
    )
}