// src/app/Newsp/[id]/page.tsx
import NewsDetailsPageClient from "./NewsDetailsPageClient";

// No explicit PageProps import
export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <NewsDetailsPageClient id={params.id} />;
}