import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./Home";
import About from "./About";
import PostingsPage from "./PostingsPage";
import IndividualPostingPage from "./IndividualPostingPage";
import UserList from "./UserList";
import NavigationBar from "./NavigationBar";
import BottomBorder from "./BottomBorder";
import Company from "./Company";
import Border from "./Border";
import HomePage from "./HomePage";

function App() {
  return (
    <AuthProvider>
      <Border />
      <div className="container">
        <HomePage /> 
      </div>
      <BottomBorder />
      {/* For testing purposes: to view company page in full. In progress... */}
      {/* <Border />
      <div className="container">
        <Company /> 

      </div>
      <BottomBorder /> */}

      {/* <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/postings" element={<PostingsPage />} />
          <Route path="/postings/:id" element={<IndividualPostingPage />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/company" element={<Company />} />
        </Routes>
      </Router> */}

    </AuthProvider>
  );
}

export default App;
