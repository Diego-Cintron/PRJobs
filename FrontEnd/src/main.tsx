import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import CreatePost from './CreatePost.tsx'
import UserList from './UserList.tsx'
import AllPostings from './AllPostings.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>  
    <AllPostings />
    <UserList />
    <CreatePost />
  </React.StrictMode>,
)
