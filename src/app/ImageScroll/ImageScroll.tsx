'use client';

import { useEffect, useState } from "react";
import Styles from "./ImageScroll.module.css";
import Image from "next/image";
import { db } from "../lib/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

const images = [
    "/images/pic2.jpg",
    "/images/pic4.jpg",
    "/images/pic5.jpg",
    "/images/pic6.jpg",
    "/images/pic7.jpg",
    "/images/pic1.jpg",
    "/images/pic3.jpg",
]

export default function 
ImageScroll() {
 const [views, setViews] = useState<number | null>(null);
  useEffect(() => {
    const updateViews = async () => {
      const docRef = doc(db, "siteStats", "views");

      // increment by 1 every time page loads
      await updateDoc(docRef, {
        count: increment(1),
      });

      // fetch the updated value
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setViews(docSnap.data().count);
      }
    };

    updateViews();
  }, []);


    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() =>
         {
            setCurrentIndex((prev) => (prev + 1) % images.length);
         }, 5000); // change image every 3 seconds

         return () => 
            clearInterval(interval);
    }, []);

    return (
      <div style={{ position: "relative", width: "100%",height: '500px'}}>
        <div className={Styles.scroll}>
            {images.map((src, index) => (
                <Image
                key={index}
                src={src}
                className={`${Styles.image} ${index === currentIndex ? 
                    Styles.visible : ""
                }`}
                alt={`slide-${index}`}></Image>
            ))}
        </div>
        <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          backgroundColor: "transparent", // transparent
          color: "white",
          padding: "20px",
          borderRadius: "12px",
          backdropFilter: "blur(1px)",
          zIndex: 2,
          textAlign: "center",
          overflow: 'hidden'
        }}
      >
        STILL UNDER DEVELOPMENT!
      </div>
      
      <div
      style={{
          position: "absolute",
          bottom: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          
          color: "blue",
          padding: "20px",
          borderRadius: "12px",
          backdropFilter: "blur(1px)",
          zIndex: 2,
          textAlign: "center",
          height: '30vh',
        }}>
        

      <div style={{ textAlign: "center", marginTop: "20px",fontSize: "30px", fontWeight: "bolder" , right: '20%' }}>
      <p>👀 <strong>STILL UNDER DEVELOPMENT!!!!</strong>: {views ?? "Loading..."}</p>
    </div>

    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '30px'}}>
      <ul>
      <li><a href="mailto: info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
      <li><a href="mailto: support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
      </ul>
    </div>
    
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px', marginTop: '10px'}}>
      <ul>
      <li><a href="mailto: contact@zannyaafricafoundation.org">contact@zannyaafricafoundation.org</a></li>
      <li><a href="mailto: admin@zannyaafricafoundation.org">admin@zannyaafricafoundation.org</a></li>
      </ul>
    </div>
    </div>
  </div>
  )
}