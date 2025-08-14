'use client';

import { useEffect, useState } from "react";
import Styles from "./ImageScroll.module.css";

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
    const [currentIndex, 
        setCurrentIndex
    ] = useState(0);


    useEffect(() => {
        const interval = setInterval(() =>
         {
            setCurrentIndex((prev) => (prev + 1) % images.length);
         }, 5000); // change image every 3 seconds

         return () => 
            clearInterval(interval);
    }, []);
    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <div className={Styles.scroll}>
            {images.map((src, index) => (
                <img
                key={index}
                src={src}
                className={`${Styles.image} ${index === currentIndex ? 
                    Styles.visible : ""
                }`}
                alt={`slide-${index}`}></img>
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
        }}
      >
        <h1 style={{color: 'rgb(128, 12, 12)',fontSize: '70px',
                        fontStyle: 'italic',marginBottom: '0', lineHeight: '1',
                             fontWeight: 'bolder'}}>
                            ZANNYA AFRICA 
                        </h1>
                        <h2 style={{color: 'black',fontSize: '70px',lineHeight: '1',
                        fontStyle: 'italic',marginBottom: '20px',
                             fontWeight: 'bolder'}}> FOUNDATION</h2>
                             <p>&quot;Changing the community through sports.&quot;</p>
      </div>
      </div>
    )
}