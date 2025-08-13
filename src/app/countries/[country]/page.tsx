'use client';

import { useParams } from "next/navigation"
import { useState } from "react";
import FilterBars from "../../FilterBars/FilterBars";
import styles from './country.module.css';

const mockData= [
    //Uganda content
    {id: 1, title: 'Teaching in Uganda', country: 'uganda', type: 'supportive', category: 'teaching'},
    {id: 2, title: 'Climate in Uganda', country: 'uganda', type: 'supportive', category: 'climate'},
    {id: 3, title: 'Innovation in Uganda', country: 'uganda', type: 'supportive', category: 'innovation'},
    {id: 4, title: 'Diseases in Uganda', country: 'uganda', type: 'supportive', category: 'diseases'},
    {id: 5, title: 'Helping in Uganda', country: 'uganda', type: 'supportive', category: 'helping'},
    {id: 6, title: 'Football in Uganda', country: 'uganda', type: 'sports', category: 'football'},
    {id: 7, title: 'Netball in Uganda', country: 'uganda', type: 'sports', category: 'netball'},
    {id: 8, title: 'Vollayball in Uganda', country: 'uganda', type: 'sports', category: 'vollayball'},
    {id: 9, title: 'Busketball in Uganda', country: 'uganda', type: 'sports', category: 'busketball'},

    //Kenya content
    {id: 10, title: 'Teaching in Kenya', country: 'kenya', type: 'supportive', category: 'teaching'},
    {id: 11, title: 'Climate in Kenya', country: 'kenya', type: 'supportive', category: 'climate'},
    {id: 12, title: 'Innovation in Kenya', country: 'kenya', type: 'supportive', category: 'innovation'},
    {id: 13, title: 'Diseases in Kenya', country: 'kenya', type: 'supportive', category: 'diseases'},
    {id: 14, title: 'Helping in Kenya', country: 'kenya', type: 'supportive', category: 'helping'},
    {id: 15, title: 'Football in Kenya', country: 'kenya', type: 'sports', category: 'football'},
    {id: 16, title: 'Netball in Kenya', country: 'kenya', type: 'sports', category: 'netball'},
    {id: 17, title: 'Vollayball in Kenya', country: 'kenya', type: 'sports', category: 'vollayball'},
    {id: 18, title: 'Busketball in Kenya', country: 'kenya', type: 'sports', category: 'busketball'},

    //Nigeria content
    {id: 19, title: 'Teaching in Nigeria', country: 'nigeria', type: 'supportive', category: 'teaching'},
    {id: 20, title: 'Climate in Nigeria', country: 'nigeria', type: 'supportive', category: 'climate'},
    {id: 21, title: 'Innovation in Nigeria', country: 'nigeria', type: 'supportive', category: 'innovation'},
    {id: 22, title: 'Diseases in Nigeria', country: 'nigeria', type: 'supportive', category: 'diseases'},
    {id: 23, title: 'Helping in Nigeria', country: 'nigeria', type: 'supportive', category: 'helping'},
    {id: 24, title: 'Football in Nigeria', country: 'nigeria', type: 'sports', category: 'football'},
    {id: 25, title: 'Netball in Nigeria', country: 'nigeria', type: 'sports', category: 'netball'},
    {id: 26, title: 'Vollayball in Nigeria', country: 'nigeria', type: 'sports', category: 'vollayball'},
    {id: 27, title: 'Busketball in Nigeria', country: 'nigeria', type: 'sports', category: 'busketball'},
]

export default function
Page() {
    const params = useParams();
    const country  = Array.isArray(params.country) ? params.country[0] : params.country;
    const [filters, setFilters] = useState({supportive: '', sports: ''});

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
    };

    

    const filteredData = 
    mockData.filter(item => {
        const countryParam = country?.toLowerCase();
        
        const itemCountry = item.country.toLowerCase();

        console.log('item:', item);
        console.log('URL country param:', country);
        console.log('country match:', item.country === countryParam);
        
        const isSupportiveMatch = item.type === 'supportive'
        && (!filters.supportive || item.category === filters.supportive);

        const isSportsMatch = item.type === 'sports'
        && (!filters.sports || item.category === filters.sports);
        
        console.log('supportive match:', isSupportiveMatch);
        console.log('sport match:', isSportsMatch);

        return (itemCountry === countryParam) && (isSupportiveMatch || isSportsMatch);
    });

    return (
        <div className={styles.page}>
            <h1>
                {country}Programs
            </h1>
            <FilterBars onFilterChange={handleFilterChange}></FilterBars>

            <div className={styles.grid}>
                {filteredData.length === 0 && <p>No matching content.</p>}
                {filteredData.map(item => (
                    <div key={item.id} className={styles.card}>
                        <h3>{item.title}</h3>
                        <p>{item.category}</p></div>
                ))}
            </div>
        </div>
    )
}