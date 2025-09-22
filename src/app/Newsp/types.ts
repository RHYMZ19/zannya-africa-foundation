// app/Newsp/types.ts
import { Timestamp } from "firebase/firestore";

export type NewsItem = {
  id: string;
  title: string;
  type: string;
  description: string;
  moreDetails?: string;
  images?: string[];
  video?: string;
  timestamp?: Timestamp | string;  // ISO string for SSR
};