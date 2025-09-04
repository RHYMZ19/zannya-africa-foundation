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
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import Image from "next/image";
import IncreaseIma from "./components/IncreaseIma";

// Import the same categories structure
const categories = {
  'Skilling and Livelihood': {
    title: 'Skilling and Livelihood',
    description: 'Programs aimed at improving skills, income, and community engagement.',
    subcategories: ['Vocational Training', 'Income Generating Activities', 'Sports Skilling', 'Mentorship on Life Skills']
  },
  'Reproductive & Physical Health Awareness': {
    title: 'Reproductive & Physical Health Awareness',
    description: 'Programs focused on health education, family planning, and fitness.',
    subcategories: [
      'Sexual and Reproductive Health Education',
      'Menstrual Health Management',
      'Family Planning, Career Guidance and Counselling',
      'Organized Sports and Fitness',
      'Nutrition & Healthy Eating',
      'Disease Prevention and Management',
      'Community Outreaches',
      'Partnerships and Collaborations',
      'Advocacy Efforts'
    ]
  },
  'Climate Justice Advocacy': {
    title: 'Climate Justice Advocacy',
    description: 'Programs to promote climate awareness and community-led action.',
    subcategories: [
      'Climate Change Awareness and Education',
      'Advocacy and Policy Influence',
      'The ZAF Ecofit Camp',
      'Climate Initiative in Schools',
      'Sports Clubs for Community Cleaning',
      'Fruit Tree Plant per Home Initiative',
      'Community-Led Climate Action'
    ]
  }
};

export default function Programs() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    AOS.init({ duration: 1000 });
    setTimeout(() => setVisible(true), 100);
  }, []);

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
  <option value="">-- Select Category --</option>
  {(Object.keys(categories) as (keyof typeof categories)[]).map(cat => (
    <option key={cat} value={cat}>{categories[cat].title}</option>
  ))}
</select>

{selectedCategory && (
  <div style={{ marginTop: '20px' }}>
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }}>
      <h2 style={{ fontSize: '24px', color: '#d32f2f', marginBottom: '10px' }}>
        {categories[selectedCategory as keyof typeof categories].title}
      </h2>
      <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '15px' }}>
        {categories[selectedCategory as keyof typeof categories].description}
      </p>
      <h3 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: '600' }}>Subcategories:</h3>
      <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
        {categories[selectedCategory as keyof typeof categories].subcategories.map(sub => (
          <li key={sub} style={{ marginBottom: '6px', fontSize: '15px' }}>{sub}</li>
        ))}
      </ul>
    </div>
  </div>
)}
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
