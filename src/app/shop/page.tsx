import dynamic from "next/dynamic";

const ShopClient = dynamic(
  () => import("../products/ShopClient"),
  { ssr: false }
);

export default function ShopPage() {
  return <ShopClient />;
}