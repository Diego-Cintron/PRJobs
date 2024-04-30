import React from "react";
import { useAuth } from "./AuthContext";
import NavigationBar from "./NavigationBar";
import SignIn from "./SignIn";
import HomePage from "./HomePage";

function Home() {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <NavigationBar />
          <HomePage />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default Home;
