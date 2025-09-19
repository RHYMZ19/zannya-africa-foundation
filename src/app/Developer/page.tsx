'use client';
import React from 'react';
import styles from './Developer.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function 
Developer() {
    const router =useRouter();
    return (
     <div className={styles.container}>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '5%'}}>
          <p><a href="mailto: info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></p>
          <p><a href="mailto: support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></p>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '5%'}}>
          <p><a href="mailto: career@zannyaafricafoundation.org">careers@zannyaafricafoundation.org</a></p>
          <p><a href="mailto: contact@zannyaafricafoundation.org">contact@zannyaafricafoundation.org</a></p>
          </div>

          <p className={styles.words}>Developed by SSENABULYA RAHIM Tel: 0743878261</p>
          <p>
          <Link 
           href="/Terms" 
           style={{ cursor: "pointer"}}>
           Privacy Policy and Legal Terms
         </Link>
         </p>
        
        <p 
        style={{cursor: 'pointer'}}
        onClick={() => router.push('/adminpannel')}
        >Admin</p>
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Zannya Africa Foundation. All Rights Reserved.</p>
        </footer>
       </div>
)}