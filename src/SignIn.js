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
    <div className="signin-block">
      <div>
        <p className="title">Welcome to PRJobs</p>
        <p className="subtitle">First time login? Sign Up</p>
      </div>
      <div className="signin">
        <p>Email</p>
        <input
          type="email"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          placeholder="Character 5-11"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="forgot">Forgot Password?</p>
        <button className="edit-button" onClick={handleSignIn}>
          Sign In
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
