import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./Home";
import About from "./About";
import Messages from "./Messages";
import Conversation from "./Conversation";
import IndividualPostingPage from "./IndividualPostingPage";
import UserList from "./UserList";
import NavigationBar from "./NavigationBar";
import SignUp from "./SignUp";
import Company from "./Company";
import BottomBorder from "./BottomBorder";
import CreatePost from "./CreatePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/postings" element={<CreatePost />} />
          <Route path="/postings/:id" element={<IndividualPostingPage />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/company" element={<Company />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/conversation/:user_id1/:user_id2" element={<Conversation />} />
        </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;
