
// UserFilterSearch.jsx

"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import styles from './Filter.module.css';
import IncreaseImag from './components/IncreaseImag';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from 'react-icons/fa';

type FilterItem ={
  id: string;
  name: string;
  country: string;
  category: string;
  subcategory?: string;
  description: string;
  images?: string [];
  videos?: string [];
}


export default function Filter(){
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [search, setSearch] = useState({
  country: 'Uganda',
  category: 'Climate Justice Advocacy',
  subcategory: 'The ZAF Ecofit Camp'
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
    const q = query(collection(db, "filters"), orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);
  const data: FilterItem[] = snapshot.docs.map(doc => {
    const docData = doc.data() as Omit<FilterItem, 'id'>;
    return {
      id: doc.id,
      ...docData,
    };
  });

  // ✅ Show new programs at the bottom
  setFilters(data.reverse());
 };

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
              <h3 style={{textAlign: 'center', fontSize: '40px'}}><strong></strong> {item.category}</h3>
              <p style={{textAlign: 'center', fontSize: '15px'}}>{item.name}</p>
              {item.subcategory && <p><strong></strong> {item.subcategory}</p>}
              <p>{item.description}</p>
              <p><strong></strong> {item.country}</p>
              <div style={{ display: 'flex',flexWrap: 'wrap', flexDirection: 'initial',overflow: 'hidden', justifyContent: 'center',}}>
              {item.images?.map((img: string, i: number) => (
                <IncreaseImag key={i} src={img} alt={`Image ${i}`}  />
                     ))}
              
              {item.videos?.map((vid: string, i: number) => (
                <video key={i} controls style={{  marginTop: '10px', height: '30%', width: '30%'  }}>
                  <              source src={vid} type="video/mp4" />
                </video>
              ))}
              </div>
              <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center',paddingTop: '30px'}}><strong>For more Programs and activities you can follow us on our socialplatforms:</strong></p>
              <div style={{ display: "flex",justifyContent: "center",  gap: "40px", fontSize: "30px",paddingTop: '10px'}}>
                        <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                          <FaFacebook />
                        </a>
                        <a href="https://instagram.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}>
                          <FaInstagram />
                        </a>
                        <a href="https://tiktok.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                          <FaTiktok />
                        </a>
                        <a href="https://twitter.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                          <FaTwitter />
                        </a>
                        <a href="https://wa.me/256743878261" target="_blank" rel="noopener noreferrer" style={{ color: 'green' }}>
                          <FaWhatsapp />
                        </a>
                      </div>
                      <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center'}}><strong>Or you can email us for:</strong></p>
                      <div style={{display: 'flex',paddingTop: '10px', flexDirection: 'row', justifyContent: 'center', gap: '30px'}}>
                  <ul>
                  <li><a href="mailto: info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
                  <li><a href="mailto: support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
                  </ul>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
  }


