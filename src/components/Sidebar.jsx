import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/dashboard"> Dashboard</Link></li>
        <li><Link to="/books"> Books</Link></li>
        <li><Link to="/authors"> Authors</Link></li>
        <li><Link to="/publishers"> Publishers</Link></li>
        <li><Link to="/borrows"> Borrows</Link></li>
        <li><Link to="/users"> Users</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
