'use client';
import { useRouter } from "next/navigation";
import style from '../styles/auth.module.css';
import styles from './Login.module.css';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";

export default function
LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async(e:
        React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        console.log('Login button clicked');
        
        try {
            console.log('Trying to login with:', email, password);
            const userCredential = await
            signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful:', userCredential.user);
            alert('Login successful');
            router.push('/adminpannel')
        } catch (error: any) {
            console.error('Login failed:', error.message);
            setErrorMsg(error.message);
        }
        
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/adminpannel');
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className={style.container}>
            <div className={styles.bucket}>
                <div className={styles.overlay}></div>
                <h1 className={styles.title}>Login</h1>
                <p className={styles.subtitle}>Login for more features!</p>
                {errorMsg && <p className={styles.error}>{errorMsg}</p>}
            </div>
            <form onSubmit={handleLogin}>
                <input type="email"
                placeholder="Email" value={email} onChange={(e) =>setEmail(e.target.value)}required />
                <input type="password"
                placeholder="Password" value={password} onChange={(e) =>setPassword(e.target.value)} required />
                
                <button type="submit">LogIn</button>
            </form>
            <div className={style.link}>
                Don't have an account?{''}
                <a onClick={() =>
                    router.push('/register')
                }
                style={{ cursor: 'pointer'}}>
                    Reqister
                </a>
            </div>
        </div>
    );
}

