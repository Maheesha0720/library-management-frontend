import React from 'react';
import '../assets/css/navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>
        <img src='logo.png' alt="" style={{width:"60px", margin:"0px"}}/>
        Library Management System</h2>
    </nav>
  );
}

