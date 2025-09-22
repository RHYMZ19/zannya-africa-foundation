// src/app/page.tsx
import { fetchNews, NewsItem } from "./Newsp/NewsList";
import HomeClient from "./HomeClient"; // Client component

export default async function Home() {
  // Fetch news on the server
  const news: NewsItem[] = await fetchNews();

  return <HomeClient news={news} />;
}