'use client';

import { FaHome } from "react-icons/fa";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import StickyBar from "../StickyBar/StickyBar";
import styles from './Programs.module.css';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactUs from "../ContactUs/page";
import Image from "next/image";
import IncreaseIma from "./components/IncreaseIma";

import db from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";

// Category titles
const categories = {
  'Skilling and Livelihood': 'Skilling and Livelihood',
  'Reproductive & Physical Health Awareness': 'Reproductive & Physical Health Awareness',
  'Climate Justice Advocacy': 'Climate Justice Advocacy'
};

// Define proper types
interface Subcategory {
  name: string;
  description?: string;
}

interface Program {
  id: string;
  name: string;
  description: string;
  subcategories?: Subcategory[];
  images?: string[];
  videos?: string[];
  category: string;
}

export default function Programs() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    setTimeout(() => setVisible(true), 100);
  }, []);

  // Fetch programs from Firestore when category changes
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchPrograms = async () => {
      try {
        const q = query(
          collection(db, "filters"),
          where("category", "==", selectedCategory)
        );
        const snapshot = await getDocs(q);
        const data: Program[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Program[];
        setPrograms(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, [selectedCategory]);

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
          <Gallery />
          <button
            onClick={() => router.push('')}
            className={styles.arrowButton}>Donate
          </button>
          <IncreaseIma src='/log.jpg' alt="log" />
        </StickyBar>
      </div>

      <div className={styles.container}>
        <header className={`header ${visible ? 'show' : ""}`}>
          <h1 className={styles.h1}>PROGRAMS AND ACTIVITIES</h1>
          <p className={styles.p1}>Zannya Africa Foundation</p>
        </header>
      </div>

      <div style={{
        width: '100%',
        height: '50%',
        justifyItems: 'center',
        gap: '1%',
        margin: '0%',
        display: 'flex',
        flexDirection: 'row',
        padding: '1%',
        paddingBottom: '0%'
      }}>
        <Image src='/images/pic3.jpg' alt="pic" style={{ display: 'block', height: '100%', width: '33%' }} />
        <Image src='/images/pic1.jpg' alt="pic" style={{ display: 'block', height: '100%', width: '33%' }} />
        <Image src='/images/pic4.jpg' alt="pic" style={{ display: 'block', height: '100%', width: '33%' }} />
      </div>

      <div style={{ height: '40%', width: '100%', justifyItems: 'center', backgroundColor: 'white' }}>
        <h1 style={{ fontSize: '40px', color: 'red', margin: '20px', fontWeight: 'bold' }}>
          Programs and Activities
        </h1>
        <p style={{ paddingLeft: '10%', paddingRight: '10%' }}>
          ZAF has developed a variety of programs and activities designed to address
          key social issues and transform the socio-economic status of individuals living
          in slums and impoverished communities. These programs include:
        </p>

        <div data-aos='fade-up' style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{
            width: '90%',
            maxWidth: '800px',
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}>
            {/* Category Selection */}
            <label style={{ fontWeight: 'bold', fontSize: '18px', display: 'block', marginBottom: '10px' }}>
              Select Program Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '16px',
                marginBottom: '20px'
              }}
            >
              <option value="">-- Select a program --</option>
              {(Object.keys(categories) as (keyof typeof categories)[]).map(cat => (
                <option key={cat} value={cat}>{categories[cat]}</option>
              ))}
            </select>

            {/* Render admin-added programs */}
            {selectedCategory && programs.map(program => (
              <div key={program.id} style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                marginBottom: '20px'
              }}>
                <h2 style={{ fontSize: '24px', color: '#d32f2f', marginBottom: '10px' }}>{program.name}</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '15px' }}>{program.description}</p>

                <h3 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: '600' }}>Activities:</h3>
                <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                  {program.subcategories?.map((sub: Subcategory, i: number) => (
                    <li key={i} style={{ marginBottom: '10px', fontSize: '15px' }}>
                      <strong>{sub.name}:</strong> {sub.description || 'No description provided.'}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                  {program.images?.map((img: string, i: number) => (
                    <Image key={i} src={img} alt={`Image ${i}`} width={150} height={100} style={{ objectFit: 'cover' }} />
                  ))}
                  {program.videos?.map((vid: string, i: number) => (
                    <video key={i} controls style={{ width: '200px', margin: '5px' }}>
                      <source src={vid} type="video/mp4" />
                    </video>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
}