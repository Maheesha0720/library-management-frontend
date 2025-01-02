import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Borrows() {
  return (
    <div className="borrows">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <h1>Borrows </h1>
          <table>
            
          </table>
        </div>
      </div>
    </div>
  );
}

export default Borrows;
