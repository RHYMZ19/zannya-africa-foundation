'use client';

import { useEffect, useState } from "react";
import Styles from "./ImageScroll.module.css";
import Image from "next/image";

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

  const [display, setDisplay] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    // Fetch visitor count from API
    fetch('/api/increment-visitor')
      .then(res => res.json())
      .then(data => {
        setCount(data.count); // final count
      });
  }, []);


  
  useEffect(() => {
    if (count > 0) {
      let start = 0;
      const step = Math.ceil(count / 50); // speed (50 steps)
      const interval = setInterval(() => {
        start += step;
        if (start >= count) {
          setDisplay(count);
          clearInterval(interval);
        } else {
          setDisplay(start);
        }
      }, 30); // update every 30ms
      return () => clearInterval(interval);
    }
  }, [count]);

  



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
        

      <div style={{ fontSize: "24px", fontWeight: "bold" , right: '20%'}}>
      👀 Visitors: {display}
      </div>

    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '30px'}}>
      <ul>
      <li><a href="malito: info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
      <li><a href="malito: support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
      </ul>
    </div>

    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px', marginTop: '10px'}}>
      <ul>
      <li><a href="malito: contact@zannyaafricafoundation.org">contact@zannyaafricafoundation.org</a></li>
      <li><a href="malito: admin@zannyaafricafoundation.org">admin@zannyaafricafoundation.org</a></li>
      </ul>
    </div>
    </div>
  </div>
  )
}