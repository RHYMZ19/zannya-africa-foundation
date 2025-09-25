import { fetchNews, NewsItem } from "./Newsp/NewsList";
import HomeClient from "./HomeClient"; // Client component

// ✅ Metadata belongs here (not inside HomeClient.tsx)
export const metadata = {
  title: "Upcoming Events | My Website",
  description: "Stay updated with our latest upcoming events and countdowns.",
  openGraph: {
    title: "Upcoming Events",
    description: "Check out our upcoming events with live countdowns.",
    images: ["/seo-banner.png"],
  },
};

export default async function Home() {
  // Fetch news on the server
  const news: NewsItem[] = await fetchNews();

  return <HomeClient news={news} />;
}