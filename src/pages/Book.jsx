import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Book() {
  return (
    <div className="book">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <h1>Book Store</h1>
          <table>

          </table>
        </div>
      </div>
    </div>
  );
}

export default Book;
