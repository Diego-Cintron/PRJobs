// npm install react-router-dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./Home";
import About from "./About";
import PostingsPage from "./PostingsPage";
import IndividualPostingPage from "./IndividualPostingPage";
import UserList from "./UserList";
import NavigationBar from "./NavigationBar";
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
            <Route path="/postings" element={<PostingsPage />} />
            <Route path="/postings/:id" element={<IndividualPostingPage />} />
            <Route path="/users" element={<UserList />} />
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
