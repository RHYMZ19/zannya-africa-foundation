// src/app/Newsp/[id]/page.tsx
import NewsDetailsPageClient from "./NewsDetailsPageClient";

// Not async, since we don't fetch data here
export default function Page({ params }: { params: { id: string } }) {
  return <NewsDetailsPageClient id={params.id} />;
}