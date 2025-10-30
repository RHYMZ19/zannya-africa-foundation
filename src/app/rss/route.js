import { NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDj-BCOPLsczmTOqAM3RL_ipqlCcJ3ivdg",
  authDomain: "zannya-website.firebaseapp.com",
  projectId: "zannya-website",
  storageBucket: "zannya-website.appspot.com",
  messagingSenderId: "1081621983795",
  appId: "1:1081621983795:web:58d4f2ef9a789f13746946",
  measurementId: "G-9CV01FBRCK",
};

// Initialize Firebase only once
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper to wrap text safely for XML
const cd = (text) => `<![CDATA[${(text || "").replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;

export async function GET() {
  try {
    const q = query(collection(db, "newsUpdates"), orderBy("timestamp", "desc"));
    const snap = await getDocs(q);
    const posts = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("Fetched posts:", posts); // ✅ Debug line

    const items = posts.map((post) => {
      const images = Array.isArray(post.images)
        ? post.images.map((url) => `<media:content url="${url}" medium="image" />`).join("\n")
        : "";

      const video = post.video
        ? `<media:content url="${post.video}" medium="video" />`
        : "";

      const link = `https://www.zannyaafricafoundation.org/Newsp/${post.id}`;

      return `
        <item>
          <title>${cd(post.title)}</title>
          <link>${link}</link>
          <guid isPermaLink="false">${post.id}</guid>
          <description>${cd(post.description || "")}</description>
          <pubDate>${new Date(
            post.timestamp?.toDate?.() || post.timestamp || Date.now()
          ).toUTCString()}</pubDate>
          ${images}
          ${video}
        </item>
      `;
    }).join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
      <channel>
        <title>Zannya Africa Foundation News</title>
        <link>https://www.zannyaafricafoundation.org</link>
        <description>Latest updates from Zannya Africa Foundation</description>
        <language>en-us</language>
        ${items}
      </channel>
    </rss>`;

    return new NextResponse(rss, {
      status: 200,
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
  } catch (error) {
    console.error("RSS generation error:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}