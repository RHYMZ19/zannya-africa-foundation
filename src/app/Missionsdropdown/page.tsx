import { Suspense } from "react";
import MissionsClient from "./MissionsClient";

export const metadata = {
  title: 'Missions - Zannya Africa Foundation (ZAF)',
  description: 'Learn about Zannya Africa Foundation (ZAF), our mission, vision, core values, leaders, and community impact in Uganda.',
  keywords: 'Zannya Africa Foundation, ZAF, Uganda NGO, community development, sports, empowerment, social impact',
  openGraph: {
    title: 'Missions - Zannya Africa Foundation',
    description: 'Discover our mission, vision, and leaders driving community empowerment through sports in Uganda.',
    url: 'https://www.zannyaafrica.org/Missions',
    siteName: 'Zannya Africa Foundation',
    images: [
      {
        url: 'https://www.zannyaafrica.org/logo.jpg',
        width: 800,
        height: 600,
        alt: 'ZAF Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Missions - Zannya Africa Foundation',
    description: 'Learn how ZAF empowers communities in Uganda through sports and social initiatives.',
    images: ['https://www.zannyaafrica.org/logo.jpg'],
  },
};

export default function MissionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MissionsClient />
    </Suspense>
  );
}