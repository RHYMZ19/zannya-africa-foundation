'use client'

import { useState } from "react"
import { db } from "../../../lib/firebase"
import { collection, addDoc } from "firebase/firestore"

export default function AdminNews(){

const [title,setTitle]=useState("")
const [description,setDescription]=useState("")
const [image,setImage]=useState("")
const [video,setVideo]=useState("")
const [source,setSource]=useState("website")
const [link,setLink]=useState("")

const submitNews = async(e)=>{
e.preventDefault()

await addDoc(collection(db,"news"),{
title,
description,
image,
video,
source,
link,
date:new Date()
})

alert("News Posted")

setTitle("")
setDescription("")
setImage("")
setVideo("")
setLink("")
}

return(

<div style={{padding:"40px"}}>

<h2>Post News</h2>

<form onSubmit={submitNews}>

<input
placeholder="Title"
value={title}
onChange={e=>setTitle(e.target.value)}
/>

<textarea
placeholder="Description"
value={description}
onChange={e=>setDescription(e.target.value)}
/>

<input
placeholder="Image URL"
value={image}
onChange={e=>setImage(e.target.value)}
/>

<input
placeholder="Video Embed URL"
value={video}
onChange={e=>setVideo(e.target.value)}
/>

<select
value={source}
onChange={e=>setSource(e.target.value)}
>

<option value="website">Website</option>
<option value="facebook">Facebook</option>
<option value="tiktok">TikTok</option>

</select>

<input
placeholder="Post Link"
value={link}
onChange={e=>setLink(e.target.value)}
/>

<button type="submit">
Publish
</button>

</form>

</div>

)

}