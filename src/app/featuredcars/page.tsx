'use client';
import { useRouter } from "next/navigation";
import FeaturedCar from "../carcardcomp/CarCard";
import styles from './featuredcars.module.css';
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";

export default function
MixedButtonsPage() {
    const router = useRouter();
    const cars = [
        {
            id: 1,
            description: 'Mercedes-Benz (German pronunciation: [mɛʁˌtseːdəs ˈbɛnts, -dɛs -] ⓘ),[6][7] commonly referred to simply as Mercedes and occasionally as Benz, is a German automotive brand that was founded in 1926. Mercedes-Benz AG (a subsidiary of the Mercedes-Benz Group, established in 2019) is based in Stuttgart, Baden-Württemberg, Germany.[1] Mercedes-Benz AG manufactures luxury vehicles and light commercial vehicles, all branded under the Mercedes-Benz name. From November 2019 onwards, the production of Mercedes-Benz-branded heavy commercial vehicles (trucks and buses) has been managed by Daimler Truck, which separated from the Mercedes-Benz Group to form an independent entity at the end of 2021.',
            image: 'images/cars/toyota corolla.jpg',
        },
        {
            id: 2,
            description: 'Mercedes-Benz (German pronunciation: [mɛʁˌtseːdəs ˈbɛnts, -dɛs -] ⓘ),[6][7] commonly referred to simply as Mercedes and occasionally as Benz, is a German automotive brand that was founded in 1926. Mercedes-Benz AG (a subsidiary of the Mercedes-Benz Group, established in 2019) is based in Stuttgart, Baden-Württemberg, Germany.[1] Mercedes-Benz AG manufactures luxury vehicles and light commercial vehicles, all branded under the Mercedes-Benz name. From November 2019 onwards, the production of Mercedes-Benz-branded heavy commercial vehicles (trucks and buses) has been managed by Daimler Truck, which separated from the Mercedes-Benz Group to form an independent entity at the end of 2021.',
            image: 'images/cars/Honda Civic.jpg',
        },

        {
            id: 3,
            description: 'Mercedes-Benz (German pronunciation: [mɛʁˌtseːdəs ˈbɛnts, -dɛs -] ⓘ),[6][7] commonly referred to simply as Mercedes and occasionally as Benz, is a German automotive brand that was founded in 1926. Mercedes-Benz AG (a subsidiary of the Mercedes-Benz Group, established in 2019) is based in Stuttgart, Baden-Württemberg, Germany.[1] Mercedes-Benz AG manufactures luxury vehicles and light commercial vehicles, all branded under the Mercedes-Benz name. From November 2019 onwards, the production of Mercedes-Benz-branded heavy commercial vehicles (trucks and buses) has been managed by Daimler Truck, which separated from the Mercedes-Benz Group to form an independent entity at the end of 2021.',
            image: 'images/cars/BMW X5.jpg',
        },
        {
            id: 4,
            description: 'Mercedes-Benz (German pronunciation: [mɛʁˌtseːdəs ˈbɛnts, -dɛs -] ⓘ),[6][7] commonly referred to simply as Mercedes and occasionally as Benz, is a German automotive brand that was founded in 1926. Mercedes-Benz AG (a subsidiary of the Mercedes-Benz Group, established in 2019) is based in Stuttgart, Baden-Württemberg, Germany.[1] Mercedes-Benz AG manufactures luxury vehicles and light commercial vehicles, all branded under the Mercedes-Benz name. From November 2019 onwards, the production of Mercedes-Benz-branded heavy commercial vehicles (trucks and buses) has been managed by Daimler Truck, which separated from the Mercedes-Benz Group to form an independent entity at the end of 2021.',
            image: 'images/cars/A.jpg',
        },
        {
            id: 5,
            description: 'Mercedes-Benz (German pronunciation: [mɛʁˌtseːdəs ˈbɛnts, -dɛs -] ⓘ),[6][7] commonly referred to simply as Mercedes and occasionally as Benz, is a German automotive brand that was founded in 1926. Mercedes-Benz AG (a subsidiary of the Mercedes-Benz Group, established in 2019) is based in Stuttgart, Baden-Württemberg, Germany.[1] Mercedes-Benz AG manufactures luxury vehicles and light commercial vehicles, all branded under the Mercedes-Benz name. From November 2019 onwards, the production of Mercedes-Benz-branded heavy commercial vehicles (trucks and buses) has been managed by Daimler Truck, which separated from the Mercedes-Benz Group to form an independent entity at the end of 2021.',
            image: 'images/cars/B.jpg',
        },
        {
            id: 6,
            image: 'images/cars/C.jpg',
            description: 'Mercedes-Benz (German pronunciation: [mɛʁˌtseːdəs ˈbɛnts, -dɛs -] ⓘ),[6][7] commonly referred to simply as Mercedes and occasionally as Benz, is a German automotive brand that was founded in 1926. Mercedes-Benz AG (a subsidiary of the Mercedes-Benz Group, established in 2019) is based in Stuttgart, Baden-Württemberg, Germany.[1] Mercedes-Benz AG manufactures luxury vehicles and light commercial vehicles, all branded under the Mercedes-Benz name. From November 2019 onwards, the production of Mercedes-Benz-branded heavy commercial vehicles (trucks and buses) has been managed by Daimler Truck, which separated from the Mercedes-Benz Group to form an independent entity at the end of 2021.',
        },
        {
            id: 7,
            description: 'Mercedes-Benz (German pronunciation: [mɛʁˌtseːdəs ˈbɛnts, -dɛs -] ⓘ),[6][7] commonly referred to simply as Mercedes and occasionally as Benz, is a German automotive brand that was founded in 1926. Mercedes-Benz AG (a subsidiary of the Mercedes-Benz Group, established in 2019) is based in Stuttgart, Baden-Württemberg, Germany.[1] Mercedes-Benz AG manufactures luxury vehicles and light commercial vehicles, all branded under the Mercedes-Benz name. From November 2019 onwards, the production of Mercedes-Benz-branded heavy commercial vehicles (trucks and buses) has been managed by Daimler Truck, which separated from the Mercedes-Benz Group to form an independent entity at the end of 2021.',
            image: 'images/cars/car5.jpg',
        },
        {
            id: 8,
            description: 'Mercedes-Benz (German pronunciation: [mɛʁˌtseːdəs ˈbɛnts, -dɛs -] ⓘ),[6][7] commonly referred to simply as Mercedes and occasionally as Benz, is a German automotive brand that was founded in 1926. Mercedes-Benz AG (a subsidiary of the Mercedes-Benz Group, established in 2019) is based in Stuttgart, Baden-Württemberg, Germany.[1] Mercedes-Benz AG manufactures luxury vehicles and light commercial vehicles, all branded under the Mercedes-Benz name. From November 2019 onwards, the production of Mercedes-Benz-branded heavy commercial vehicles (trucks and buses) has been managed by Daimler Truck, which separated from the Mercedes-Benz Group to form an independent entity at the end of 2021.',
            image: 'images/cars/car6.jpg',
        },
        {
            id: 9,
            description: 'Mercedes-Benz (German pronunciation: [mɛʁˌtseːdəs ˈbɛnts, -dɛs -] ⓘ),[6][7] commonly referred to simply as Mercedes and occasionally as Benz, is a German automotive brand that was founded in 1926. Mercedes-Benz AG (a subsidiary of the Mercedes-Benz Group, established in 2019) is based in Stuttgart, Baden-Württemberg, Germany.[1] Mercedes-Benz AG manufactures luxury vehicles and light commercial vehicles, all branded under the Mercedes-Benz name. From November 2019 onwards, the production of Mercedes-Benz-branded heavy commercial vehicles (trucks and buses) has been managed by Daimler Truck, which separated from the Mercedes-Benz Group to form an independent entity at the end of 2021.',
            image: 'images/cars/car10.jpg',
        },


        
    ]

    return (
        <div className={styles.container}>
            <div className={styles.bucket}>
                <div className={styles.overlay}></div>
                <h1 className={styles.title}>FEATURED CARS</h1>
                <p className={styles.subtitle}>Find your dream car with us!</p>
            </div>

            <div className={styles.buckets}>
                <ul style={{ listStyle: "none", padding: 0}}>
                    {cars.map((car, index) => (
                        <li
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            marginBottom: "12px",
                            paddingBottom: "8px",
                            borderBottom: "1px solid #ccc"
                        }}>
                            <img 
                            src={car.image}
                            style={{width: '600px',
                                height: 'auto',
                                borderRadius: '8px'
                            }}></img>
                            <strong>
                                {car.description}
                            </strong>
                        </li>
                    ))}
                </ul>
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
                {/* top section - vertical buttons */}
            <div style={{ marginBottom: '40px', padding: '12px 24px',}}>
                <h2></h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <button onClick={() => 
                        router.push('/adminpannel')
                    }
                    style={btnStyle}>admin</button>
                </div>
            </div>
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