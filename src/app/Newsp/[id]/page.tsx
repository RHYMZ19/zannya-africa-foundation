import NewsDetailsPageClient from "./NewsDetailsPageClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <NewsDetailsPageClient id={id} />;
}