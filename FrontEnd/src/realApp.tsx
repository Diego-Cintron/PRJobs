// npm install react-router-dom
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
// import Border from "./Border.tsx";
// import Login from "./Login.tsx";
import UserProfile from "./UserProfile.tsx";
import Company from "./Company.tsx";
// import Posts from "./Posts.tsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />

        {/* <Border /> */}
        <div className="container">
          <UserProfile />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/post" element={<PostingsPage />} />
            <Route path="/post/:id" element={<IndividualPostingPage />} />
            <Route path="/u" element={<UserList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Company />
        </div>
        {/* <Login />   */}
        {/* <UserList />
    <CreatePost />
    <DM />
    <BrowsingPage />
    <EditCompany /> */}
        {/* <EditJobPost />
    <EditUser />
    <ListApplicants />
    <Welcome /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
