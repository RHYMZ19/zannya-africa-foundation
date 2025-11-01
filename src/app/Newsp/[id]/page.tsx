import NewsDetailsPageClient from "./NewsDetailsPageClient";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  return <NewsDetailsPageClient id={params.id} />;
}