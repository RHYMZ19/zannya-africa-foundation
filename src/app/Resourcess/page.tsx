'use client';

import { useEffect, useState } from 'react';
import { FaFacebook, FaHome, FaInstagram, FaTiktok } from 'react-icons/fa';
import Gallery from '../Gallery/Gallery';
import GetInvolved from '../GetInvolved/GetInvolved';
import StickyBar from '../StickyBar/StickyBar';
import styles from './Resourcess.module.css';
import OptionalFeatures from '../OptionalFeatures/OptionalFeatures';
import { useRouter } from 'next/navigation';
import ContactUs from '../ContactUs/page';
import db from '../lib/firebase';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
import IncreaseIma from './components/IncreaseIma';
import Image from 'next/image';
import { FaXTwitter } from 'react-icons/fa6';

type Resource = {
  id: string;
  title: string;
  description: string;
  pdf: string;
  category: string;
  timestamp?: Timestamp;
};

const categories = ['All', 'Research Papers', 'Reports', 'Case Studies'];

export default function Resourcess() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  // Fetch resources from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'resources'), snapshot => {
      const items: Resource[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Resource, 'id'>)
      }));
      setResources(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter(res => res.category === selectedCategory);

  return (
    <div style={{overflow: 'hidden'}}>
      <div style={{justifyItems: 'center', gap: '1%'}}>
      <StickyBar>
        <FaHome style={{width: '25%', height: '25%'}} color="black" cursor='pointer' onClick={() => router.push('/')} >
          Home
        </FaHome>
        <GetInvolved />
        <Gallery />
        <button onClick={() => router.push('/Donates')} className={styles.arrowButton}>Donate</button>
        < IncreaseIma src='/log.jpg' alt="log" ></IncreaseIma>
      </StickyBar>
      </div>

      <div className={styles.container}>
        <header className={`header ${visible ? 'show' : ""}`}>
          <h1 className={styles.h1}>RESOURCES AND PUBLICATIONS</h1>
          <p className={styles.p1}>Zannya Africa foundation</p>
        </header>
      </div>

      <div className={styles.imageH}>
        <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756829071/zannya/uploads/kngkholnlp6wvmzq4pa8.jpg" alt="image" style={{ width: '70%', height: 'auto', display: 'block' }}></Image>
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
        {loading ? (
          <p>Loading resources...</p>
        ) : filteredResources.length === 0 ? (
          <p>No resources available.</p>
        ) : (
          filteredResources.map((res, index) => (
            <div className={styles.card} key={index} >
              <h3>{res.title}</h3>
              <p>{res.description}</p>
              <a href={res.pdf} download style={{ color: '#007bff', textDecoration: 'underline' }}>
                Download PDF
              </a>
            </div>
          ))
        )}
      </div>
      <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center',paddingTop: '30px'}}><strong>For more Resources and Publications you can follow us on our socialplatforms:</strong></p>
                    <div style={{ display: "flex",justifyContent: "center",  gap: "40px", fontSize: "30px",paddingTop: '10px'}}>
                              <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                                <FaFacebook />
                              </a>
                              <a href="https://instagram.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}>
                                <FaInstagram />
                              </a>
                              <a href="https://tiktok.com/zannyaafricaFDN" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                                <FaTiktok />
                              </a>
                              <a href="https://x.com/zannyaafrica" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                                  <FaXTwitter />   
                              </a>
                              
                            </div>
                            <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center'}}><strong>Or you can email us for:</strong></p>
                            <div style={{display: 'flex',paddingTop: '10px', flexDirection: 'row', justifyContent: 'center', gap: '30px'}}>
                        <ul>
                        <li><a href="mailto: info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
                        <li><a href="mailto: support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
                        </ul>
                      </div>

      <ContactUs />
      <OptionalFeatures />
    </div>
  );
}