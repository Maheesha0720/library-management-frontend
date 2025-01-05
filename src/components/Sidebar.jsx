import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/sidebar.css'
import dashboard from '../assets/img/dashboard.png'
import books from '../assets/img/books.png'
import publishing from '../assets/img/publishing.png'
import writer from '../assets/img/writer.png'
import profile from '../assets/img/profile.png'
import borrow from '../assets/img/borrow.png'


function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/dashboard"><img src={dashboard} alt="" /><br /> Dashboard</Link></li>
        <li><Link to="/books"><img src={books} alt="" /> <br />Books</Link></li>
        <li><Link to="/authors"> <img src={writer} alt="" /> <br />Authors</Link></li>
        <li><Link to="/publishers"><img src={publishing} alt="" /> <br /> Publishers</Link></li>
        <li><Link to="/borrows"><img src={borrow} alt="" /> <br /> Borrows</Link></li>
        <li><Link to="/users"><img src={profile} alt="" /> <br /> Users</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
