// src/products/components/Login.tsx
"use client";

import { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { AuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
  const { loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loading) return <p>Loading auth...</p>;

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed: check email/password");
    }
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", margin: 20 }}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
