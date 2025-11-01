import NewsDetailsPageClient from "./NewsDetailsPageClient";
import { PageProps } from "next";

export default async function Page(props: PageProps) {
  const params = await props.params; // ✅ Await the promised params
  return <NewsDetailsPageClient id={params.id} />;
}