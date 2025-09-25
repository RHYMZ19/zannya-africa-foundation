// src/app/page.tsx
import { fetchNews, NewsItem } from "./Newsp/NewsList";
import HomeClient from "./HomeClient"; // Client component
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";
import { UpcomingEvent } from "./UpcomingEvents/types";

export default async function Home() {
  const news: NewsItem[] = await fetchNews();

  const snapshot = await getDocs(collection(db, "events"));
  const events: UpcomingEvent[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<UpcomingEvent, "id">),
  }));

  return <HomeClient news={news} events={events} />;
}