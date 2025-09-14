'use client';
import { useRouter } from "next/navigation";
import styles from './Success.module.css';
import Image from "next/image";
export default function
Success (){
    const router =useRouter();
    return(
        <div id="Success"
        className={
            styles.previewcontainer
        }>
            <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756890840/zannya/success/mfh1xjdphnjokfqxtwqp.jpg"
            alt="Preview"
            className={
                styles.previewimage
            }></Image>
            <div 
            className={
                styles.previewtext
            }>
                <h3 className={styles.headings}>Success Stories</h3>
                <p>
                    Read inspiring stories of transformation and impact from communities we serve.
                </p>
                <button onClick={() =>
                    router.push('/Successs')
                }
                className={styles.arrowButton}>
                    Read More 
                </button>
            </div>
        </div>
    )
}