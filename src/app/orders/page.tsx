'use client';
import router from 'next/router';
import style from './orders.module.css';
import styles from './orders.module.css';
import BlueStripInput from '../blue/BlueStripInput';
import {
    FaComments,
} from 'react-icons/fa';
import OptionalFeatures from '../OptionalFeatures/OptionalFeatures';

export default function
SocialButtonsPage() {
    return (
        <div style={containerStyle}>
            <div className={styles.bucket}>
                <div className={styles.overlay}></div>
                <h1 className={styles.title}>ORDERS</h1>
                <p className={styles.subtitle}>Your orders!</p>
            </div>

            <div className={style.scrollContainer}>
                <BlueStripInput></BlueStripInput>
            </div>
            
            <div style={{ gap: '12px', position: 'relative', 
                height: '10px', border: '0px solid #ccc'
            }}>
                
            </div>

            {/* page content here */}
            <p>Click below to connect with us:</p>

            {/* Bottom Social Buttons */}

            <div style={socailBarStyle}>

                <button onClick={() =>
                                    alert('Chat clicked')
                                }
                                style={iconBtn}>
                                    <FaComments size={24} />
                                </button>

                <button onClick={() =>
                    router.push('')
                }
                style={btnStyle}>Approve</button>

            </div>
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

const socailBarStyle ={
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    padding: '16pxm0',
    borderTop: '1px solid #ccc',
    margingTop: 'auto',
};

const iconBtn ={
    background: 'none',
    border: 'none',
    color: '#333',
    cursor: 'pointer',
};

const btnStyle = {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#222',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
}

