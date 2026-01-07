// components/ShopClient.tsx
"use client";

import { useState } from "react";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import SearchBar from "./components/SearchBar";
import Cart from "./components/Cart";
import AdminUpload from "./components/AdminUpload";
import { CartProvider } from "./context/CartContext";
import { Product } from "./types/Product";
import AdminOrders from "./components/AdminOrders";



const ShopClient: React.FC = () => {
  const [selected, setSelected] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  return (
    <CartProvider>
      <div className="container">
        <h1>Online Shop</h1>

        <SearchBar setSearch={setSearch} />

        {!selected ? (
          <ProductList search={search} onSelect={setSelected} />
        ) : (
          <ProductDetails
            product={selected}
            goBack={() => setSelected(null)}
          />
        )}

        
        <AdminOrders />
        <Cart />
        <AdminUpload />
      </div>
    </CartProvider>
  );
};

export default ShopClient;