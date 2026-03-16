'use client'

import { useEffect, useState } from "react"
import { db } from "../lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import styles from "./News.module.css"

export default function NewsPage(){

const [posts,setPosts] = useState([])
const [filter,setFilter] = useState("all")

useEffect(()=>{
fetchPosts()
},[])

const fetchPosts = async ()=>{
const querySnapshot = await getDocs(collection(db,"news"))
const data = querySnapshot.docs.map(doc=>({
id:doc.id,
...doc.data()
}))
setPosts(data)
}

const filteredPosts =
filter==="all" ? posts : posts.filter(p=>p.source===filter)

const featured = filteredPosts[0]

return(

<div className={styles.container}>

{/* HERO */}
<div className={styles.hero}>
<div className={styles.heroOverlay}>
<h1>News & Updates</h1>
<p>Stories, programs and community impact from Zannya Africa Foundation</p>
</div>
</div>


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

</div>

)
}