import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./Home";
import About from "./About";
import PostingsPage from "./PostingsPage";
import IndividualPostingPage from "./IndividualPostingPage";
import UserList from "./UserList";
import NavigationBar from "./NavigationBar";
import NotFound from './NotFound.tsx';
import UserProfile from "./UserProfile.tsx";
import Company from "./Company.tsx";
import Posts from "./Posts.tsx";
// import Border from "./Border.tsx";
// import Login from "./Login.tsx";

function App() {
  return (
    <div><h1>Works</h1></div>
  );
}

export default App;
