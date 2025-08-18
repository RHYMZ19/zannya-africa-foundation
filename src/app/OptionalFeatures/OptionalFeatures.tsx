'use client';

import React from "react";
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




const features = [ 
    {label: 'News', icon: <FaBullhorn />},
    {label: 'Events', icon: <FaCalendar />},
    {label: 'Blogs', icon: <FaBlog />},
    {label: 'Media', icon: <FaPhotoVideo />},
    {label: 'Donate', icon: <FaHandHoldingHeart />},
    {label: 'Contact Us', icon: <FaEnvelope />},
    {label: 'Get Involved', icon: <FaUsers />},
    {label: 'Safety', icon: <FaShieldAlt />},
    {label: 'Compare', icon: <FaBalanceScale />},
];

export default function 
OptionalFeaturesPage(){

    const handleClick = (label: string)=> {
        alert(`${label}`);
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}></h2>
            <div className={styles.grid}>
                {features.map((item, index) => (
                    <div key={index}
                        className={styles.item}
                        onClick={()=> handleClick(item.label)}> <span
                            className={styles.icon}>
                            {item.icon}
                        </span>
                        <span
                            className={styles.label}>{item.label}</span>
                            </div>
                ))}
            </div>
            <div>
            <Developer></Developer>
            </div>
        </div>
    );
}