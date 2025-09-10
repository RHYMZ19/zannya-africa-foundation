'use client';

import React from "react";
import { useRouter } from "next/navigation";
import styles from './OptionalFeatures.module.css';
import Developer from "../Developer/page";

// icons
import {
    FaBullhorn, 
    FaShieldAlt, FaBalanceScale,
    FaCalendar,
    FaBlog,
    FaPhotoVideo,
    FaHandHoldingHeart,
    FaEnvelope,
    FaUsers
} from "react-icons/fa";

// ✅ Added `path` for each feature
const features = [ 
    {label: 'News', icon: <FaBullhorn />, path: '/Newsp'},
    {label: 'Events', icon: <FaCalendar />, path: '/Newsp'},
    {label: 'Blogs', icon: <FaBlog />, path: '/Newsp'},
    {label: 'Media', icon: <FaPhotoVideo />, path: '/Videos'},
    {label: 'Donate', icon: <FaHandHoldingHeart />, path: '/Donates'},
    {label: 'Contact Us', icon: <FaEnvelope />, path: '/Contacts'},
    {label: 'Get Involved', icon: <FaUsers />, path: '/Internship'},
    {label: 'Safety', icon: <FaShieldAlt />, path: ''},
    {label: 'Compare', icon: <FaBalanceScale />, path: ''},
];

export default function OptionalFeaturesPage() {
    const router = useRouter();

    const handleClick = (path: string) => {
        router.push(path); // ✅ navigate to the page
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}></h2>
            <div className={styles.grid}>
                {features.map((item, index) => (
                    <div 
                        key={index}
                        className={styles.item}
                        onClick={() => handleClick(item.path)} // ✅ navigate instead of alert
                    > 
                        <span className={styles.icon}>
                            {item.icon}
                        </span>
                        <span className={styles.label}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            <div>
                <Developer />
            </div>
        </div>
    );
}