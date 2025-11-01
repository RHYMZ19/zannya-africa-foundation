// src/app/Newsp/[id]/page.tsx
import NewsDetailsPageClient from "./NewsDetailsPageClient";

interface PageProps {
  params: { id: string };
}

// This matches Next.js expected typing
export default function Page({ params }: PageProps) {
  return <NewsDetailsPageClient id={params.id} />;
}