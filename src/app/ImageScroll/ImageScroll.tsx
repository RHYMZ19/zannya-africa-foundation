'use client';

import { useEffect, useState } from "react";
import Styles from "./ImageScroll.module.css";
import Image from "next/image";

const images = [
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1756890840/zannya/success/mfh1xjdphnjokfqxtwqp.jpg",
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1757333654/zannya/uploads/iyhvqvfahonojwp3lnqy.jpg",
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1757333734/zannya/uploads/xmfqh5bypbq8nwahzcpi.jpg",
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1757333840/zannya/uploads/efccpnjlewe1z851po9r.jpg",
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1757333929/zannya/uploads/rtguco09opxu1ayzksej.jpg",
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1757334022/zannya/uploads/m9ca4yojq1ryx6sehkg2.jpg",
    "https://res.cloudinary.com/dpwuym7xg/image/upload/v1757856069/zannya/uploads/otzyxuituddnljimi6lv.jpg",
]

export default function 
ImageScroll() {
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
      <div style={{ position: "absolute", width: "100%",height: '100%', zIndex: 0, inset: 0, }}>
        <div className={Styles.scroll}>
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`slide-${index}`}
              fill
              className={`${Styles.image} ${index === currentIndex ? Styles.visible : ""}`}
                 />
          ))}
        </div>
    </div>
  )
}