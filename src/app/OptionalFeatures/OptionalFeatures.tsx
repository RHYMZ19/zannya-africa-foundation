'use client';

import React from "react";
import styles from './OptionalFeatures.module.css';

// icons
import {
    FaNewspaper, FaCar, FaShoppingCart, FaLightbulb,
    FaStar, FaBookOpen, FaTag, FaShieldAlt, FaBalanceScale
} from "react-icons/fa";
import Developer from "../Developer/Developer";



const features = [ 
    {label: 'News', icon: <FaNewspaper />},
    {label: 'Car', icon: <FaCar />},
    {label: 'Buy', icon: <FaShoppingCart />},
    {label: 'Tips', icon: <FaLightbulb />},
    {label: 'Review', icon: <FaStar />},
    {label: 'Guides', icon: <FaBookOpen />},
    {label: 'Offers', icon: <FaTag />},
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
            <h2 className={styles.heading}>Optional Features</h2>
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
            <Developer></Developer>
        </div>
    );
}