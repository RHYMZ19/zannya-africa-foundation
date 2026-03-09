'use client';

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

import styles from "./Programs.module.css";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import db from "../lib/firebase";

import StickyBar from "../StickyBar/StickyBar";
import Gallery from "../Gallery/Gallery";
import GetInvolved from "../GetInvolved/GetInvolved";
import ContactUs from "../ContactUs/page";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";

import { FaHome, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface Subcategory {
  name: string;
  description?: string;
}

interface Program {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategories?: Subcategory[];
  images?: string[];
}

const categories = [
  "Skilling and Livelihood",
  "Reproductive & Physical Health Awareness",
  "Climate Justice Advocacy"
];

export default function Programs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 900 });
  }, []);

  // Set category from search params (client-side)
  useEffect(() => {
    if (!searchParams) return;
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Fetch programs from Firebase
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const q = query(collection(db, "filters"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const data: Program[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Program, "id">)
        }));

        const filtered = selectedCategory
          ? data.filter(p => p.category === selectedCategory)
          : data;

        setPrograms(filtered);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, [selectedCategory]);

  return (
    <div className={styles.page}>
      {/* NAVBAR */}
      <StickyBar>
        <FaHome
          className={styles.homeIcon}
          onClick={() => router.push("/")}
        />
        <GetInvolved />
        <Gallery />
        <button
          onClick={() => router.push("/Donates")}
          className={styles.donateBtn}
        >
          Donate
        </button>
      </StickyBar>

      {/* HERO */}
      <div className={styles.hero}>
        <h1>Our Programs</h1>
        <p>
          Empowering communities through sports, health awareness, climate advocacy and youth development.
        </p>
      </div>

      {/* CATEGORY BUTTONS */}
      <div className={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${styles.categoryBtn} ${
              selectedCategory === cat ? styles.active : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PROGRAM GRID */}
      <div className={styles.programGrid}>
        {programs.map(program => (
          <div
            key={program.id}
            className={styles.card}
            data-aos="fade-up"
          >
            {program.images && program.images[0] && (
              <Image
                src={program.images[0]}
                alt="program"
                width={400}
                height={250}
                className={styles.cardImage}
              />
            )}

            <div className={styles.cardContent}>
              <h2>{program.name}</h2>
              <p>{program.description}</p>
              {program.subcategories && (
                <ul>
                  {program.subcategories.map((s, i) => (
                    <li key={i}>
                      <strong>{s.name}</strong> – {s.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SOCIAL */}
      <div className={styles.social}>
        <h3>Follow Our Programs</h3>
        <div className={styles.socialIcons}>
          <a href="https://facebook.com/zannyaafricafoundation"><FaFacebook /></a>
          <a href="https://instagram.com/zannya_africa_foundation"><FaInstagram /></a>
          <a href="https://tiktok.com/@zannyaafricafdn"><FaTiktok /></a>
          <a href="https://x.com/zannyaafrica"><FaXTwitter /></a>
        </div>
      </div>

      <ContactUs />
      
    </div>
  );
}