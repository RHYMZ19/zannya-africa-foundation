// app/Newsp/types.ts


export type NewsItem = {
  id: string;
  title: string;
  type: string;
  description: string;
  moreDetails?: string;
  images?: string[];
  video?: string;
  timestamp?: string | null; // only string (ISO) or null  // ISO string for SSR
};