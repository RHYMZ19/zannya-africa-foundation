'use client';

import { useEffect, useRef } from "react";
import Styles from "./ImageScroll.module.css";

const images = [
    "/images/car1.jpg",
    "/images/car2.jpg",
    "/images/car3.jpg",
]

export default function 
ImageScroll() {
    const trackRef = 
    useRef<HTMLDivElement>(null);

    const imageList = 
    [...images, ...images];

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let start = 0;
        let frameId: number;

        function animate() {
            start -= 0.5; // scroll speed
            if (start <=
                -track!.scrollWidth / 2
            ) {
                start = 0; // reset position for seamless scroll
            }
            track!.style.transform = 
            `translateX(${start}px)`;
            frameId = 
            requestAnimationFrame(animate);
        }

        animate();
        return () =>
            cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className={Styles.scroll}>
            <div className={Styles.track}
            ref={trackRef}>
                {imageList.map((src, index) =>
                (
                    <img key={index} src={src}
                    className={Styles.image}></img>
                ))}
            </div>
        </div>
    )
}