"use client";

import { useState, useContext } from "react";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import SearchBar from "./components/SearchBar";
import Cart from "./components/Cart";
import AdminUpload from "./components/AdminUpload";
import AdminOrders from "./components/AdminOrders";
import Login from "./components/Login";
import { AuthContext } from "./context/AuthContext";
import { Product } from "./types/Product";

const ShopClient: React.FC = () => {
  const [selected, setSelected] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const { user, loading } = useContext(AuthContext);

  // 1️⃣ Wait for Firebase auth to load
  if (loading) return <p>Loading...</p>;

  // 2️⃣ Show login if not logged in
  if (!user) return <Login />;

  // 3️⃣ Render shop
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
