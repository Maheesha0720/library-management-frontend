import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Publishers() {
  return (
    <div className="publishers">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <h1>Publishers</h1>
          <table>
            
          </table>
        </div>
      </div>
    </div>
  );
}

export default Publishers;
