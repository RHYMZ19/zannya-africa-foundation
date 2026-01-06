import { Product } from "./Product";

export interface Order {
  id?: string;
  userId: string;
  items: Product[];
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered";
  createdAt: number;
}