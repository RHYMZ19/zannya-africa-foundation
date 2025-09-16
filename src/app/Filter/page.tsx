
// UserFilterSearch.jsx

"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import styles from './Filter.module.css';
import IncreaseImag from './components/IncreaseImag';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from 'react-icons/fa';

type FilterItem = {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  images?: string[];
  videos?: string[];
};

export default function Filter() {
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [search, setSearch] = useState({
    category: 'Climate Justice Advocacy',
    subcategory: ''
  });
  const [filteredData, setFilteredData] = useState<FilterItem[]>([]);

  // Filter whenever filters or search changes
  useEffect(() => {
    if (filters.length > 0) {
      const filtered = filters.filter(item => {
        const categoryMatch = !search.category || item.category === search.category;
        const subcategoryMatch = !search.subcategory || item.subcategory === search.subcategory;
        return categoryMatch && subcategoryMatch;
      });
      setFilteredData(filtered);
    }
  }, [filters, search]);

  const fetchFilters = async () => {
    const q = query(collection(db, "filters"), orderBy("createdAt", "asc"));
    const snapshot = await getDocs(q);
    const data: FilterItem[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<FilterItem, 'id'>)
    }));
    setFilters(data.reverse());
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch(prev => ({ ...prev, [name]: value }));
  };

  const filteredSubcategories = [
    ...new Set(
      filters
        .filter(f => f.category === search.category)
        .map(f => f.subcategory)
        .filter(Boolean)
    )
  ];

  return (
    <div className={styles.userfiltercontainer}>
      <h2>Explore Programs</h2>

      <div className={styles.filtersearchbar}>
        <select name="category" value={search.category} onChange={handleChange}>
          <option value="Skilling and Livelihood">Skilling and Livelihood</option>
          <option value="Reproductive & Physical Health Awareness">Reproductive & Physical Health Awareness</option>
          <option value="Climate Justice Advocacy">Climate Justice Advocacy</option>
        </select>

        {/* Show subcategory ONLY if category is selected */}
        {search.category && (
          <select
            name="subcategory"
            value={search.subcategory}
            onChange={handleChange}
          >
            <option value="">All Activities</option>
            {filteredSubcategories.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        )}
      </div>

      <div className={styles.resultslist}>
        {filteredData.length === 0 ? (
          <p>No results found.</p>
        ) : (
          filteredData.map(item => (
            <div key={item.id} className={styles.resultcard}>
              <h3 style={{ textAlign: 'center', fontSize: '40px' }}>{item.category}</h3>
              <p style={{ textAlign: 'center', fontSize: '15px' }}>{item.name}</p>
              {item.subcategory && <p>{item.subcategory}</p>}
              <p>{item.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {item.images?.map((img, i) => (
                  <IncreaseImag key={i} src={img} alt={`Image ${i}`} />
                ))}
                {item.videos?.map((vid, i) => (
                  <video key={i} controls style={{ marginTop: '10px', height: '30%', width: '30%' }}>
                    <source src={vid} type="video/mp4" />
                  </video>
                ))}
              </div>

              <p style={{ textDecoration: 'underline', color: 'rgb(235,125,125)', textAlign: 'center', paddingTop: '30px' }}>
                <strong>For more Programs and activities you can follow us on our social platforms:</strong>
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "40px", fontSize: "30px", paddingTop: '10px' }}>
                <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}><FaFacebook /></a>
                <a href="https://instagram.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}><FaInstagram /></a>
                <a href="https://tiktok.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}><FaTiktok /></a>
                <a href="https://twitter.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}><FaTwitter /></a>
                <a href="https://wa.me/256743878261" target="_blank" rel="noopener noreferrer" style={{ color: 'green' }}><FaWhatsapp /></a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

