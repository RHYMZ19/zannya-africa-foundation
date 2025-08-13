'use client';
import { useRouter } from "next/navigation";
import styles from './singlecar.module.css';
import CarCard from '../carcardcomp/CarCard';
import BlueStripInput from '../blue/BlueStripInput';
import { useState } from "react";
import FilterBars from "../FilterBars/FilterBars";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";


const cars = [
        {
            id: 1,
            model: 'Corolla',
            name: 'Toyota',
            price: '800',
            image: 'images/cars/toyota corolla.jpg',
        },

        {
            id: 2,
            model: 'Civic',
            name: 'Honda',
            price: '1800',
            image: 'images/cars/Honda Civic.jpg',
        },

        {
            id: 3,
            model: '3 Series',
            name: 'BMW',
            price: '29000',
            image: 'images/cars/BMW X5.jpg',
        },
        {
            id: 4,
            model: 'kawundel',
            name: 'AX5',
            price: '3000',
            image: 'images/cars/A.jpg',
        },
        {
            id: 5,
            model: 'Jip',
            name: 'BX5',
            price: '7000',
            image: 'images/cars/B.jpg',
        },
        {
            id: 6,
            model: 'lwmn',
            name: 'CX5',
            price: '7900',
            image: 'images/cars/C.jpg',
        },

        
    ]


export default function
MixedButtonsPage() {
    const router = useRouter();
    
    const [filtered, setFiltered] = useState(cars);

    const applyFilters = (filters: any) => {
        let result =cars;

        if (filters.name) {
            result = result.filter((car) =>
            car.name === filters.name);
        }

        if (filters.model) {
            result = result.filter((car) =>
            car.model === filters.model);
        }

        if (filters.price) {
            const [min, max] = 
            filters.price.split('').map(Number);
            result = result.filter((car) =>
            car.price >= min && car.price <= max);
        }
        setFiltered(result);
    }
    return (
        <div className={styles.container}>       
        <BlueStripInput></BlueStripInput>         
            <div className={styles.bucket}>
                <div className={styles.overlay}></div>
                <h1 className={styles.title}>FEATURED CARS</h1>
                <p className={styles.subtitle}>Find your dream car with us!</p>
            </div>

            <FilterBars onFilterChange={applyFilters}></FilterBars>
            <div className={styles.buckets}>
                
                
                <div className={styles.grid}>
                    
                    {filtered.map((car, index) => (
                        <CarCard key={index}
                        {...car} />
                        ))}
                        </div>
                        <div>
                <h2>Catagories
                <div style={{ display: 'flex', gap: '12px', }}>
                <button onClick={() =>
                    router.push('/login')
                }
                style={btnStyle}>Login</button>

                <button onClick={() =>
                    router.push('/userdashboard')
                }
                style={btnStyle}>User Dashboard</button>

                <button onClick={() =>
                    router.push('/ordercars')
                }
                style={btnStyle}>Order Cars</button>

                <button onClick={() =>
                    router.push('/wishlist')
                }
                style={btnStyle}>Add to wishlist</button>
                </div>
                </h2>
                <OptionalFeatures></OptionalFeatures>
            </div>
            
            
            </div>
            
            
                
            {/* Bottom section Holizontal buttons */}
            
            
            
        </div>
    );
}

const btnStyle = {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#222',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
}