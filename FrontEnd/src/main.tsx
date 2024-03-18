import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
// import CreatePost from './CreatePost.tsx'
// import UserList from './UserList.tsx'
// import Login from './Login.tsx'
import Border from './Border.tsx'
import UserProfile from './UserProfile.tsx'
import Company from './Company.tsx'
import Posts from './Posts.tsx'
// import DM from './dm.tsx'
// import BrowsingPage from './BrowsingPage.tsx'
// import EditCompany from './EditCompany.tsx'
// import EditJobPost from './EditJobPost.tsx'
// import EditUser from './EditUser.tsx'
// import ListApplicants from './ListApplicants.tsx'
// import Welcome from './Welcome.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    <Border />
    <div style={{display:'flex'}}>
      <UserProfile />
      <Posts /> 
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
  </React.StrictMode>,
)
