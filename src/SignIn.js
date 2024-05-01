import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const SignIn = () => {
  const { updateUser } = useAuth();
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
        updateUser(data.User);
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
        <img
          className="PRJobs-logo"
          src={
            "https://drive.google.com/thumbnail?id=1gDZsJIvwVTYlHBFyqVPtAZSwMhnwx7Mp"
          }
          height={150}
          width={150}
          alt="PRJobs logo"
        />
        <p className="title">Welcome to PRJobs</p>
        <p className="subtitle">
          First time login? <Link to="/signup">Sign Up</Link>
        </p>
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
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="forgot">Forgot Password?</p>
        <button onClick={handleSignIn}>
          Sign In
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
