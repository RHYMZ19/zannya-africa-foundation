'use client';
import OptionalFeatures from '../OptionalFeatures/OptionalFeatures';
import style from './approvedorders.module.css';
import styles from './approvedorders.module.css';



export default function
SocialButtonsPage() {
    return (
        <div style={containerStyle}>
            <div className={styles.bucket}>
                <div className={styles.overlay}></div>
                <h1 className={styles.title}>Approved orders</h1>
                <p className={styles.subtitle}></p>
            </div>

            <div className={style.scrollContainer}></div>
            <OptionalFeatures></OptionalFeatures>
            

            
        </div>
    )
}

const containerStyle = {
    padding: '2rem',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
};


