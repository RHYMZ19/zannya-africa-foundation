// src/apps/Resourcess/page.tsx
import { FaFacebook, FaHome, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Head from "next/head";
import StickyBar from "../StickyBar/StickyBar";
import GetInvolved from "../GetInvolved/GetInvolved";
import Gallery from "../Gallery/Gallery";
import IncreaseIma from "./components/IncreaseIma";
import ContactUs from "../ContactUs/page";
import OptionalFeatures from "../OptionalFeatures/OptionalFeatures";
import ResourcesList from "./ResourcesList";
import styles from "./Resourcess.module.css";
import { useRouter } from "next/navigation";
import db from "../lib/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";

type Resource = {
  id: string;
  title: string;
  description: string;
  pdf: string;
  category: string;
  timestamp?: Timestamp;
};

export default function Resourcess({ resources }: { resources: Resource[] }) {
  const router = useRouter();

  return (
    <main style={{ overflow: "hidden" }}>
      <Head>
        <title>Resources & Publications | Zannya Africa Foundation</title>
        <meta
          name="description"
          content="Access research papers, reports, and case studies empowering communities in Uganda."
        />
        <meta
          name="keywords"
          content="Zannya Africa Foundation, research papers, reports, case studies, youth empowerment, Uganda"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Resources & Publications | Zannya Africa Foundation" />
        <meta
          property="og:description"
          content="Access research papers, reports, and case studies empowering communities in Uganda."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756829071/zannya/uploads/kngkholnlp6wvmzq4pa8.jpg"
        />
        <meta property="og:url" content="https://www.zannyaafricafoundation.org/resources" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resources & Publications | Zannya Africa Foundation" />
        <meta
          name="twitter:description"
          content="Access research papers, reports, and case studies empowering communities in Uganda."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756829071/zannya/uploads/kngkholnlp6wvmzq4pa8.jpg"
        />
      </Head>

      {/* Sticky Bar */}
      <StickyBar>
        <FaHome
          style={{ width: "25%", height: "25%" }}
          color="black"
          cursor="pointer"
          onClick={() => router.push("/")}
        />
        <GetInvolved />
        <Gallery />
        <button
          onClick={() => router.push("/Donates")}
          className={styles.arrowButton}
        >
          Donate
        </button>
        <IncreaseIma src="/log.jpg" alt="Zannya Africa Foundation Logo" />
      </StickyBar>

      {/* Header */}
      <section className={styles.container}>
        <header className="header show">
          <h1 className={styles.h1}>RESOURCES AND PUBLICATIONS</h1>
          <p className={styles.p1}>Zannya Africa Foundation</p>
        </header>
      </section>

      {/* Banner Image */}
      <section className={styles.imageH}>
        <Image
          src="https://res.cloudinary.com/dpwuym7xg/image/upload/v1756829071/zannya/uploads/kngkholnlp6wvmzq4pa8.jpg"
          alt="Resources banner"
          style={{ width: "70%", height: "auto", display: "block" }}
          width={800}
          height={600}
        />
      </section>

      {/* Intro */}
      <section style={{ padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "40px", color: "red", fontWeight: "bold" }}>
          Resources & Publications
        </h1>
        <p>
          Zannya Africa Foundation provides research papers, reports, and case studies to empower
          communities and support sustainable development initiatives.
        </p>
      </section>

      {/* Resources List */}
      <ResourcesList initialResources={resources} />

      {/* Social Links */}
      <section style={{ textAlign: "center", paddingTop: "2rem" }}>
        <p><strong>Follow us on:</strong></p>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", fontSize: "30px" }}>
          <a href="https://facebook.com/zannyaafricafoundation" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://instagram.com/zannya_africa_foundation" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://tiktok.com/@zannyaafricafdn" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </a>
          <a href="https://x.com/zannyaafrica" target="_blank" rel="noopener noreferrer">
            <FaXTwitter />
          </a>
        </div>

        <p style={{ marginTop: "1rem" }}><strong>Or email us:</strong></p>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", paddingTop: "10px" }}>
          <ul>
            <li><a href="mailto:info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a></li>
            <li><a href="mailto:support@zannyaafricafoundation.org">support@zannyaafricafoundation.org</a></li>
          </ul>
        </div>
      </section>

      {/* Contact & Optional Features */}
      <ContactUs />
      <OptionalFeatures />
    </main>
  );
}

// ------------------------------------
// Server-side fetching for AI/SEO
// ------------------------------------
export async function getServerSideProps() {
  const snapshot = await getDocs(collection(db, "resources"));
  const resources: Resource[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Resource, "id">),
  }));

  return { props: { resources } };
}