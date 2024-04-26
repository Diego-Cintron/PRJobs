import React from "react";
import { useAuth } from "./AuthContext";
import SignIn from "./SignIn";
import HomePage from "./HomePage";

function Home() {
  const { user } = useAuth();

  return <div>{user ? <HomePage /> : <SignIn />}</div>;
}

export default Home;