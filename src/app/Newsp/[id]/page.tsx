import NewsDetailsPageClient from "./NewsDetailsPageClient";

interface PageProps {
  params: { id: string };
  // searchParams?: { [key: string]: string | string[] | undefined }; // remove this
}

export default async function Page({ params }: PageProps) {
  return <NewsDetailsPageClient id={params.id} />;
}