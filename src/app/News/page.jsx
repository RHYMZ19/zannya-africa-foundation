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

return(

<div className={styles.container}>

<div className={styles.hero}>
<h1>News & Updates</h1>
<p>Latest updates from our website and social media</p>
</div>

<div className={styles.filters}>
<button onClick={()=>setFilter("all")}>All</button>
<button onClick={()=>setFilter("website")}>Website</button>
<button onClick={()=>setFilter("facebook")}>Facebook</button>
<button onClick={()=>setFilter("tiktok")}>TikTok</button>
</div>

<div className={styles.grid}>

{filteredPosts.map(post=>(

<div key={post.id} className={styles.card}>

{post.image && (
<img src={post.image} className={styles.image}/>
)}

{post.video && (
<iframe
src={post.video}
className={styles.video}
allowFullScreen
/>
)}

<h3>{post.title}</h3>

<p>{post.description}</p>

<div className={styles.meta}>
<span>{post.source}</span>
</div>

<a href={post.link} target="_blank" rel="noopener noreferrer">
Read More
</a>

</div>

))}

</div>

</div>

)

}