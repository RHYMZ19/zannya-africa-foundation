'use client';
import { useRouter } from "next/navigation";
import styles from './userdashboard.module.css';
import style from './userdashboard.module.css';
import { FaWhatsapp, FaFacebook, 
    FaTwitter, FaEnvelope, FaComments
} from 'react-icons/fa';
import OptionalFeatures from '../OptionalFeatures/OptionalFeatures';

export default function
SocialButtonsPage() {
    const router = useRouter();
    return (
        <div style={containerStyle}>
            <div className={styles.bucket}>
                <div className={styles.overlay}></div>
                <h1 className={styles.title}>User Dashboard</h1>
                <p className={styles.subtitle}>Thanks for making a good choice!</p>
            </div>

            <div className={style.scrollContainer}></div>
            
            <div style={{ display: 'flex', gap: '12px',
            }}>
                <button onClick={() =>
                    router.push('/featuredcars')
                }
                style={btnStyle}>Edit</button>

                <button onClick={() =>
                    router.push('/ordercars')
                }
                style={btnStyle}>Order</button>

                
                <button onClick={() =>
                    router.push('')
                }
                style={btnStyle}>Delete</button>

                  </div>

            {/* page content here */}
            <p>Click below to connect with us:</p>

            {/* Bottom Social Buttons */}

            <div style={socailBarStyle}>
                <a
                href="https://wa.me/your-number"
                target="_blank" rel="noopener
                noreferrer" style={iconBtn}>
                    <FaWhatsapp size={24} />
                </a>

                                <a
                href="https://facebook.com"
                target="_blank" rel="noopener
                noreferrer" style={iconBtn}>
                    <FaFacebook size={24} />
                </a>

                                <a
                href="https://twitter.com"
                target="_blank" rel="noopener
                noreferrer" style={iconBtn}>
                    <FaTwitter size={24} />
                </a>

                                <a
                href="mailto:example@email.com"
                target="_blank" rel="noopener
                noreferrer" style={iconBtn}>
                    <FaEnvelope size={24} />
                </a>

                <button onClick={() =>
                    alert('Chat clicked')
                }
                style={iconBtn}>
                    <FaComments size={24} />
                </button>
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

