import NewsDetailsPageClient from "./NewsDetailsPageClient";

export default async function Page({
  params,
  
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // We are not using searchParams, so ignore it
  return <NewsDetailsPageClient id={params.id} />;
}