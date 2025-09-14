'use client';

import { useRouter } from "next/navigation";
import styles from './Resources.module.css';
import Image from "next/image";

export default function
Resources (){
    const router =useRouter();

    return(
        <div id="Resources"
        className={
            styles.previewcontainer
        }>
            <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1757057739/zannya/uploads/ramv1oxyxz7ajwormsgj.jpg"
            alt="Preview"
            className={
                styles.previewimage
            }></Image>
            <div 
            className={
                styles.previewtext
            }>
                <h3 className={styles.headings}>Resources</h3>
                <p style={{overflow: 'hidden'}}>
                    Explore our resources, including reports, publications, research papers, and toolkits designed to share knowledge, promote advocacy, and support sustainable community development.
                </p>
                <button onClick={() =>
                    router.push('/Resourcess')
                }
                className={styles.arrowButton}>
                    Read More 
                </button>
            </div>
        </div>
    )
}