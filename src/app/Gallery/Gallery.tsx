"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import GetInvolved from "../GetInvolved/GetInvolved";
import IncreaseIma from "../Newsp/components/IncreaseIma";
import StickyBar from "../StickyBar/StickyBar";
import styles from './Gallery.module.css';
import ContactUs from "../ContactUs/page";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";

const Gallery = () => {
  const router = useRouter();

  return (
    <div style={{ overflow: 'hidden' }}>
      <div style={{ justifyItems: 'center', gap: '1%' }}>
              <StickyBar>
                <FaHome
                  style={{ width: '25%', height: '25%' }}
                  color="black"
                  cursor='pointer'
                  onClick={() => router.push('/')}
                >
                  Home
                </FaHome>
                <GetInvolved />
                <button
                  onClick={() => router.push('/Donates')}
                  className={styles.arrowButton}>Donate
                </button>
                <IncreaseIma src='/log.jpg' alt="log" />
              </StickyBar>
            </div>
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-6">Gallery</h2>

      <div className="flex justify-center gap-6">
        <button
          onClick={() => router.push("/Videos")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          View
        </button>

        
      </div>
    </div>
    <div style={{ margin: '3%', width: '100%' }}>
            <ContactUs />
          </div>
    
          <div style={{ margin: '0%', width: '100%' }}>
            <OptionalFeatures />
          </div>
    </div>
  );
};

export default Gallery;
