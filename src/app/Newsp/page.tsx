// app/Newsp/page.tsx
import StickyBar from "../StickyBar/StickyBar";
import GetInvolved from "../GetInvolved/GetInvolved";
import Gallery from "../Gallery/Gallery";
import IncreaseIma from "./components/IncreaseIma";
import ContactUs from "../ContactUs/page";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import { FaFacebook, FaHome, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from './Newsp.module.css';
import Image from "next/image";
import { fetchNews, NewsItem } from "./NewsList";
import NewsListClient from "./NewsListClient";  // import client component

export default async function NewspPage() {
  // Server-side fetch (SEO/AI can see this)
  const initialNews: NewsItem[] = await fetchNews();

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Sticky Navbar */}
      <StickyBar>
        <FaHome style={{ width: '25%', height: '25%' }} color="black" />
        <GetInvolved />
        <Gallery />
        <IncreaseIma src='/log.jpg' alt="log" />
      </StickyBar>

      {/* Header */}
      <div className={styles.container}>
        <header className={`header show`}>
          <h1 className={styles.h1}>NEWS AND UPDATES</h1>
          <p className={styles.p1}>Zannya Africa Foundation</p>
        </header>
      </div>

      {/* Banner Image */}
      <div className={styles.imageH}>
        <Image
          src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756827150/zannya/uploads/huanavmdp4e1fksdwde1.jpg"
          alt="image"
          style={{ width: '70%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Real-time news (hydrated in client) */}
      <NewsListClient initialNews={initialNews} />

      {/* Social Links */}
      <p style={{ textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center', paddingTop: '30px' }}>
        <strong>Follow us on social platforms:</strong>
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", fontSize: "30px", paddingTop: '10px' }}>
        <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}><FaFacebook /></a>
        <a href="https://instagram.com/zannya_africa_foundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}><FaInstagram /></a>
        <a href="https://tiktok.com/@zannyaafricafdn" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}><FaTiktok /></a>
        <a href="https://x.com/zannyaafrica" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}><FaXTwitter /> </a>
      </div>

      {/* Email Contacts */}
      <p style={{ textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center' }}><strong>Or email us:</strong></p>
      <div style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', gap: '30px' }}>
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