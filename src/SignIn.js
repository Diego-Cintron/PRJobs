import React, { useState } from "react";
import { useAuth } from "./AuthContext";

const SignIn = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: email, user_password: password }),
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.User);
        setError("");
      } else {
        alert("Email and Password combination is invalid");
        const errorMessage = await response.json();
        throw new Error(errorMessage.error || "Sign in failed");
      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignIn;
