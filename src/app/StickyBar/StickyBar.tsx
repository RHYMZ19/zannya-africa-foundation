'use client';

import React, { ReactNode, useEffect, useState } from "react";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";

type Props = {
    children: ReactNode;
}

export default function 
StickyBar({children}: Props) {
    const [showBar, setShowBar] = 
    useState(false);
    const [lastScrollY, setLastscrollY]
    = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = 
            window.scrollY;
            if (currentScrollY > lastScrollY) {
                setShowBar(true);
            } else {
                setShowBar(false);
            }
            setLastscrollY(currentScrollY)
        };
        window.addEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div 
        style={{
            borderRadius: '10px',
            borderWidth: '2px',
            borderColor: '#67a8f1ff',
            top: showBar ? '0' : '-100px',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            color: 'blue',
            padding: '15px 20px',
            textAlign: 'center',
            transition: 'bottom 0.3s ease-in-out',
            zIndex: '10000',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
            height: '100px'
        }}> {children}
            
            
        </div>
    )
}