'use client';

import { useRouter } from "next/navigation";
import { FaFacebook, FaHome, FaInstagram, FaTiktok } from "react-icons/fa";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import StickyBar from "../StickyBar/StickyBar";
import styles from './Newsp.module.css';
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import ContactUs from "../ContactUs/page";
import { addDoc, collection, onSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";
import db from "../lib/firebase";
import IncreaseIma from "./components/IncreaseIma";
import Image from "next/image";
import CommentList from "./CommentList";
import LikeButton from "./LikeButton";
import { getGuestId, getGuestName } from "./getGuestId";
import ShareButton from "./ShareButton";
import { FaXTwitter } from "react-icons/fa6";

type NewsItem = {
  id: string;
  title: string;
  type: string;
  description: string;
  images?: string[]; // array of image URLs
  video?: string;
  timestamp?: Timestamp;
}

export default function Newsp() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [SelectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
      anchorPlacement: 'top-bottom'
    });
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "newsUpdates"), (snapshot) => {
      const items: NewsItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<NewsItem, "id">),
      }));

      // ✅ Sort newest first
  items.sort((a, b) => {
    const aTime = a.timestamp ? a.timestamp.toMillis() : 0;
    const bTime = b.timestamp ? b.timestamp.toMillis() : 0;
    return bTime - aTime;
  });

      setNews(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{overflow: 'hidden'}}>
      <div style={{justifyItems: 'center', gap: '1%'}}>
        <StickyBar>
          <FaHome style={{width: '25%', height: '25%'}} color="black" cursor='pointer' onClick={() => router.push('/')} >
            Home
          </FaHome>
          <GetInvolved />
          <Gallery />
          <button onClick={() => router.push('/Donates')} className={styles.arrowButton}>Donate</button>
          < IncreaseIma src='/log.jpg' alt="log" ></IncreaseIma>
        </StickyBar>
      </div>

      <div className={styles.container}>
        <header className={`header ${visible ? 'show' : ""}`}>
          <h1 className={styles.h1}>NEWS AND UPDATES</h1>
          <p className={styles.p1}>Zannya Africa Foundation</p>
        </header>
      </div>

      <div className={styles.imageH}>
        <Image src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756827150/zannya/uploads/huanavmdp4e1fksdwde1.jpg" alt="image" style={{ width: '70%', height: 'auto', display: 'block' }}></Image>
      </div>

      <div style={{ height: '0px', width: '100%', justifyItems: 'center', backgroundColor: '#1e3c72' }}>
        <h1 style={{ fontSize: '50px', color: 'white', marginBottom: '0px', marginTop: '20px' }}>What we offer</h1>
      </div>

      <div className={styles.newslistcontainer}>
        {loading ? (
          <p>Loading...</p>
        ) : news.length === 0 ? (
          <p className={styles.nonews}>No news available.</p>
        ) : (
          news.map(({ id, title, type, description, images, video, timestamp }) => (
            <div key={id} className={styles.newscard}>
              {/* Display all images uploaded via Cloudinary */}
              {images?.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={title}
                  className={styles.newsimage}
                  onClick={() => setSelectedImage(img)}
                  style={{ cursor: 'pointer' }}
                />
              ))}

              <div className={styles.newscontent}>
                <span className={styles.newstype}>{type}</span>
                <h3 className={styles.newstitle}>{title}</h3>
                <p className={styles.newsdescription}>{description}</p>

                {video && (
                  <video controls className={styles.newsvideo}>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                {timestamp && (
                  <small className={styles.newsdate}>
                    {timestamp.toDate().toLocaleDateString()}
                  </small>
                )}
              </div>
              {/* Like, Share & Comment Section */}
<div className={styles.actions}>
  {/* Like Button */}
  <LikeButton newsId={id} />

  {/* Share Buttons */}
  <div className={styles.share}>
  <ShareButton title={title} url={window.location.href} />
</div>

  {/* Comment Form */}
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const input = form.elements.namedItem("comment") as HTMLInputElement;
      if (!input.value.trim()) return;

      await addDoc(collection(db, "newsUpdates", id, "comments"), {
  text: input.value,
  userId: getGuestId(),
  userName: getGuestName(),
  timestamp: serverTimestamp(),
});

      input.value = "";
    }}
  >
    <input type="text" name="comment" placeholder="Write a comment..." />
    <button type="submit">Post</button>
  </form>

  {/* Display Comments */}
  <div className={styles.comments}>
    <CommentList newsId={id} />
  </div>
</div>
            </div>
          ))
        )}
      </div>
      <p style={{textDecoration: 'underline', color: 'rgb(235, 125, 125)', textAlign: 'center',paddingTop: '30px'}}><strong>For more News and updates you can follow us on our socialplatforms:</strong></p>
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
                                    <a href="https://x.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer" style={{ color: "green" }}>
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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
            style={{ maxHeight: '90%', maxWidth: '90%', borderRadius: '10px' }}
          />
        </div>
      )}
    </div>
  )
}