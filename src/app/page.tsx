// src/app/page.tsx
import HomeClient from "./HomeClient";
import { fetchNews, NewsItem } from "./Newsp/NewsList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";

export type MyEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
};

export async function fetchEvents(): Promise<MyEvent[]> {
  const snapshot = await getDocs(collection(db, "events"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as MyEvent[];
}

export default async function Home() {
  const news: NewsItem[] = await fetchNews();
  const events: MyEvent[] = await fetchEvents();

  return <HomeClient news={news} events={events} />;
}