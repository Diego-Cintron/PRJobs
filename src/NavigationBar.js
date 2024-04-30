import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">&#x2302;</Link>
        </li>
        <li>
          <Link to="/postings">Create</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/company">Company</Link>
        </li>
        <li>
          <Link to="/account-settings">My Profile</Link>
        </li>
        <li>
          <Link to="/messages">&#x1F5EA;</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
