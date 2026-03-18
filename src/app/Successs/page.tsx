'use client';

import { useEffect, useState } from "react";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import db from "../lib/firebase";
import styles from "./SuccessNew.module.css";
import Image from "next/image";

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
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "successStories"), snapshot => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<SuccessStory, "id">)
      }));
      setStories(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <Image
          src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756827033/zannya/uploads/w041szk6iwvrrkio0dyj.jpg"
          alt="hero"
          fill
          className={styles.heroImg}
        />
        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <h1>Success Stories</h1>
          <p>Real impact. Real people. Real change.</p>
          <button onClick={() => router.push("/Donates")}>
            Support the Mission
          </button>
        </div>
      </section>

      {/* STORIES */}
      <section className={styles.container}>
        <h2 className={styles.sectionTitle}>Stories That Inspire</h2>

        {loading ? (
          <p className={styles.center}>Loading...</p>
        ) : (
          <div className={styles.grid}>
            {stories.map(story => (
              <div key={story.id} className={styles.card}>

                <div className={styles.cardContent}>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                </div>

                {/* Images */}
                {story.images && (
                  <div className={styles.imageGrid}>
                    {story.images.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt=""
                        width={300}
                        height={200}
                        className={styles.storyImg}
                        onClick={() => setSelectedImage(img)}
                      />
                    ))}
                  </div>
                )}

                {/* Video */}
                {story.video && (
                  <video controls className={styles.video}>
                    <source src={story.video} />
                  </video>
                )}

                {/* PDF */}
                {story.pdf && (
                  <a href={story.pdf} target="_blank" className={styles.pdfBtn}>
                    Read Full Story
                  </a>
                )}

              </div>
            ))}
          </div>
        )}
      </section>

      {/* IMPACT SECTION */}
      <section className={styles.impact}>
        <h2>Our Impact</h2>

        <div className={styles.impactGrid}>
          <div className={styles.impactCard}>
            <h3>500+</h3>
            <p>Youth engaged in programs</p>
          </div>

          <div className={styles.impactCard}>
            <h3>90%</h3>
            <p>Health awareness increase</p>
          </div>

          <div className={styles.impactCard}>
            <h3>100+</h3>
            <p>Climate advocates trained</p>
          </div>

          <div className={styles.impactCard}>
            <h3>50+</h3>
            <p>Youth leaders developed</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Be Part of the Change</h2>
        <p>Your support transforms lives.</p>
        <button onClick={() => router.push("/Donates")}>
          Donate Now
        </button>
      </section>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
          <Image src={selectedImage} alt="" width={800} height={600} />
        </div>
      )}
    </div>
  );
}