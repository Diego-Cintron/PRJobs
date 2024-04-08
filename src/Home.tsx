// import React from 'react';
import { useAuth } from "./AuthContext";
import SignIn from "./SignIn";

function Home() {
  const { user } = useAuth();

  return <div>{user ? <p>Welcome, {user.user_fname}!</p> : <SignIn />}</div>;
}

export default Home;
