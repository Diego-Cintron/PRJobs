import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./Home";
import About from "./About";
import PostingsPage from "./PostingsPage";
import IndividualPostingPage from "./IndividualPostingPage";
import UserList from "./UserList";
import NavigationBar from "./NavigationBar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/postings" element={<PostingsPage />} />
          <Route path="/postings/:id" element={<IndividualPostingPage />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
