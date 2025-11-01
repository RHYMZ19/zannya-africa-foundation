import NewsDetailsPageClient from "./NewsDetailsPageClient";

export default async function Page({ params }: { params: { id: string } }) {
  // Example server-side fetching (optional)
  // const data = await fetch(...);

  return <NewsDetailsPageClient id={params.id} />;
}