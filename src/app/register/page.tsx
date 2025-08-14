'use client';
import { useRouter } from "next/navigation";
import style from '../styles/auth.module.css';
import styles from './register.module.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import db, { auth } from "../lib/firebase";
import { setDoc, doc } from "firebase/firestore";

export default function
RegisterPage() {
    const router = useRouter();
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [place, setPlace] = useState('');
    const [phone, setPhone] = useState('');


    const handleRegister = async(e:
        React.FormEvent
    ) => {
        e.preventDefault();
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save extra data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      place,
      phone,
      email,
      createdAt: new Date(),
    });
            alert('Account Created!');
            router.push('/login');
        } catch (error: any) {
            alert('Registration failed:' + error.message);
        };
        
    };

    return (
        <div className={style.container}>
            <div className={styles.bucket}>
                <div className={styles.overlay}></div>
                <h1 className={styles.title}>Register</h1>
                <p className={styles.subtitle}>&quot;Register with us for more services!&quot;</p>
            </div>
            
            <form onSubmit={handleRegister}>
                <input type="text"
                placeholder="Full Name" required onChange={(e) => setFullName(e.target.value)}/>
                <input type="text"
                placeholder="Place" required onChange={(e) => setPlace(e.target.value)}/>
                <input type="email"
                placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>
                <input type="password"
                placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                <input type="number"
                placeholder="Phone number" required onChange={(e) => setPhone(e.target.value)}/>
                <button
                type="submit">Register</button>
            </form>
            <div className={style.link}>
                Already have an account?{''}
                <a onClick={() =>
                    router.push('/login')
                }
                style={{ cursor: 'pointer'}}>
                    Log In
                </a>
            </div>
        </div>
    );
}
