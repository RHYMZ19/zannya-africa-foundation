import NewsDetailsPageClient from "./NewsDetailsPageClient";

interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  return <NewsDetailsPageClient id={params.id} />;
}