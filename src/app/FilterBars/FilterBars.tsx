'use client';

import { useState } from "react";
import styles from './FilterBars.module.css';

interface FilterBarsProps {
    onFilterChange: (filters: {supportive: string; sports: string; country: string}) => void;}


export default function 

FilterBars({onFilterChange}:FilterBarsProps) {
    const [filters, setFilters] = 
    useState({
        country: '',
        sports: '',
        supportive: ''
    })
    const handleChange = (e:
        React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const updated ={...filters, [name]: value};
        setFilters(updated);
        onFilterChange(updated)
    };

    return (
        <div className={styles.filterBar}>
            <select name="supportive"
            value={filters.supportive}
            onChange={handleChange}>
                <option value="">supportive</option>
                <option value="teaching">teaching</option>
                <option value="diseases">diseases</option>
                <option value="climate">climate</option>
                <option value="innovation">innovation</option>
                <option value="helping">helping</option>
            </select>

            <select name="sports"
            value={filters.sports}
            onChange={handleChange}>
                <option value="">sports</option>
                <option value="vollaytball">vollayball</option>
                <option value="netball">netball</option>
                <option value="football">football</option>
                <option value="basketball">basketball</option>
            </select>

            <select name="country"
            value={filters.country}
            onChange={handleChange}>
                <option value="">country</option>
                <option value="uganda">uganda</option>
                <option value="kenya">kenya</option>
                <option value="ghana">ghana</option>
                <option value="nigeria">nigeria</option>
            </select>
        </div>
    )
}