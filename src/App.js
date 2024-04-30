import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./Home";
import Messages from "./Messages";
import IndividualPostingPage from "./IndividualPostingPage";
import UserList from "./UserList";
import NavigationBar from "./NavigationBar";
import SignUp from "./SignUp";
import AuthorizeEditCompany from "./AuthorizeEditCompany";
import CreatePost from "./CreatePost";
import AccountSettings from "./AccountSettings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postings" element={<CreatePost />} />
          <Route path="/postings/:id" element={<IndividualPostingPage />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/company" element={<AuthorizeEditCompany />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/account-settings" element={<AccountSettings />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
