'use client'

import { useEffect, useState } from "react"
import { db } from "../lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import styles from "./News.module.css"
import { onSnapshot } from "firebase/firestore";
import IncreaseImages from "@/app/components/IncreaseImages";

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  pdf: string;
};

type Post = {
  id: string
  title: string
  description: string
  image?: string
  link?: string
  source?: string
}

export default function NewsPage(){

const [posts,setPosts] = useState<Post[]>([])
const [filter,setFilter] = useState("all")
const [resources, setResources] = useState<Resource[]>([]);
const [selectedResourceCategory, setSelectedResourceCategory] = useState<string | null>(null);
const [open, setOpen] = useState(false);

useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "resources"), (snapshot) => {
        const items = snapshot.docs.map((doc) => {
          const data = doc.data();
    
          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            category: data.category,
            pdf: data.pdf,
          };
        });
    
        setResources(items);
      });
    
      return () => unsubscribe();
    }, []);

useEffect(()=>{
fetchPosts()
},[])

const fetchPosts = async ()=>{
const querySnapshot = await getDocs(collection(db,"news"))
const data: Post[] = querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...(doc.data() as Omit<Post,"id">)
}))
setPosts(data)
}

const filteredPosts =
filter==="all" ? posts : posts.filter(p=>p.source===filter)

const featured = filteredPosts[0]

return(

<div className={styles.container}>

{/* ================= NAVBAR ================= */}
            <nav className={styles.navbar}>
              <IncreaseImages src='/log.jpg' alt="Logo" />
              <div className={styles.logo}>Zannya Africa Foundation</div>
              
              <div
                className={`${styles.navLinks} ${
                  open ? styles.active : ""
                }`}
              >
                <a href="/">Home</a>
                
                {/* RESOURCES DROPDOWN */}
        <div className={styles.dropdown}>
          <span className={styles.dropdownTitle}>Resources ▾</span>
      
          <div className={styles.dropdownMenu}>
      
            <a href="/articles" className={styles.dropdownItem}>
              📰 Articles
            </a>
      
            <a
              href="#"
              className={styles.dropdownItem}
              onClick={() => setSelectedResourceCategory("Research Papers")}
            >
              📄 Research Papers
            </a>
      
            <a
              href="#"
              className={styles.dropdownItem}
              onClick={() => setSelectedResourceCategory("Reports")}
            >
              📊 Reports
            </a>
      
            <a
              href="#"
              className={styles.dropdownItem}
              onClick={() => setSelectedResourceCategory("Case Studies")}
            >
              📁 Case Studies
            </a>
      
          </div>
        </div>
                
                <a href="/Videos" >Gallery</a>
                <a href="/Donates" className={styles.btnPrimary}> Donate</a>
              </div>
      
              <div
                className={styles.hamburger}
                onClick={() => setOpen(!open)}
              >
                ☰
              </div>
            </nav>

            {/* ================= RESOURCE MODAL ================= */}
            {selectedResourceCategory && (

              <div className={styles.modalOverlay}
              onClick={() => setSelectedResourceCategory(null)}
              >
            
                <div className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
                >
            
                  <div className={styles.modalHeader}>
                    <h3>{selectedResourceCategory}</h3>
            
                    <button
                      className={styles.closeBtn}
                      onClick={() => setSelectedResourceCategory(null)}
                    >
                      ✕
                    </button>
                  </div>
            
                  <div className={styles.resourceList}>
            
                    {resources
                      .filter(res => res.category === selectedResourceCategory)
                      .map(res => (
            
                        <div key={res.id} className={styles.resourceItem}>
            
                          <div>
                            <strong>{res.title}</strong>
                            <p>{res.description}</p>
                          </div>
            
                          <a
                            href={res.pdf}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.downloadBtn}
                          >
                            Download PDF
                          </a>
            
                        </div>
            
                    ))}
            
                  </div>

                </div>
            
              </div>
            )}

{/* ================= HERO ================= */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>News & Updates</h1>
          <p>
           Stories, programs and community impact from Zannya Africa Foundation
          </p>
        </div>
      </section>


{/* FILTER BAR */}
<div className={styles.filters}>

<button className={filter==="all"?styles.active:""}
onClick={()=>setFilter("all")}>
All
</button>

<button className={filter==="website"?styles.active:""}
onClick={()=>setFilter("website")}>
Website
</button>

<button className={filter==="facebook"?styles.active:""}
onClick={()=>setFilter("facebook")}>
Facebook
</button>

<button className={filter==="tiktok"?styles.active:""}
onClick={()=>setFilter("tiktok")}>
TikTok
</button>

</div>


{/* FEATURED STORY */}
{featured && (

<div className={styles.featured}>

<img src={featured.image} />

<div className={styles.featuredContent}>

<span className={styles.category}>{featured.source}</span>

<h2>{featured.title}</h2>

<p>{featured.description}</p>

<a href={featured.link} target="_blank">
Read Full Story →
</a>

</div>

</div>

)}


{/* NEWS GRID */}
<div className={styles.grid}>

{filteredPosts.slice(1).map(post=>(

<div key={post.id} className={styles.card}>

<div className={styles.imageWrap}>

{post.image && (
<img src={post.image}/>
)}

<span className={styles.badge}>
{post.source}
</span>

</div>

<div className={styles.cardContent}>

<h3>{post.title}</h3>

<p>{post.description}</p>

<a href={post.link} target="_blank">
Read More →
</a>

</div>

</div>

))}

</div>

{/* ================= FOOTER ================= */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          
          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h4>Contact Us</h4>
            <div className={styles.contactLinks}>
              <a href="mailto:info@zannyaafricafoundation.org">info@zannyaafricafoundation.org</a>
            </div>
          </div>
      
          {/* Developer Credit */}
          <div className={styles.footerSection}>
            <h4>Developer</h4>
            <p>Developed by <strong>SSENABULYA RAHIM</strong></p>
            <p>Tel: <a href="tel:+256743878261">0743878261</a></p>
            <p>Email: <a href="mailto:rahimssenabulya82@gmail.com">rahimssenabulya82@gmail.com</a></p>
          </div>
      
          {/* Links */}
          <div className={styles.footerSection}>
            <h4>Links</h4>
            <a href="/Terms" className={styles.footerLink}>Privacy Policy & Legal Terms</a>
            <a href="/adminpannel" className={styles.adminLink}>Admin Panel</a>
          </div>
      
        </div>
      
        {/* Bottom Bar */}
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Zannya Africa Foundation. All Rights Reserved.</p>
        </div>
      </footer>

</div>

)
}

