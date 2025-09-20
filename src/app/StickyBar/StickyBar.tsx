'use client';

import React, { ReactNode, useEffect, useState } from "react";

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
    position: 'fixed',     // ensures bar stays visible
    top: showBar ? '0' : '-100px',
    left: 0,
    right: 0,
    borderRadius: '10px',
    backgroundColor: 'white',
    color: 'blue',
    padding: '10px 15px',
    textAlign: 'center',
    transition: 'top 0.3s ease-in-out', // fixed "bottom" → should be "top"
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80px',
    width: '100%',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // subtle shadow for clarity
    }}
 >
  {children}
 </div>

    )
}