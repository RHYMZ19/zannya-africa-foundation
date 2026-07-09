// app/resources/page.tsx
import { collection, getDocs, Timestamp } from "firebase/firestore";
import db from "../lib/firebase";
import ResourcessClient, { Resource } from "./ResourcessClient";

export default async function Resources() {
  // SSR fetch initial resources
  const snapshot = await getDocs(collection(db, "resources"));
  const initialResources: Resource[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      pdf: data.pdf,
      category: data.category,
      timestamp:
        data.timestamp instanceof Timestamp
          ? data.timestamp.toDate().toISOString()
          : new Date().toISOString(),
    };
  });

  return <ResourcessClient initialResources={initialResources} />;
}