// src/products/ShopClient.tsx
"use client";

import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import AdminUpload from "./components/AdminUpload";
import AdminOrders from "./components/AdminOrders";
import { Product } from "./types/Product";

const ShopClient: React.FC = () => {
  const [selected, setSelected] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Login />;

  return (
    <div className="container">
      <h1>Online Shop</h1>
      <SearchBar setSearch={setSearch} />

      {!selected ? (
        <ProductList search={search} onSelect={setSelected} />
      ) : (
        <ProductDetails product={selected} goBack={() => setSelected(null)} />
      )}

      <Cart />

      {/* Admin-only components */}
      {user.role === "admin" && (
        <>
          <AdminUpload />
          <AdminOrders />
        </>
      )}
    </div>
  );
};

export default ShopClient;