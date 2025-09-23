'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../lib/firebase';
import { useRouter } from 'next/navigation';
import StickyBar from '../StickyBar/StickyBar';
import GetInvolved from '../GetInvolved/GetInvolved';
import Gallery from '../Gallery/Gallery';
import IncreaseIma from './components/IncreaseIma';
import Image from 'next/image';
import { FaFacebook, FaHome, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import ContactUs from '../ContactUs/page';
import OptionalFeatures from '../OptionalFeatures/OptionalFeatures';
import styles from './Resourcess.module.css';

export interface Resource {
  id: string;
  title: string;
  description: string;
  pdf: string;
  category: string;
  timestamp?: string;
}

interface Props {
  initialResources: Resource[];
}

const categories = ['All', 'Research Papers', 'Reports', 'Case Studies'];

export default function ResourcessClient({ initialResources }: Props) {
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visible, setVisible] = useState(false);

  useEffect(() => setTimeout(() => setVisible(true), 100), []);

  // Real-time updates from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'resources'), snapshot => {
      const items: Resource[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          pdf: data.pdf,
          category: data.category,
          timestamp: data.timestamp?.toDate
            ? data.timestamp.toDate().toISOString()
            : new Date().toISOString(),
        };
      });
      setResources(items);
    });

    return () => unsubscribe();
  }, []);

  const filteredResources =
    selectedCategory === 'All'
      ? resources
      : resources.filter(res => res.category === selectedCategory);

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Sticky Navbar */}
      <StickyBar>
        <FaHome
          style={{ width: '25%', height: '25%' }}
          color="black"
          cursor="pointer"
          onClick={() => router.push('/')}
        />
        <GetInvolved />
        <Gallery />
        <Link href="/Donates" className={styles.arrowButton}>
          Donate
        </Link>
        <IncreaseIma src="/log.jpg" alt="log" />
      </StickyBar>

      {/* Header */}
      <div className={styles.container}>
        <header className={`header ${visible ? 'show' : ''}`}>
          <h1 className={styles.h1}>RESOURCES AND PUBLICATIONS</h1>
          <p className={styles.p1}>Zannya Africa Foundation</p>
        </header>
      </div>

      {/* Banner Image */}
      <div className={styles.imageH}>
        <Image
          src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756829071/zannya/uploads/kngkholnlp6wvmzq4pa8.jpg"
          alt="banner"
          style={{ width: '70%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '30px 0', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: selectedCategory === cat ? '2px solid #007bff' : '1px solid #ccc',
              backgroundColor: selectedCategory === cat ? '#e7f1ff' : '#fff',
              cursor: 'pointer',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resources List */}
      <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto' }}>
        {filteredResources.length === 0 ? (
          <p>No resources available.</p>
        ) : (
          filteredResources.map(res => (
            <div className={styles.card} key={res.id}>
              <h3>{res.title}</h3>
              <p>{res.description}</p>
              <a href={res.pdf} download style={{ color: '#007bff', textDecoration: 'underline' }}>
                Download PDF
              </a>
            </div>
          ))
        )}
      </div>

      {/* Social Links */}
      <p style={{ textAlign: 'center', paddingTop: '30px', textDecoration: 'underline', color: 'rgb(235,125,125)' }}>
        <strong>Follow us on social platforms:</strong>
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', fontSize: '30px', paddingTop: '10px' }}>
        <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://instagram.com/zannya_africa_foundation" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://tiktok.com/@zannyaafricafdn" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
        <a href="https://x.com/zannyaafrica" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
      </div>

      {/* Email Contacts */}
      <p style={{ textAlign: 'center', textDecoration: 'underline', color: 'rgb(235,125,125)' }}>
        <strong>Or email us for inquiries:</strong>
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', paddingTop: '10px' }}>
        <ul>
          <li><a href="mailto:info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
          <li><a href="mailto:support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
        </ul>
      </div>

      <ContactUs />
      <OptionalFeatures />
    </div>
  );
}