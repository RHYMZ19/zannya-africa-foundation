
// UserFilterSearch.jsx

"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from './Filter.module.css';

type FilterItem ={
  id: string;
  name: string;
  country: string;
  category: string;
  subcategory?: string;
  description: string;
  image?: string;
  video?: string;
}

export default function Filter(){
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [search, setSearch] = useState({
  country: 'Uganda',
  category: 'Climate & Environmental Programs',
  subcategory: 'Tree Planting'
  });

  const [filteredData, setFilteredData] = useState<FilterItem[]>([]);

  

 useEffect(() => {
  if (filters.length > 0) {
    const filtered = filters.filter(
      (item) =>
        item.country === search.country &&
        item.category === search.category &&
        item.subcategory === search.subcategory
      );
    setFilteredData(filtered);
  }
 }, [filters, search]); // run once when Firestore data loads

  const fetchFilters = async () => {
    const snapshot = await getDocs(collection(db, 'filters'));
    const data : FilterItem[] = snapshot.docs.map(doc => { const docData = doc.data
      () as Omit<FilterItem, 'id'>;
      return {
        id: doc.id,
        ...docData,
      };
    
  });
  setFilters(data);}

  useEffect(() => {
    fetchFilters();
  }, []);

  

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch(prev => ({
      ...prev,
      [name]: value
    }));
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
        <select name="country" value={search.country} onChange={handleChange}>
          <option value="">All Countries</option>
          <option value="Kenya">Kenya</option>
          <option value="Uganda">Uganda</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Ghana">Ghana</option>
        </select>
        

        <select name="category" value={search.category} onChange={handleChange}>
          <option value="">All Categories</option>
          <option value="Education Programs">Education Programs</option>
          <option value="Health & Wellness Programs">Health & Wellness Programs</option>
          <option value="Climate & Environmental Programs">Climate & Environmental Programs</option>
          <option value="Youth Empowerment Programs">Youth Empowerment Programs</option>
          <option value="Community Support Programs">Community Support Programs</option>
          <option value="Technology & Innovation Programs">Technology & Innovation Programs</option>
          <option value="Cultural & Entertainment Programs">Cultural & Entertainment Programs</option>
        </select>

        {/* Show subcategory ONLY if category is selected */}
          {search.category && (
            <select
              name="subcategory"
              value={search.subcategory}
              onChange={handleChange}
            >
              <option value="">All Subcategories</option>
              {filteredSubcategories.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          )}
      </div>
      

      <div className={styles.resultslist}>
        {filteredData.length === 0 ? (
          <p>&quot;No results found.&quot;</p>
        ) : (
          filteredData.map(item => (
            <div key={item.id} className={styles.resultcard}>
              <h3 style={{textAlign: 'center', fontSize: '40px'}}><strong></strong> {item.category}</h3>
              <p style={{textAlign: 'center', fontSize: '15px'}}>{item.name}</p>
              {item.subcategory && <p><strong></strong> {item.subcategory}</p>}
              <p>{item.description}</p>
              <p><strong></strong> {item.country}</p>
              {item.image && <img src={item.image} alt={item.name} style={{ maxWidth: '100%', borderRadius: '8px' }} />}
              {item.video && (
                <video controls style={{ maxWidth: '100%', marginTop: '10px' }}>
                  <source src={item.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
  }


