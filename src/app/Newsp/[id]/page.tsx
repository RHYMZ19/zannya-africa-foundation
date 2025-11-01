import NewsDetailsPageClient from "./NewsDetailsPageClient";

export default async function Page({ params }: { params: { id: string } }) {
  return <NewsDetailsPageClient id={params.id} />;
}