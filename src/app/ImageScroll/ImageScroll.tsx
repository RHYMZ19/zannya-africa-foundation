'use client';

import { useEffect, useState } from "react";
import Styles from "./ImageScroll.module.css";
import Image from "next/image";
import { db } from "../lib/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

const images = [
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1756890840/zannya/success/mfh1xjdphnjokfqxtwqp.jpg",
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1757333654/zannya/uploads/iyhvqvfahonojwp3lnqy.jpg",
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1757333734/zannya/uploads/xmfqh5bypbq8nwahzcpi.jpg",
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1757333840/zannya/uploads/efccpnjlewe1z851po9r.jpg",
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1757333929/zannya/uploads/rtguco09opxu1ayzksej.jpg",
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1757334022/zannya/uploads/m9ca4yojq1ryx6sehkg2.jpg",
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1757334062/zannya/uploads/yjpj7fwg6mbpeydigzr1.png",
]

export default function 
ImageScroll() {
 const [displayCount, setDisplayCount] = useState<number>(0); // animated number
  useEffect(() => {
    const updateViews = async () => {
      try {
        const docRef = doc(db, "siteStats", "views");

        // 🔹 Increase count in Firestore by 1
        await updateDoc(docRef, { count: increment(1) });

        // 🔹 Get updated value
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const newCount = docSnap.data().count;

          // 🔹 Animate count-up
          let current = 0;
          const step = Math.ceil(newCount / 50); // number increments per step
          const interval = setInterval(() => {
            current += step;
            if (current >= newCount) {
              current = newCount;
              clearInterval(interval);
            }
            setDisplayCount(current);
          }, 30); // speed (ms per step)
        }
      } catch (error) {
        console.error("Error updating views:", error);
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
          top: "35%",
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
      <p>👀 <strong>STILL UNDER DEVELOPMENT!!!!</strong>: {displayCount}</p>
    </div>
    </div>
  </div>
  )
}