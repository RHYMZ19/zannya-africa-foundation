'use client';

import { useRouter } from "next/navigation";
import { FaFacebook, FaHome, FaInstagram, FaTiktok } from "react-icons/fa";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import StickyBar from "../StickyBar/StickyBar";
import styles from './Successs.module.css';
import { useState, useEffect } from "react";
import ContactUs from "../ContactUs/page";
import db from "../lib/firebase";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import IncreaseIma from "./components/IncreaseIma";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

type SuccessStory = {
  id: string;
  title: string;
  description: string;
  images?: string[];
  video?: string;
  pdf?: string;
  timestamp?: Timestamp;
};

export default function Successs() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [SelectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  // Fetch success stories from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "successStories"), snapshot => {
      const items: SuccessStory[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<SuccessStory, 'id'>)
      }));
      setStories(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{overflow: 'hidden', background: 'linear-gradient(to right, #e0f7fa, #e1bee7)'}}>
      <div style={{justifyItems: 'center', gap: '1%'}}>
      <StickyBar>
        <Link href="/" style={{  color: 'black', cursor: 'pointer' }}>
          <FaHome style={{ width: '25px', height: '25px' }} />
          <span>Home</span>
        </Link>
        <FaHome style={{width: '25%', height: '25%'}} color="black" cursor='pointer' onClick={() => router.push('/')} >Home</FaHome>
        <GetInvolved />
        <Gallery />
        <button onClick={() => router.push('/Donates')} className={styles.arrowButton}>Donate</button>
        < IncreaseIma src='/log.jpg' alt="log" ></IncreaseIma>
      </StickyBar>
      </div>

      <div className={styles.container}>
        <header className={`header ${visible ? 'show' : ""}`}>
          <h1 className={styles.h1}>SUCCESS STORIES</h1>
          <p className={styles.p1}>Zannya Africa foundation</p>
        </header>
      </div>

      <div className={styles.imageH}>
              <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756827033/zannya/uploads/w041szk6iwvrrkio0dyj.jpg" alt="image" style={{ width: '70%', height: 'auto', display: 'block' }}></Image>
            </div>


      <div className={styles.ss}>
        <section className={styles.testimonialssection}>
          <h2>Testimonials & Success Stories</h2>

          {loading ? (
            <p>Loading stories...</p>
          ) : stories.length === 0 ? (
            <p>No success stories available.</p>
          ) : (
            stories.map(story => (
              <div key={story.id}>
                <div className={styles.testimonialcard}>
                  <p className={styles.quote}>{story.description}</p>
                  <p className={styles.author}>{story.title}</p>
                </div>

                {story.images?.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt={story.title}
                    style={{ width: '100%', margin: '10px 0', borderRadius: 8, cursor: 'pointer' }}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}

                {story.video && (
                  <video controls style={{ maxWidth: '100%', margin: '10px 0', borderRadius: 8 }}>
                    <source src={story.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                {story.pdf && (
                  <a href={story.pdf} className={styles.downloadbtn} target="_blank">
                    Download Full Story (PDF)
                  </a>
                )}

                <hr style={{ margin: '20px 0' }} />
              </div>
            ))
          )}

          <div className={styles.cta}>
            <p>Want to support more success stories like these?</p>
            <a href="/Donates" className={styles.donatebutton}>Donate Now</a>
          </div>
        </section>
      </div>

      <div className={styles.Y}>
              <h1 style={{fontWeight: 'bold', color: 'black'}}>Impact and Achievements</h1>
              <p className={styles.pp}>ZAF’s efforts have resulted in significant positive changes in the communities served. Some of the notable impacts include:</p>
              <p className={styles.p}>. 54 youth attained certificates in refereeing futsal, this was in collaboration with futsal association of Uganda and FUFA in
                         Kabowa High school Lubaga Division</p>
              <p className={styles.p}>. Increased awareness on HIV prevention, 90% increase in reproductive health knowledge among 1,000 youth in
                         Bwaise, Ndeeba, Kajjansi and rural outreaches in katakwi and Buyende .</p>
              <p className={styles.p}>. Reduction in youth crime rates through engagement in structured sports programs.Over 500 young people & women engaged in sports
                         programs across 10 communities in Bwaise, ndeeba , kajjansi and rural outreaches.</p>
              <p className={styles.p}>. Decrease in early childhood pregnancies and marriages by providing young women with alternatives and empowering them
                         through sports.</p>
              <p className={styles.p}>. Enhanced financial literacy (70% participants show improved financial management).</p>
              <p className={styles.p}>. Increased awareness on climate change and justice, leading to increased tree planting, reduced use of plastics and reduced
                         littering in communities.</p>
              <p className={styles.p}>. Increase in the number of young climate justice advocates of up to 100 community members through sports and environmental
                         awareness activities.</p>
              <p className={styles.p}>. Improved school attendance and reduced dropout rates as youths find motivation and support through ZAF’s programs.</p>
              <p className={styles.p}>. Increase in number of beneficiaries from 10 to 50 youth leaders in communities of operation.</p>
              <p className={styles.p}>. Enhanced community cohesion and reduced instances of domestic violence and drug abuse due to the positive influence of
                         sports and recreation.</p>
              <p className={styles.p}>. Increased awareness and better management of health issues, leading to healthier communities</p>
            </div>

      <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center',paddingTop: '30px'}}><strong>For more Success Stories like these you can follow us on our socialplatforms:</strong></p>
                                <div style={{ display: "flex",justifyContent: "center",  gap: "40px", fontSize: "30px",paddingTop: '10px'}}>
                                          <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                                            <FaFacebook />
                                          </a>
                                          <a href="https://instagram.com/zannya_africa_foundation" target="_blank" rel="noopener noreferrer" style={{ color: "pink" }}>
                                            <FaInstagram />
                                          </a>
                                          <a href="https://tiktok.com/@zannyaafricafdn" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                                            <FaTiktok />
                                          </a>
                                          <a href="https://x.com/zannyaafrica" target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
                                              <FaXTwitter />   
                                          </a>
                                          
                                        </div>
                                        <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center'}}><strong>Or you can email us for:</strong></p>
                                        <div style={{display: 'flex',paddingTop: '10px', flexDirection: 'row', justifyContent: 'center', gap: '30px'}}>
                                    <ul>
                                    <li><a href="mailto: info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
                                    <li><a href="mailto: support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
                                    </ul>
                                  </div>
      

      <ContactUs />
      <OptionalFeatures />

      {/* Enlarged image modal */}
      {SelectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={SelectedImage}
            alt="Enlarged"
            style={{ maxHeight: '90%', maxWidth: '90%', borderRadius: 10 }}
          />
        </div>
      )}
    </div>
  );
}