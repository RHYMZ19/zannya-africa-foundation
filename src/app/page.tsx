import HomeClient from "./HomeClient";
import { fetchNews, NewsItem } from "./Newsp/NewsList";
import { fetchEvents, MyEvent } from "./lib/events"; // import from lib

export default async function Home() {
  const news: NewsItem[] = await fetchNews();
  const events: MyEvent[] = await fetchEvents();

  return <HomeClient news={news} events={events} />;
}