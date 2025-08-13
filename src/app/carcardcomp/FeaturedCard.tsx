import styles from './FeaturedCard.module.css';

type FeaturedCardProps = {
    
    image: string;
};

export default function 
FeaturedCard({  image}:
    FeaturedCardProps
) {
    return (
        <div className={styles.card}>
            <img src={image} 
            width={10000}
            height={10000}
            className={styles.image} />
            
        </div>
    )
}