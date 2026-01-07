"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Create Firestore user document
    await setDoc(doc(db, "users", res.user.uid), {
      email,
      role: "user", // change to "admin" manually later
      createdAt: Date.now(),
    });

    alert("Account created. You can now login.");
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;