'use client';


import { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import Gallery from '../Gallery/Gallery';
import GetInvolved from '../GetInvolved/GetInvolved';
import LanguageSelecter from '../LanguageSelecter/LanguageSelecter';
import StickyBar from '../StickyBar/StickyBar';
import styles from './Resourcess.module.css';
import OptionalFeatures from '../OptionalFeatures/OptionalFeatures';
import { useRouter } from 'next/navigation';
import ContactUs from '../ContactUs/page';
import Image from 'next/image';

const resources = [
  {
    title: 'Youth Innovation Case Study  2024',
    description: 'An in-depth case study on youth-led innovation hubs.',
    file: '/pdfs/Case Study-WPS Office.pdf',
    category: 'Case Studies'
  },
  {
    title: 'Annual Report 2023',
    description: 'Summary of our yearly activities and outcomes.',
    file: '/pdfs/Zannya Africa F-WPS Office.pdf',
    category: 'Reports'
  },
  {
    title: 'Digital Education in Rural Africa',
    description: 'Research paper analyzing technology in rural schools.',
    file: '/pdfs/Research Pap-WPS Office.pdf',
    category: 'Research Papers'
  }
];


const categories = ['All', 'Research Papers', 'Reports', 'Case Studies'];



export default function Resourcess() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const router = useRouter();

  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter(res => res.category === selectedCategory);

    const [visible, setVisible] = useState(false);
    
        useEffect(() => {
            
            setTimeout(() =>
        setVisible(true), 100);}, []);

  return (
    <div>
      <StickyBar>
        <FaHome size={24} color="black" cursor='pointer' onClick={() => router.push('/')} >
                    Home</FaHome>
          <GetInvolved />
            <LanguageSelecter />
              <Gallery />
            <button onClick={() =>
              router.push('')}
              className={styles.arrowButton}>Donate
            </button>
        < Image src='/log.jpg' alt="log" width={100} height={100}></Image>
      </StickyBar>

                  <div className={styles.container}>
                                  <header className={`header ${visible ? 'show' : ""}`}>
                                  <h1 className={styles.h1}>
                                      ZANNYA AFRICA FOUNDATION
                                  </h1>
                                  <p className={styles.p1}>
                                      "changing the community through sports"
                                  </p>
                                  </header>
                              </div>

                              <div style={{width: '100%', height: '500px',justifyContent: 'center',backgroundColor: '#f5fafac7', 
            margin: 0,display: 'flex', padding: '0px', paddingBottom: '150px'}}>
                                <Image src="./camp/camp1.jpg" alt="image" style={{width: '100%', height: '500px', display: 'block'}}></Image>
                              </div>

    <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Resources & Publications</h1>

      {/* Category Filters */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: selectedCategory === cat ? '2px solid #007bff' : '1px solid #ccc',
              backgroundColor: selectedCategory === cat ? '#e7f1ff' : '#fff',
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resources List */}
      {filteredResources.map((res, index) => (
        <div key={index} style={{
          backgroundColor: '#f9f9f9',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h3>{res.title}</h3>
          <p>{res.description}</p>
          <a href={res.file} download style={{ color: '#007bff', textDecoration: 'underline' }}>
            Download PDF
          </a>
        </div>
      ))}
    </div>

    <ContactUs></ContactUs>
    <OptionalFeatures></OptionalFeatures>
    </div>
  );
}