import React from "react";
import ReactDOM from "react-dom/client";
//import App from './App.tsx'
import CreatePost from './CreatePost.tsx'
import UserList from './UserList.tsx'
import './index.css'
import AccountSettings from "./AccountSettings.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>    
    <UserList />
    <CreatePost />
    <AccountSettings />
  </React.StrictMode>,
)
