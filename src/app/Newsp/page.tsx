// app/Newsp/page.tsx
import { fetchNews, NewsItem } from "./NewsList";
import NewsItemClient from "./NewsItemClient";
import StickyBar from "../StickyBar/StickyBar";
import GetInvolved from "../GetInvolved/GetInvolved";
import Gallery from "../Gallery/Gallery";
import IncreaseIma from "./components/IncreaseIma";
import ContactUs from "../ContactUs/page";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import styles from './Newsp.module.css';
import { FaFacebook, FaHome, FaInstagram, FaTiktok } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export default async function NewspPage() {
  const news: NewsItem[] = await fetchNews(); // SSR fetch

  return (
    <div style={{ overflow: 'hidden' }}>
      <StickyBar>
        <FaHome style={{ width: '25%', height: '25%' }} color="black" />
        <GetInvolved />
        <Gallery />
        <Link href="/Donates" className={styles.arrowButton}>
          Donate
        </Link>
        <IncreaseIma src='/log.jpg' alt="log" />
      </StickyBar>

      <div className={styles.container}>
        <header className={`header show`}>
          <h1 className={styles.h1}>NEWS AND UPDATES</h1>
          <p className={styles.p1}>Zannya Africa Foundation</p>
        </header>
      </div>

      <div className={styles.imageH}>
        <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756827150/zannya/uploads/huanavmdp4e1fksdwde1.jpg" alt="image" style={{ width: '70%', height: 'auto', display: 'block' }} />
      </div>

      <div className={styles.newslistcontainer}>
        {news.length === 0 ? (
          <p className={styles.nonews}>No news available.</p>
        ) : news.map(item => (
          <NewsItemClient key={item.id} newsItem={item} />
        ))}
      </div>

      <div className={styles.latestnews}>
  <h2>Latest News</h2>
  <div className={styles.newslist}>
    {news.slice(0, 5).map(item => (
      <div key={item.id} className={styles.newsitem}>
        {item.type && (
          <span className={`${styles.newstype} ${item.type.toLowerCase()}`}>
            {item.type}
          </span>
        )}
        <h3 className={styles.newstitle}>{item.title}</h3>
        <p className={styles.newsdescription}>{item.description}</p>
        {item.timestamp && (
          <small className={styles.newstimestamp}>
            {new Date(item.timestamp).toLocaleDateString('en-UG', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </small>
        )}
      </div>
    ))}
  </div>
</div>

      {/* Social links */}
      <p style={{ textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center', paddingTop: '30px' }}>
        <strong>For more News and updates you can follow us on our social platforms:</strong>
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", fontSize: "30px", paddingTop: '10px' }}>
        <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}><FaFacebook /></a>
        <a href="https://instagram.com/zannya_africa_foundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}><FaInstagram /></a>
        <a href="https://tiktok.com/@zannyaafricafdn" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}><FaTiktok /></a>
        <a href="https://x.com/zannyaafrica" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}><FaXTwitter /> </a>
      </div>

      <p style={{ textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center' }}><strong>Or you can email us for:</strong></p>
      <div style={{ display: 'flex', paddingTop: '10px', flexDirection: 'row', justifyContent: 'center', gap: '30px' }}>
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