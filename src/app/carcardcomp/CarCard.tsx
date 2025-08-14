'use client';
import styles from './CarCard.module.css';

type CarCardProps = {
    name: string;
    price: string;
    image: string;
    model: string;
};

export default function 
CarCard({ name, price, image, model}:
    CarCardProps
) {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} 
            width={1000}
            height={1000}
            className={styles.image} />
            <h3>{name}</h3>
            <p>{model}</p>
            <p>${price}</p>
            <button className={styles.button}>Buy Now</button>
        </div>
    )
}