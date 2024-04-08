import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/post">Postings</Link>
        </li>
        <li>
          <Link to="/u">Users</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
